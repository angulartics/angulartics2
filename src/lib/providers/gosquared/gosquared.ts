import { Injectable } from '@angular/core';

import { Angulartics2 } from 'angulartics2';

declare var _gs: any;

@Injectable({ providedIn: 'root' })
export class Angulartics2GoSquared {
  constructor(private angulartics2: Angulartics2) {
    this.angulartics2.setUserProperties.subscribe(x =>
      this.setUserProperties(x),
    );
    this.angulartics2.setUserPropertiesOnce.subscribe(x =>
      this.setUserProperties(x),
    );
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
      _gs('track', path);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  eventTrack(action: string, properties: any) {
    try {
      _gs('event', action, properties);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  setUserProperties(properties: any) {
    try {
      _gs('identify', properties);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }
}
