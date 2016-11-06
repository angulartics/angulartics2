import { Injectable } from '@angular/core';

import { Angulartics2 } from '../../core/angulartics2';

declare const fbq: Function;

@Injectable()
export class Angulartics2Facebook {

  constructor(
    readonly angulartics2: Angulartics2
  ) {
    this.angulartics2.settings.pageTracking.trackRelativePath = true;

    this.angulartics2.eventTrack.subscribe((x: any) => this.eventTrack(x.action, x.properties));
  }

  /**
   * Send interactions to the Pixel, i.e. for event tracking in Pixel
   * @name eventTrack
   *
   * @param {string} action Required 'action' (string) associated with the event
   * @param {object} properties
   */
  eventTrack(action: string, properties: any) {
    properties = properties || {};

    const eventList = [
      'ViewContent',
      'Search',
      'AddToCart',
      'AddToWishlist',
      'InitiateCheckout',
      'AddPaymentInfo',
      'Purchase',
      'Lead',
      'CompleteRegistration'
    ];

   if (typeof fbq !== 'undefined' && fbq) {
        eventList.indexOf(action) === -1 ?
           fbq('trackCustom', action, properties) :
           fbq('track', action, properties);
    }
  }
}
