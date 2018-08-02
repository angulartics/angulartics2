import { Injectable } from '@angular/core';

import { Angulartics2 } from 'angulartics2';

declare var amplitude: {
  getInstance: () => {
    logEvent(action: string, properties: any);
    setUserId(userId: string);
    setUserProperties(properties: any);
  }
};

@Injectable({ providedIn: 'root' })
export class Angulartics2Amplitude {

  constructor(private angulartics2: Angulartics2) {
    this.angulartics2.setUsername
      .subscribe((x: any) => this.setUsername(x));
    this.angulartics2.setUserProperties
      .subscribe((x: any) => this.setUserProperties(x));
    this.angulartics2.setUserPropertiesOnce
      .subscribe((x: any) => this.setUserProperties(x));
  }

  startTracking(): void {
    this.angulartics2.pageTrack
      .pipe(this.angulartics2.filterDeveloperMode())
      .subscribe((x: any) => this.pageTrack(x.path));
    this.angulartics2.eventTrack
      .pipe(this.angulartics2.filterDeveloperMode())
      .subscribe((x: any) => this.eventTrack(x.action, x.properties));
  }

  pageTrack(path: string) {
    try {
      this.eventTrack('Pageview', {
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
      amplitude.getInstance().logEvent(action, properties);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  setUsername(userId: string) {
    try {
      amplitude.getInstance().setUserId(userId);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  setUserProperties(properties: any) {
    try {
      amplitude.getInstance().setUserProperties(properties);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }
}
