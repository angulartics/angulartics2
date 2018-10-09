import { Injectable } from '@angular/core';

import { Angulartics2 } from 'angulartics2';


declare var woopra: any;

@Injectable({ providedIn: 'root' })
export class Angulartics2Woopra {

  constructor(private angulartics2: Angulartics2) {
    if (typeof (woopra) === 'undefined') {
      console.warn('Woopra not found');
    }

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
    try {
      woopra.track('pv', {
        url: path
      });
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  eventTrack(action: string, properties: any) {
    try {
      woopra.track(action, properties);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  setUserProperties(properties: any) {
    try {
      if (properties.email) {
        woopra.identify(properties);
      }
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }
}
