import { Injectable } from '@angular/core';

import { Angulartics2 } from 'angulartics2';

declare var sp: any;

@Injectable({ providedIn: 'root' })
export class Angulartics2Splunk {

  constructor(private angulartics2: Angulartics2) {
    if (typeof (sp) === 'undefined') {
      console.warn('Splunk not found');
    }
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
    try {
      sp.pageview(path);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  eventTrack(action: string, properties: any) {
    try {
      sp.track(action, properties);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }
}
