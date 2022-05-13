import { Injectable } from '@angular/core';

import { Angulartics2 } from '../../angulartics2-core';

declare var Pyze: any;
declare var PyzeEvents: any;
declare var PyzeIdentity: any;

@Injectable({ providedIn: 'root' })
export class Angulartics2Pyze {
  constructor(private angulartics2: Angulartics2) {
    this.angulartics2.setUsername.subscribe((x: string) => this.setUserProfile(x));
    this.angulartics2.setUserProperties.subscribe(x => this.updateUserProfile(x));
  }

  startTracking(): void {
    this.angulartics2.pageTrack
      .pipe(this.angulartics2.filterDeveloperMode())
      .subscribe(x => this.pageTrack(x.path));
    this.angulartics2.eventTrack
      .pipe(this.angulartics2.filterDeveloperMode())
      .subscribe(x => this.eventTrack(x.action, x.properties));
  }

  pageTrack(path: string) {
    try {
      Pyze.postPageView('Page Viewed', { page: path });
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  eventTrack(action: string, properties: any) {
    try {
      PyzeEvents.postCustomEventWithAttributes(action, properties);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  setUserProfile(userId: string) {
    try {
      PyzeIdentity.setUserProfile(userId);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  updateUserProfile(properties: any) {
    try {
      PyzeIdentity.updateUserProfile({},properties)
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }
}
