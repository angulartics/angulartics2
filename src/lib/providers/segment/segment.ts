import { Injectable } from '@angular/core';

import { Angulartics2 } from 'angulartics2';

declare var analytics: SegmentAnalytics.AnalyticsJS;

@Injectable({ providedIn: 'root' })
export class Angulartics2Segment {

  constructor(
    private angulartics2: Angulartics2
  ) {
    this.angulartics2.setUserProperties
      .subscribe((x) => this.setUserProperties(x));
    this.angulartics2.setUserPropertiesOnce
      .subscribe((x) => this.setUserProperties(x));
    this.angulartics2.setAlias
      .subscribe((x) => this.setAlias(x));
  }

  startTracking(): void {
    this.angulartics2.pageTrack
      .pipe(this.angulartics2.filterDeveloperMode())
      .subscribe((x) => this.pageTrack(x.path));
    this.angulartics2.eventTrack
      .pipe(this.angulartics2.filterDeveloperMode())
      .subscribe((x) => this.eventTrack(x.action, x.properties));
  }

  /**
   * https://segment.com/docs/libraries/analytics.js/#page
   *
   * analytics.page([category], [name], [properties], [options], [callback]);
   */
  pageTrack(path: string) {
    // TODO : Support optional parameters where the parameter order and type changes their meaning
    try {
      analytics.page(path);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  /**
   * https://segment.com/docs/libraries/analytics.js/#track
   *
   * analytics.track(event, [properties], [options], [callback]);
   */
  eventTrack(action: string, properties: any) {
    try {
      analytics.track(action, properties);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  /**
   * https://segment.com/docs/libraries/analytics.js/#identify
   *
   * analytics.identify([userId], [traits], [options], [callback]);
   */
  setUserProperties(properties: any) {
    try {
      if (properties.userId) {
        analytics.identify(properties.userId, properties);
      } else {
        analytics.identify(properties);
      }
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  /**
   * https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#reset--logout
   *
   * analytics.reset();
   */
  unsetUserProperties() {
    analytics.reset();
  }

  /**
   * https://segment.com/docs/libraries/analytics.js/#alias
   *
   * analytics.alias(userId, previousId, options, callback);
   */
  setAlias(alias: any) {
    try {
      analytics.alias(alias);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }
}
