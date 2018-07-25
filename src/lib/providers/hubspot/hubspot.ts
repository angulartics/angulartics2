import { Injectable } from '@angular/core';

import { Angulartics2 } from 'angulartics2';

declare var _hsq: any;

@Injectable({ providedIn: 'root' })
export class Angulartics2Hubspot {

  constructor(
    private angulartics2: Angulartics2
  ) {
    this.angulartics2.setUserProperties
      .subscribe((x) => this.setUserProperties(x));
  }

  startTracking(): void {
    this.angulartics2.pageTrack
      .pipe(this.angulartics2.filterDeveloperMode())
      .subscribe((x) => this.pageTrack(x.path));
    this.angulartics2.eventTrack
      .pipe(this.angulartics2.filterDeveloperMode())
      .subscribe((x) => this.eventTrack(x.action, x.properties));
  }

  pageTrack(path: string) {
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
