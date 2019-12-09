import { Injectable } from '@angular/core';

import { Angulartics2 } from 'angulartics2';

declare var _paq: any;

@Injectable({ providedIn: 'root' })
export class Angulartics2Piwik {

  constructor(private angulartics2: Angulartics2) {
    if (typeof (_paq) === 'undefined') {
      console.warn('Piwik not found');
    }
    this.angulartics2.setUsername
      .subscribe((x: string) => this.setUsername(x));
    this.angulartics2.setUserProperties
      .subscribe((x) => this.setUserProperties(x));
  }

  startTracking(): void {
    this.angulartics2.pageTrack
      .pipe(this.angulartics2.filterDeveloperMode())
      .subscribe((x) => this.pageTrack(x.path));
    this.angulartics2.eventTrack
      .pipe(this.angulartics2.filterDeveloperMode())
      .subscribe((x) => this.eventTrack(x.action, x.properties));
  }

  pageTrack(path: string, location?: any) {
    try {
      if (!window.location.origin) {
        (window.location as any).origin = window.location.protocol + '//'
          + window.location.hostname
          + (window.location.port ? ':' + window.location.port : '');
      }
      _paq.push(['setDocumentTitle', window.document.title]);
      _paq.push(['setCustomUrl', window.location.origin + path]);
      _paq.push(['trackPageView']);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  /**
   * Track a basic event in Piwik, or send an ecommerce event.
   *
   * @param action A string corresponding to the type of event that needs to be tracked.
   * @param properties The properties that need to be logged with the event.
   */
  eventTrack(action: string, properties: any = {}) {
    let params = [];
    switch (action) {
      /**
       * @description Sets the current page view as a product or category page view. When you call
       * setEcommerceView it must be followed by a call to trackPageView to record the product or
       * category page view.
       *
       * @link https://piwik.org/docs/ecommerce-analytics/#tracking-product-page-views-category-page-views-optional
       * @link https://developer.piwik.org/api-reference/tracking-javascript#ecommerce
       *
       * @property productSKU (required) SKU: Product unique identifier
       * @property productName (optional) Product name
       * @property categoryName (optional) Product category, or array of up to 5 categories
       * @property price (optional) Product Price as displayed on the page
       */
      case 'setEcommerceView':
        params = ['setEcommerceView',
          properties.productSKU,
          properties.productName,
          properties.categoryName,
          properties.price,
        ];
        break;

      /**
       * @description Adds a product into the ecommerce order. Must be called for each product in
       * the order.
       *
       * @link https://piwik.org/docs/ecommerce-analytics/#tracking-ecommerce-orders-items-purchased-required
       * @link https://developer.piwik.org/api-reference/tracking-javascript#ecommerce
       *
       * @property productSKU (required) SKU: Product unique identifier
       * @property productName (optional) Product name
       * @property categoryName (optional) Product category, or array of up to 5 categories
       * @property price (recommended) Product price
       * @property quantity (optional, default to 1) Product quantity
       */
      case 'addEcommerceItem':
        params = [
          'addEcommerceItem',
          properties.productSKU,
          properties.productName,
          properties.productCategory,
          properties.price,
          properties.quantity,
        ];
        break;

      /**
       * @description Tracks a shopping cart. Call this javascript function every time a user is
       * adding, updating or deleting a product from the cart.
       *
       * @link https://piwik.org/docs/ecommerce-analytics/#tracking-add-to-cart-items-added-to-the-cart-optional
       * @link https://developer.piwik.org/api-reference/tracking-javascript#ecommerce
       *
       * @property grandTotal (required) Cart amount
       */
      case 'trackEcommerceCartUpdate':
        params = ['trackEcommerceCartUpdate', properties.grandTotal];
        break;

      /**
       * @description Tracks an Ecommerce order, including any ecommerce item previously added to
       * the order. orderId and grandTotal (ie. revenue) are required parameters.
       *
       * @link https://piwik.org/docs/ecommerce-analytics/#tracking-ecommerce-orders-items-purchased-required
       * @link https://developer.piwik.org/api-reference/tracking-javascript#ecommerce
       *
       * @property orderId (required) Unique Order ID
       * @property grandTotal (required) Order Revenue grand total (includes tax, shipping, and subtracted discount)
       * @property subTotal (optional) Order sub total (excludes shipping)
       * @property tax (optional) Tax amount
       * @property shipping (optional) Shipping amount
       * @property discount (optional) Discount offered (set to false for unspecified parameter)
       */
      case 'trackEcommerceOrder':
        params = [
          'trackEcommerceOrder',
          properties.orderId,
          properties.grandTotal,
          properties.subTotal,
          properties.tax,
          properties.shipping,
          properties.discount,
        ];
        break;

      /**
       * @description Tracks an Ecommerce goal
       *
       * @link https://piwik.org/docs/tracking-goals-web-analytics/
       * @link https://developer.piwik.org/guides/tracking-javascript-guide#manually-trigger-goal-conversions
       *
       * @property goalId (required) Unique Goal ID
       * @property value (optional) passed to goal tracking
       */
      case 'trackGoal':
        params = [
          'trackGoal',
          properties.goalId,
          properties.value,
        ];
        break;

      /**
       * @description Tracks a site search
       *
       * @link https://piwik.org/docs/site-search/
       * @link https://developer.piwik.org/guides/tracking-javascript-guide#internal-search-tracking
       *
       * @property keyword (required) Keyword searched for
       * @property category (optional) Search category
       * @property searchCount (optional) Number of results
       */
      case 'trackSiteSearch':
        params = [
          'trackSiteSearch',
          properties.keyword,
          properties.category,
          properties.searchCount,
        ];
        break;

      /**
       * @description Logs an event with an event category (Videos, Music, Games...), an event
       * action (Play, Pause, Duration, Add Playlist, Downloaded, Clicked...), and an optional
       * event name and optional numeric value.
       *
       * @link https://piwik.org/docs/event-tracking/
       * @link https://developer.piwik.org/api-reference/tracking-javascript#using-the-tracker-object
       *
       * @property category
       * @property action
       * @property name (optional, recommended)
       * @property value (optional)
       */
      default:
        // PAQ requires that eventValue be an integer, see: http://piwik.org/docs/event-tracking
        if (properties.value) {
          const parsed = parseInt(properties.value, 10);
          properties.value = isNaN(parsed) ? 0 : parsed;
        }

        params = [
          'trackEvent',
          properties.category,
          action,
          properties.name || properties.label, // Changed in favour of Piwik documentation. Added fallback so it's backwards compatible.
          properties.value,
        ];
    }
    try {
      _paq.push(params);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  setUsername(userId: string | boolean) {
    try {
      _paq.push(['setUserId', userId]);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  /**
   * Sets custom dimensions if at least one property has the key "dimension<n>",
   * e.g. dimension10. If there are custom dimensions, any other property is ignored.
   *
   * If there are no custom dimensions in the given properties object, the properties
   * object is saved as a custom variable.
   *
   * If in doubt, prefer custom dimensions.
   * @link https://piwik.org/docs/custom-variables/
   */
  setUserProperties(properties: any) {
    const dimensions = this.setCustomDimensions(properties);
    try {
      if (dimensions.length === 0) {
        _paq.push(['setCustomVariable', properties.index, properties.name, properties.value, properties.scope]);
      }
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  private setCustomDimensions(properties: any): string[] {
    const dimensionRegex: RegExp = /dimension[1-9]\d*/;
    const dimensions = Object.keys(properties)
      .filter(key => dimensionRegex.exec(key));
    dimensions.forEach(dimension => {
      const number = Number(dimension.substr(9));
      _paq.push(['setCustomDimension', number, properties[dimension]]);
    });
    return dimensions;
  }
}
