import { Injectable } from '@angular/core';

import { Angulartics2 } from '../../core/angulartics2';

declare var _kmq: any;

@Injectable()
export class Angulartics2Kissmetrics {

  constructor(
    private angulartics2: Angulartics2
  ) {
    if (typeof (_kmq) === 'undefined') {
      _kmq = [];
    }

    this.angulartics2.pageTrack.subscribe((x: any) => this.pageTrack(x.path, x.location));

    this.angulartics2.eventTrack.subscribe((x: any) => this.eventTrack(x.action, x.properties));

    this.angulartics2.setUsername.subscribe((x: string) => this.setUsername(x));

    this.angulartics2.setUserProperties.subscribe((x: any) => this.setUserProperties(x));
  }

  pageTrack(path: string, location: any) {
    _kmq.push(['record', 'Pageview', { 'Page': path }]);
  }

  eventTrack(action: string, properties: any) {
    _kmq.push(['record', action, properties]);
  }

  setUsername(userId: string) {
    _kmq.push(['identify', userId]);
  }

  setUserProperties(properties: any) {
    _kmq.push(['set', properties]);
  }
}
