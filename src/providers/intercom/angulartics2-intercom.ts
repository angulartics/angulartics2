import { Injectable } from '@angular/core';

import { Angulartics2 } from '../../core/angulartics2';

declare var Intercom: any;

@Injectable()
export class Angulartics2Intercom {

  constructor(
    private angulartics2: Angulartics2
  ) {
    this.angulartics2.pageTrack.subscribe((x: any) => this.pageTrack(x.path, x.location));

    this.angulartics2.eventTrack.subscribe((x: any) => this.eventTrack(x.action, x.properties));

    this.angulartics2.setUserProperties.subscribe((x: any) => this.setUserProperties(x));

    this.angulartics2.setUserPropertiesOnce.subscribe((x: any) => this.setUserProperties(x));
  }

  pageTrack(path: string, location: any) {
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
      Intercom('trackEvent', action, properties);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  setUserProperties(properties: any) {
    try {
      if (properties.userId && !properties.user_id) {
        properties.user_id = properties.userId;
      }

      Intercom('boot', properties);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }
}
