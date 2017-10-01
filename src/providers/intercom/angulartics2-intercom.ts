import { Injectable } from '@angular/core';

import { Angulartics2 } from '../../core/angulartics2';

interface Intercom {
    (command: string, param?: any, properties?: any): void;
    booted: boolean;
}
declare var Intercom: Intercom;

@Injectable()
export class Angulartics2Intercom {

  constructor(
    private angulartics2: Angulartics2
  ) {
    if (typeof Intercom === 'undefined') {
      console.warn('Intercom not found');
      Intercom = Object.assign(() => {}, {booted: false});
    }

    this.angulartics2.eventTrack.subscribe((x: any) => this.eventTrack(x.action, x.properties));

    this.angulartics2.setUsername.subscribe((x: any) => this.setUsername(x));

    this.angulartics2.setSuperPropertiesOnce.subscribe((x: any) => this.setSuperPropertiesOnce(x));
  }

  eventTrack(action: string, properties: any) {
    if (Intercom.booted) {
      Intercom('trackEvent', action, properties);
    }
  }

  setUsername(userId: string) {
    if (Intercom.booted) {
      Intercom('update', { user_id: userId });
    }
  }

  setSuperPropertiesOnce(properties: any) {
    properties = properties.Intercom || properties;

    Intercom('boot', properties);
  }
}
