import { Injectable } from '@angular/core';

import { Angulartics2 } from 'angulartics2';

declare var _kmq: any;

@Injectable({ providedIn: 'root' })
export class Angulartics2Kissmetrics {

  constructor(
    private angulartics2: Angulartics2
  ) {
    if (typeof (_kmq) === 'undefined') {
      _kmq = [];
    }
    this.angulartics2.setUsername
      .subscribe((x: string) => this.setUsername(x));
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
    _kmq.push(['record', 'Pageview', { Page: path }]);
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
