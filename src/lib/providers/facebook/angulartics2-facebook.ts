import { Injectable } from '@angular/core';

import { Angulartics2 } from 'angulartics2';

declare const fbq: Function;

@Injectable()
export class Angulartics2Facebook {

  constructor(
    private angulartics2: Angulartics2
  ) {
    this.angulartics2.eventTrack.subscribe((x: any) => this.eventTrack(x.action, x.properties));
  }

  /**
   * Send interactions to the Pixel, i.e. for event tracking in Pixel
   *
   * @param action Required action associated with the event
   * @param properties
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
