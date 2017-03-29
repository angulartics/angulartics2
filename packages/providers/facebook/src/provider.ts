import { Injectable } from '@angular/core';

import { Angulartics } from '../../../core/src/angulartics';

declare const fbq: Function;

@Injectable()
export class AngularticsFacebook {

  constructor(
    private angulartics: Angulartics
  ) {
    this.angulartics.settings.pageTracking.trackRelativePath = true;

    this.angulartics.eventTrack.subscribe((x: any) => this.eventTrack(x.action, x.properties));
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
