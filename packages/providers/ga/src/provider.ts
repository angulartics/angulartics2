import { Injectable } from '@angular/core';

import { Angulartics } from '../../../core/src/angulartics';

declare var _gaq: any;
declare var ga: any;
declare var location: any;

@Injectable()
export class AngularticsGoogleAnalytics {

  constructor(
    private angulartics: Angulartics
  ) {
    this.angulartics.settings.pageTracking.trackRelativePath = true;

    // Set the default settings for this module
    this.angulartics.settings.ga = {
      // array of additional account names (only works for analyticsjs)
      additionalAccountNames: [],
      userId: null
    };

    this.angulartics.pageTrack.subscribe((x: any) => this.pageTrack(x.path));

    this.angulartics.eventTrack.subscribe((x: any) => this.eventTrack(x.action, x.properties));

    this.angulartics.exceptionTrack.subscribe((x: any) => this.exceptionTrack(x));

    this.angulartics.setUsername.subscribe((x: string) => this.setUsername(x));

    this.angulartics.setUserProperties.subscribe((x: any) => this.setUserProperties(x));

    this.angulartics.userTimings.subscribe((x: any) => this.userTimings(x));
  }

  pageTrack(path: string) {
    if (typeof _gaq !== 'undefined' && _gaq) {
      _gaq.push(['_trackPageview', path]);
      for (let accountName of this.angulartics.settings.ga.additionalAccountNames) {
        _gaq.push([accountName + '._trackPageview', path]);
      };
    }
    if (typeof ga !== 'undefined' && ga) {
      if (this.angulartics.settings.ga.userId) {
        ga('set', '&uid', this.angulartics.settings.ga.userId);
      }
      ga('send', 'pageview', path);
      for (let accountName of this.angulartics.settings.ga.additionalAccountNames) {
        ga(accountName + '.send', 'pageview', path);
      };
    }
  }

  /**
   * Track Event in GA
   * @name eventTrack
   *
   * @param {string} action Required 'action' (string) associated with the event
   * @param {object} properties Comprised of the mandatory field 'category' (string) and optional  fields 'label' (string), 'value' (integer) and 'noninteraction' (boolean)
   *
   * @link https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide#SettingUpEventTracking
   *
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
      var parsed = parseInt(properties.value, 10);
      properties.value = isNaN(parsed) ? 0 : parsed;
    }

    if (typeof ga !== 'undefined') {
      var eventOptions = {
        eventCategory: properties.category,
        eventAction: action,
        eventLabel: properties.label,
        eventValue: properties.value,
        nonInteraction: properties.noninteraction,
        page: properties.page || location.hash.substring(1) || location.pathname,
        userId: this.angulartics.settings.ga.userId
      };

      // add custom dimensions and metrics
      this.setDimensionsAndMetrics(properties);

      if (this.angulartics.settings.ga.transport) {
        ga('send', 'event', eventOptions, { transport: this.angulartics.settings.ga.transport });
      } else {
        ga('send', 'event', eventOptions);
      }

      for (let accountName of this.angulartics.settings.ga.additionalAccountNames) {
        ga(accountName + '.send', 'event', eventOptions);
      }
    } else if (typeof _gaq !== 'undefined') {
      _gaq.push(['_trackEvent', properties.category, action, properties.label, properties.value, properties.noninteraction]);
    }
  }

  /**
   * Exception Track Event in GA
   * @name exceptionTrack
   *
   * @param {object} properties Comprised of the optional fields:
   *     'fatal' (string),
   *     'description' (string)
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

    var eventOptions = {
      exFatal: properties.fatal,
      exDescription: properties.description
    };

    ga('send', 'exception', eventOptions);
  }

  setUsername(userId: string) {
    this.angulartics.settings.ga.userId = userId;
  }

  setUserProperties(properties: any) {
    this.setDimensionsAndMetrics(properties);
  }

  /**
   * User Timings Event in GA
   * @name userTimings
   *
   * @param {object} properties Comprised of the mandatory fields:
   *     'timingCategory' (string),
   *     'timingVar' (string),
   *     'timingValue' (number)
   * Properties can also have the optional fields:
   *     'timingLabel' (string)
   *
   * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/user-timings
   */
  userTimings(properties: any) {
    if (!properties || !properties.timingCategory || !properties.timingVar || !properties.timingValue) {
      console.error('Properties timingCategory, timingVar, and timingValue are required to be set.');
      return;
    }

    if (ga) {
      ga('send', 'timing', properties);
    }
  }

  private setDimensionsAndMetrics(properties: any) {
    if (ga) {
      // add custom dimensions and metrics
      for (var idx = 1; idx <= 200; idx++) {
        if (properties['dimension' + idx.toString()]) {
          ga('set', 'dimension' + idx.toString(), properties['dimension' + idx.toString()]);
        }
        if (properties['metric' + idx.toString()]) {
          ga('set', 'metric' + idx.toString(), properties['metric' + idx.toString()]);
        }
      }
    }
  }
}
