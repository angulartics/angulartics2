import { Injectable } from '@angular/core';

import { Angulartics2 } from 'angulartics2';

declare var mixpanel: any;

@Injectable({ providedIn: 'root' })
export class Angulartics2Mixpanel {

  constructor(
    private angulartics2: Angulartics2
  ) {
    this.angulartics2.setUsername
      .subscribe((x: string) => this.setUsername(x));
    this.angulartics2.setUserProperties
      .subscribe((x) => this.setUserProperties(x));
    this.angulartics2.setUserPropertiesOnce
      .subscribe((x) => this.setUserPropertiesOnce(x));
    this.angulartics2.setSuperProperties
      .subscribe((x) => this.setSuperProperties(x));
    this.angulartics2.setSuperPropertiesOnce
      .subscribe((x) => this.setSuperPropertiesOnce(x));
    this.angulartics2.setAlias
      .subscribe((x) => this.setAlias(x));
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
      mixpanel.track('Page Viewed', { page: path });
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  eventTrack(action: string, properties: any) {
    try {
      mixpanel.track(action, properties);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  setUsername(userId: string) {
    try {
      mixpanel.identify(userId);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  setUserProperties(properties: any) {
    try {
      mixpanel.people.set(properties);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  setUserPropertiesOnce(properties: any) {
    try {
      mixpanel.people.set_once(properties);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  setSuperProperties(properties: any) {
    try {
      mixpanel.register(properties);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  setSuperPropertiesOnce(properties: any) {
    try {
      mixpanel.register_once(properties);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  setAlias(alias: any) {
    try {
      mixpanel.alias(alias);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }
}
