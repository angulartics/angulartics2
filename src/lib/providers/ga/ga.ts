import { Injectable } from '@angular/core';

import {
  Angulartics2,
  GoogleAnalyticsSettings,
  UserTimings,
} from 'angulartics2';


declare var _gaq: GoogleAnalyticsCode;
declare var ga: UniversalAnalytics.ga;
declare var location: any;

export class GoogleAnalyticsDefaults implements GoogleAnalyticsSettings {
  additionalAccountNames = [];
  userId = null;
  transport = '';
  anonymizeIp = false;
}

@Injectable({ providedIn: 'root' })
export class Angulartics2GoogleAnalytics {
  dimensionsAndMetrics = [];
  settings: Partial<GoogleAnalyticsSettings>;

  constructor(private angulartics2: Angulartics2) {
    const defaults = new GoogleAnalyticsDefaults();
    // Set the default settings for this module
    this.angulartics2.settings.ga = {
      ...defaults,
      ...this.angulartics2.settings.ga,
    };
    this.settings = this.angulartics2.settings.ga;
    this.angulartics2.setUsername.subscribe((x: string) => this.setUsername(x));
    this.angulartics2.setUserProperties.subscribe(x => this.setUserProperties(x));
  }

  startTracking(): void {
    this.angulartics2.pageTrack
      .pipe(this.angulartics2.filterDeveloperMode())
      .subscribe(x => this.pageTrack(x.path));
    this.angulartics2.eventTrack
      .pipe(this.angulartics2.filterDeveloperMode())
      .subscribe(x => this.eventTrack(x.action, x.properties));
    this.angulartics2.exceptionTrack
      .pipe(this.angulartics2.filterDeveloperMode())
      .subscribe(x => this.exceptionTrack(x));
    this.angulartics2.userTimings
      .pipe(this.angulartics2.filterDeveloperMode())
      .subscribe(x => this.userTimings(x));
  }

  pageTrack(path: string) {
    if (typeof _gaq !== 'undefined' && _gaq) {
      _gaq.push(['_trackPageview', path]);
      for (const accountName of this.angulartics2.settings.ga.additionalAccountNames) {
        _gaq.push([accountName + '._trackPageview', path]);
      }
    }
    if (typeof ga !== 'undefined' && ga) {
      if (this.angulartics2.settings.ga.userId) {
        ga('set', '&uid', this.angulartics2.settings.ga.userId);
        for (const accountName of this.angulartics2.settings.ga.additionalAccountNames) {
          ga(accountName + '.set', '&uid', this.angulartics2.settings.ga.userId);
        }
      }
      if (this.angulartics2.settings.ga.anonymizeIp) {
        ga('set', 'anonymizeIp', true);
        for (const accountName of this.angulartics2.settings.ga.additionalAccountNames) {
          ga(accountName + '.set', 'anonymizeIp', true);
        }
      }
      ga('send', 'pageview', path);
      for (const accountName of this.angulartics2.settings.ga.additionalAccountNames) {
        ga(accountName + '.send', 'pageview', path);
      }
    }
  }

