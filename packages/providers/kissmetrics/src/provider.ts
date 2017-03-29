import { Injectable } from '@angular/core';

import { Angulartics } from '../../../core/src/angulartics';

declare var _kmq: any;

@Injectable()
export class AngularticsKissmetrics {

  constructor(
    private angulartics: Angulartics
  ) {
    if (typeof (_kmq) === 'undefined') {
      _kmq = [];
    }

    this.angulartics.pageTrack.subscribe((x: any) => this.pageTrack(x.path, x.location));

    this.angulartics.eventTrack.subscribe((x: any) => this.eventTrack(x.action, x.properties));

    this.angulartics.setUsername.subscribe((x: string) => this.setUsername(x));

    this.angulartics.setUserProperties.subscribe((x: any) => this.setUserProperties(x));
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
