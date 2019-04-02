import { Injectable } from '@angular/core';

import { Angulartics2 } from 'angulartics2';

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

  get GoSquared(): Function {
    return window['_gs'];
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
      this.GoSquared('track', path);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  eventTrack(action: string, properties: any) {
    try {
      this.GoSquared('event', action, properties);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  setUserProperties(properties: any) {
    try {
      this.GoSquared('identify', properties);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }
}