  /**
   * Track Event in GA
   *
   * @param action Associated with the event
   * @param properties Comprised of:
   *  - category (string) and optional
   *  - label (string)
   *  - value (integer)
   *  - noninteraction (boolean)
   *
   * @link https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide#SettingUpEventTracking
   * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/events
   */
  eventTrack(action: string, properties: any) {
    // Google Analytics requires an Event Category
    if (!properties || !properties.category) {
      properties = properties || {};
      properties.category = 'Event';
    }
    // GA requires that eventValue be an integer, see:
    // https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#eventValue
    // https://github.com/luisfarzati/angulartics/issues/81
    if (properties.value) {
      const parsed = parseInt(properties.value, 10);
      properties.value = isNaN(parsed) ? 0 : parsed;
    }

    if (typeof ga !== 'undefined') {
      const eventOptions = {
        eventCategory: properties.category,
        eventAction: action,
        eventLabel: properties.label,
        eventValue: properties.value,
        nonInteraction: properties.noninteraction,
        page: properties.page || location.hash.substring(1) || location.pathname,
        userId: this.angulartics2.settings.ga.userId,
        hitCallback: properties.hitCallback,
        ... this.angulartics2.settings.ga.transport && { transport: this.angulartics2.settings.ga.transport }
      };

      // add custom dimensions and metrics
      this.setDimensionsAndMetrics(properties);

      ga('send', 'event', eventOptions);

      for (const accountName of this.angulartics2.settings.ga.additionalAccountNames) {
        ga(accountName + '.send', 'event', eventOptions);
      }
    } else if (typeof _gaq !== 'undefined') {
      _gaq.push([
        '_trackEvent',
        properties.category,
        action,
        properties.label,
        properties.value,
        properties.noninteraction,
      ]);
    }
  }

  /**
   * Exception Track Event in GA
   *
   * @param properties Comprised of the optional fields:
   *  - fatal (string)
   *  - description (string)
   *
   * @https://developers.google.com/analytics/devguides/collection/analyticsjs/exceptions
   *
   * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/events
   */
  exceptionTrack(properties: any) {
    if (properties.fatal === undefined) {
      console.log('No "fatal" provided, sending with fatal=true');
      properties.fatal = true;
    }

    properties.exDescription = properties.description;

    const eventOptions = {
      exFatal: properties.fatal,
      exDescription: properties.description,
    };

    ga('send', 'exception', eventOptions);
    for (const accountName of this.angulartics2.settings.ga.additionalAccountNames) {
      ga(accountName + '.send', 'exception', eventOptions);
    }
  }

  /**
   * User Timings Event in GA
   *
   * @param properties Comprised of the mandatory fields:
   *  - timingCategory (string)
   *  - timingVar (string)
   *  - timingValue (number)
   * Properties can also have the optional fields:
   *  - timingLabel (string)
   *
   * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/user-timings
   */
  userTimings(properties: UserTimings) {
    if (
      !properties ||
      !properties.timingCategory ||
      !properties.timingVar ||
      !properties.timingValue
    ) {
      console.error(
        'Properties timingCategory, timingVar, and timingValue are required to be set.',
      );
      return;
    }

    if (typeof ga !== 'undefined') {
      ga('send', 'timing', properties);
      for (const accountName of this.angulartics2.settings.ga.additionalAccountNames) {
        ga(accountName + '.send', 'timing', properties);
      }
    }
  }

  setUsername(userId: string) {
    this.angulartics2.settings.ga.userId = userId;
    if (typeof ga === 'undefined') {
      return;
    }
    ga('set', 'userId', userId);
  }

  setUserProperties(properties: any) {
    this.setDimensionsAndMetrics(properties);
  }

  private setDimensionsAndMetrics(properties: any) {
    if (typeof ga === 'undefined') {
      return;
    }
    // clean previously used dimensions and metrics that will not be overriden
    this.dimensionsAndMetrics.forEach(elem => {
      if (!properties.hasOwnProperty(elem)) {
        ga('set', elem, undefined);

        this.angulartics2.settings.ga.additionalAccountNames.forEach(
          (accountName: string) => {
            ga(`${accountName}.set`, elem, undefined);
          },
        );
      }
    });
    this.dimensionsAndMetrics = [];

    // add custom dimensions and metrics
    Object.keys(properties).forEach(key => {
      if (
        key.lastIndexOf('dimension', 0) === 0 ||
        key.lastIndexOf('metric', 0) === 0
      ) {
        ga('set', key, properties[key]);

        this.angulartics2.settings.ga.additionalAccountNames.forEach(
          (accountName: string) => {
            ga(`${accountName}.set`, key, properties[key]);
          },
        );
        this.dimensionsAndMetrics.push(key);
      }
    });
  }
}
