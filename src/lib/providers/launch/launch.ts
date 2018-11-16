import { Injectable } from '@angular/core';

import { Angulartics2 } from 'angulartics2';

export interface Angulartics2LaunchByAdobeDCRIDMap {
  [details: string]: string;
}

declare const _satellite: any;
declare var payload: any;
declare var dcrIDs: Angulartics2LaunchByAdobeDCRIDMap;

@Injectable({ providedIn: 'root' })
export class Angulartics2LaunchByAdobe {

  constructor(
    protected angulartics2: Angulartics2,
  ) {
    // define DCR IDs for the available call types
    dcrIDs = {};
    dcrIDs['pageTrack'] = 'pageTrack';
    dcrIDs['eventTrack'] = 'eventTrack';
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
      payload = payload || {};
      payload.userId = userId;
    }
  }

  setUserProperties(properties: any) {
    if ('undefined' !== typeof properties && properties) {
      payload = payload || {};
      payload.properties = properties;
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
    if ('undefined' !== typeof _satellite && _satellite) {
      _satellite.track(dcrIDs['pageTrack'], path);
    }
  }

  /**
   * @param action associated with the event
   * @param properties associated with the event
   */
  eventTrack(action: string, properties: any) {
    properties = properties || {};

    // add properties to payload
    payload = payload || {};
    payload.action = action;
    payload.eventProperties = properties;

    if ('undefined' !== typeof _satellite && _satellite) {
      _satellite.track(dcrIDs['eventTrack'], payload);
    }
  }
}
