import { Injectable } from '@angular/core';

import { Angulartics2, GoogleGlobalSiteTagSettings, UserTimings } from 'angulartics2';
import { EventGst, UserTimingsGst } from './gst-interfaces';

declare var gtag: any;
declare var ga: any;

export class GoogleGlobalSiteTagDefaults implements GoogleGlobalSiteTagSettings {
  trackingIds: string[] = [];

  constructor() {
    if (typeof ga !== 'undefined' && ga) {
      // See: https://developers.google.com/analytics/devguides/collection/analyticsjs/ga-object-methods-reference
      ga(() => {
        ga.getAll().forEach((tracker: any) => {
          const id = tracker.get('trackingId');
          // If set both in forRoot and HTML page, we want to avoid duplicates
          if (id !== undefined && this.trackingIds.indexOf(id) === -1) {
            this.trackingIds.push(id);
          }
        });
      });
    }
  }
}

@Injectable({ providedIn: 'root' })
export class Angulartics2GoogleGlobalSiteTag {
  private dimensionsAndMetrics: { [key: string]: any } = {};

  constructor(protected angulartics2: Angulartics2) {
    const defaults = new GoogleGlobalSiteTagDefaults();
    // Set the default settings for this module
    this.angulartics2.settings.gst = { ...defaults, ...this.angulartics2.settings.gst };
  }

  startTracking(): void {
    this.angulartics2.pageTrack
      .pipe(this.angulartics2.filterDeveloperMode())
      .subscribe((x) => this.pageTrack(x.path));
    this.angulartics2.eventTrack
      .pipe(this.angulartics2.filterDeveloperMode())
      .subscribe((x) => this.eventTrack(x.action, x.properties));
    this.angulartics2.exceptionTrack
      .pipe(this.angulartics2.filterDeveloperMode())
      .subscribe((x: any) => this.exceptionTrack(x));
    this.angulartics2.userTimings
      .pipe(this.angulartics2.filterDeveloperMode())
      .subscribe(x => this.userTimings(this.convertTimings(x)));
    this.angulartics2.setUsername
      .pipe(this.angulartics2.filterDeveloperMode())
      .subscribe((x: string) => this.setUsername(x));
    this.angulartics2.setUserProperties
      .pipe(this.angulartics2.filterDeveloperMode())
      .subscribe((x: any) => this.setUserProperties(x));
  }

  /**
   * Manually track page view, see:
   *
   * https://developers.google.com/analytics/devguides/collection/gtagjs/single-page-applications#tracking_virtual_pageviews
   *
   * @param path relative url
   */
  pageTrack(path: string) {
    if (typeof gtag !== 'undefined' && gtag) {
      const params: any = {
        page_path: path,
        page_location: window.location.protocol + '//' + window.location.host + path,
        ...this.dimensionsAndMetrics
      };

      // Custom map must be reset with all config to stay valid.

      if (this.angulartics2.settings.gst.customMap) {
        params.custom_map = this.angulartics2.settings.gst.customMap;
      }
      if (this.angulartics2.settings.gst.userId) {
        params.user_id = this.angulartics2.settings.gst.userId;
      }
      if (this.angulartics2.settings.gst.anonymizeIp) {
        params.anonymize_ip = this.angulartics2.settings.gst.anonymizeIp;
      }

      for (const id of this.angulartics2.settings.gst.trackingIds) {
        gtag('config', id, params);
      }
    }
  }

  /**
   * Send interactions to gtag, i.e. for event tracking in Google Analytics. See:
   *
   * https://developers.google.com/analytics/devguides/collection/gtagjs/events
   *
   * @param action associated with the event
   */
  eventTrack(action: string, properties: Partial<EventGst> = {}) {
    this.eventTrackInternal(action, {
      event_category: properties.category || 'interaction',
      event_label: properties.label,
      value: properties.value,
      non_interaction: properties.noninteraction,
      ...properties.gstCustom
    });
  }

  /**
   * Exception Track Event in GST. See:
   *
   * https://developers.google.com/analytics/devguides/collection/gtagjs/exceptions
   *
   */
  exceptionTrack(properties: any) {
    // TODO: make interface
    //  @param {Object} properties
    //  @param {string} [properties.description]
    //  @param {boolean} [properties.fatal]
    if (properties.fatal === undefined) {
      console.log('No "fatal" provided, sending with fatal=true');
      properties.fatal = true;
    }

    properties.exDescription = properties.event ? properties.event.stack : properties.description;

    this.eventTrack('exception', {
      gstCustom: {
        description: properties.exDescription,
        fatal: properties.fatal,
        ...properties.gstCustom
      }
    });
  }

  /**
   * User Timings Event in GST.
   *
   * @param properties Comprised of the mandatory fields:
   *  - name (string)
   *  - value (number - integer)
   * Properties can also have the optional fields:
   *  - category (string)
   *  - label (string)
   *
   * @link https://developers.google.com/analytics/devguides/collection/gtagjs/user-timings
   */
  userTimings(properties: UserTimingsGst) {
    if (!properties) {
      console.error('User timings - "properties" parameter is required to be set.');
      return;
    }

    this.eventTrackInternal('timing_complete', {
      name: properties.name,
      value: properties.value,
      event_category: properties.category,
      event_label: properties.label
    });
  }

  private convertTimings(properties: UserTimings): UserTimingsGst {
    return {
      name: properties.timingVar,
      value: properties.timingValue,
      category: properties.timingCategory,
      label: properties.timingLabel
    };
  }

  setUsername(userId: string | { userId: string | number }) {
    this.angulartics2.settings.gst.userId = userId;
    if (typeof gtag !== 'undefined' && gtag) {
      gtag('set', { user_id: typeof userId === 'string' || !userId ? userId : userId.userId });
    }
  }

  setUserProperties(properties: any) {
    this.setDimensionsAndMetrics(properties);
  }

  private setDimensionsAndMetrics(properties: { [key: string]: any }) {
    // We want the dimensions and metrics to accumulate, so we merge with previous value
    this.dimensionsAndMetrics = {
      ...this.dimensionsAndMetrics,
      ...properties
    };

    // Remove properties that are null or undefined
    Object.keys(this.dimensionsAndMetrics).forEach(key => {
      const val = this.dimensionsAndMetrics[key];
      if (val === undefined || val === null) {
        delete this.dimensionsAndMetrics[key];
      }
    });

    if (typeof gtag !== 'undefined' && gtag) {
      gtag('set', this.dimensionsAndMetrics);
    }
  }

  private eventTrackInternal(action: string, properties: any = {}) {
    this.cleanProperties(properties);
    if (typeof gtag !== 'undefined' && gtag) {
      gtag('event', action, properties);
    }
  }

  private cleanProperties(properties: { [key: string]: any }): void {
    // GA requires that eventValue be an non-negative integer, see:
    // https://developers.google.com/analytics/devguides/collection/gtagjs/events
    if (properties.value) {
      const parsed = parseInt(properties.value, 10);
      properties.value = isNaN(parsed) ? 0 : parsed;
    }
  }
}
