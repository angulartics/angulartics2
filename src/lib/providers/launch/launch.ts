import { Injectable } from '@angular/core';

import { Angulartics2 } from 'angulartics2';

declare const _satellite: any;

@Injectable({ providedIn: 'root' })
export class Angulartics2LaunchByAdobe {
  payload: any = {};
  constructor(
    protected angulartics2: Angulartics2,
  ) {
    if ('undefined' === typeof _satellite) {
      console.warn('Launch not found!');
    }
    this.angulartics2.setUsername
      .subscribe((x: string) => this.setUsername(x));
    this.angulartics2.setUserProperties
      .subscribe((x) => this.setUserProperties(x));
  }

  setUsername(userId: string | boolean) {
    if ('undefined' !== typeof userId && userId) {
      this.payload.userId = userId;
    }
  }

  setUserProperties(properties: any) {
    if ('undefined' !== typeof properties && properties) {
      this.payload.properties = properties;
    }
  }

  startTracking() {
    this.angulartics2.pageTrack
      .pipe(this.angulartics2.filterDeveloperMode())
      .subscribe((x) => this.pageTrack(x.path));
    this.angulartics2.eventTrack
      .pipe(this.angulartics2.filterDeveloperMode())
      .subscribe((x) => this.eventTrack(x.action, x.properties));
  }

  pageTrack(path: string) {
    this.payload = this.payload || {};
    this.payload.path = path;

    if ('undefined' !== typeof _satellite && _satellite) {
      _satellite.track('pageTrack', this.payload);
    }
  }

  /**
   * @param action associated with the event
   * @param properties associated with the event
   */
  eventTrack(action: string, properties: any) {
    properties = properties || {};

    // add properties to payload
    this.payload.action = action;
    this.payload.eventProperties = properties;

    if ('undefined' !== typeof _satellite && _satellite) {
      _satellite.track('eventTrack', this.payload);
    }
  }
}
