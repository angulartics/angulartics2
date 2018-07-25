import { Injectable } from '@angular/core';

import { Angulartics2 } from 'angulartics2';

declare const fbq: facebook.Pixel.Event;

const facebookEventList = [
  'ViewContent',
  'Search',
  'AddToCart',
  'AddToWishlist',
  'InitiateCheckout',
  'AddPaymentInfo',
  'Purchase',
  'Lead',
  'CompleteRegistration',
];

@Injectable({ providedIn: 'root' })
export class Angulartics2Facebook {
  constructor(private angulartics2: Angulartics2) { }

  startTracking(): void {
    this.angulartics2.eventTrack
      .pipe(this.angulartics2.filterDeveloperMode())
      .subscribe(x => this.eventTrack(x.action, x.properties));
  }

  /**
   * Send interactions to the Pixel, i.e. for event tracking in Pixel
   *
   * @param action action associated with the event
   */
  eventTrack(action: string, properties: any = {}) {
    if (typeof fbq === 'undefined') {
      return;
    }
    if (facebookEventList.indexOf(action) === -1) {
      return fbq('trackCustom', action, properties);
    }
    return fbq('track', action, properties);
  }
}
