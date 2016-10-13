import {Injectable} from 'angular2/core';

import {Angulartics2} from '../core/angulartics2';

declare const fbq: Function;

/*
  Facebook tracking via Facebook Tag API
  https://developers.facebook.com/docs/ads-for-websites/tag-api/
*/

@Injectable()
export class Angulartics2Facebook {
  private angulartics2: Angulartics2;

  constructor(angulartics2: Angulartics2) {
    this.angulartics2 = angulartics2;
    this.angulartics2.settings.pageTracking.trackRelativePath = true;

    this.angulartics2.pageTrack.subscribe((x: any) => this.pageTrack(x.path));
    this.angulartics2.eventTrack.subscribe((x: any) => this.eventTrack(x.action, x.properties));
  }

  pageTrack(path: string): void {
    fbq('track', 'PageView');
  }

  eventTrack(action: string, properties?: Object): void {
    fbq('track', action, properties);
  }

}
