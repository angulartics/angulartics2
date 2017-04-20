import { Injectable } from '@angular/core';

import { Angulartics2 } from '../../core/angulartics2';

declare var _hsq: any;

@Injectable()
export class Angulartics2Hubspot {

  constructor(
    private angulartics2: Angulartics2
  ) {
    if (typeof _hsq === 'undefined') {
      _hsq = [];
    }

    this.angulartics2.pageTrack.subscribe((x: any) => this.pageTrack(x.path, x.location));

    this.angulartics2.eventTrack.subscribe((x: any) => this.eventTrack(x.action, x.properties));

    this.angulartics2.setUserProperties.subscribe((x: any) => this.setUserProperties(x));
  }

  pageTrack(path: string, location: any) {
    if (typeof _hsq !== 'undefined') {
      _hsq.push(['setPath', path]);
      _hsq.push(['trackPageView']);
    }
  }

  eventTrack(action: string, properties: any) {
    if (typeof _hsq !== 'undefined') {
      _hsq.push(['trackEvent', properties]);
    }
  }

  setUserProperties(properties: any) {
    if (typeof _hsq !== 'undefined') {
      _hsq.push(['identify', properties]);
    }
  }
}
