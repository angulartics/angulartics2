import { Injectable } from '@angular/core';

import { Angulartics2 } from 'angulartics2';

declare var _paq: any;

export type EventTrackAction = 'setEcommerceView' | 'addEcommerceItem' | 'trackEcommerceCartUpdate'
  | 'trackEcommerceOrder' | 'trackLink' | 'trackGoal' | 'trackSiteSearch' | string;

export type ScopeMatomo = 'visit' | 'page';


export interface DimensionsMatomoProperties {
  dimension0?: string;
  dimension1?: string;
  dimension2?: string;
  dimension3?: string;
  dimension4?: string;
  dimension5?: string;
  dimension6?: string;
  dimension7?: string;
  dimension8?: string;
  dimension9?: string;
}
export interface SetEcommerceViewMatomoProperties {
  /** @class SetEcommerceViewMatomoProperties */
  productSKU: string;
  /** @class SetEcommerceViewMatomoProperties */
  productName: string;
  /** @class SetEcommerceViewMatomoProperties */
  categoryName: string;
  /** @class SetEcommerceViewMatomoProperties */
  price: string;
}

export interface AddEcommerceItemProperties {
  /** @class AddEcommerceItemProperties */
  productSKU: string;
  /** @class AddEcommerceItemProperties */
  productName: string;
  /** @class AddEcommerceItemProperties */
  productCategory: string;
  /** @class AddEcommerceItemProperties */
  price: string;
  /** @class AddEcommerceItemProperties */
  quantity: string;
}

export interface TrackEcommerceCartUpdateMatomoProperties {
  /** @class TrackEcommerceCartUpdateMatomoProperties */
  grandTotal: string;
}

export interface TrackEcommerceOrderMatomoProperties {
  /** @class TrackEcommerceOrderMatomoProperties */
  orderId: string;
  /** @class TrackEcommerceOrderMatomoProperties */
  grandTotal: string;
  /** @class TrackEcommerceOrderMatomoProperties */
  subTotal: string;
  /** @class TrackEcommerceOrderMatomoProperties */
  tax: string;
  /** @class TrackEcommerceOrderMatomoProperties */
  shipping: string;
  /** @class TrackEcommerceOrderMatomoProperties */
  discount: string;
}

export interface TrackLinkMatomoProperties {
  /** @class TrackLinkMatomoProperties */
  url: string;
  /** @class TrackLinkMatomoProperties */
  linkType: string;
}

export interface TrackGoalMatomoProperties {
  /** @class TrackGoalMatomoProperties */
  goalId: string;
  /** @class TrackGoalMatomoProperties */
  value: string;
}

export interface TrackSiteSearchMatomoProperties {
  /** @class TrackSiteSearchMatomoProperties */
  keyword: string;
  /** @class TrackSiteSearchMatomoProperties */
  category: string;
  /** @class TrackSiteSearchMatomoProperties */
  searchCount: string;
}

export interface TrackEventMatomoProperties {
  /** @class TrackEventMatomoProperties */
  category: string;
  /** @class TrackEventMatomoProperties */
  name?: string;
  /** @class TrackEventMatomoProperties */
  label?: string;
  /** @class TrackEventMatomoProperties */
  value: number | string;
}

export interface SetCustomVariableMatomoProperties extends DimensionsMatomoProperties {
  /** @class SetCustomVariableMatomoProperties */
  index: number;
  /** @class SetCustomVariableMatomoProperties */
  name: string;
  /** @class SetCustomVariableMatomoProperties */
  value: string;
  /** @class SetCustomVariableMatomoProperties */
  scope: ScopeMatomo;
}

export interface DeleteCustomVariableMatomoProperties {
  /** @class DeleteCustomVariableMatomoProperties */
  index: number;
  /** @class DeleteCustomVariableMatomoProperties */
  scope: ScopeMatomo;
}

export type EventTrackactionProperties = SetEcommerceViewMatomoProperties
  | AddEcommerceItemProperties
  | TrackEcommerceCartUpdateMatomoProperties
  | TrackEcommerceOrderMatomoProperties
  | TrackLinkMatomoProperties
  | TrackGoalMatomoProperties
  | TrackSiteSearchMatomoProperties
  | TrackEventMatomoProperties;

@Injectable({ providedIn: 'root' })
export class Angulartics2Matomo {

  constructor(private angulartics2: Angulartics2) {
    if (typeof (_paq) === 'undefined') {
      console.warn('Matomo not found');
    }
    this.angulartics2.setUsername
      .subscribe((x: string) => this.setUsername(x));
    this.angulartics2.setUserProperties
      .subscribe((x: SetCustomVariableMatomoProperties) => this.setUserProperties(x));
  }

  startTracking(): void {
    this.angulartics2.pageTrack
      .pipe(this.angulartics2.filterDeveloperMode())
      .subscribe((x) => this.pageTrack(x.path));
    this.angulartics2.eventTrack
      .pipe(this.angulartics2.filterDeveloperMode())
      .subscribe((x) => this.eventTrack(x.action, x.properties));
  }

  pageTrack(path: string, title?: string) {
    try {
      if (!window.location.origin) {
        (window.location as any).origin = window.location.protocol + '//'
          + window.location.hostname
          + (window.location.port ? ':' + window.location.port : '');
      }
      _paq.push(['setDocumentTitle', title || window.document.title]);
      _paq.push(['setCustomUrl', window.location.origin + path]);
      _paq.push(['trackPageView']);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  resetUser() {
    try {
      _paq.push(['appendToTrackingUrl', 'new_visit=1']); // (1) forces a new visit
      _paq.push(['deleteCookies']); // (2) deletes existing tracking cookies to start the new visit
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  eventTrack(action: 'setEcommerceView', properties: SetEcommerceViewMatomoProperties): void;
  eventTrack(action: 'addEcommerceItem', properties: AddEcommerceItemProperties): void;
  eventTrack(action: 'trackEcommerceCartUpdate', properties: TrackEcommerceCartUpdateMatomoProperties): void;
  eventTrack(action: 'trackEcommerceOrder', properties: TrackEcommerceOrderMatomoProperties): void;
  eventTrack(action: 'trackLink', properties: TrackLinkMatomoProperties): void;
  eventTrack(action: 'trackGoal', properties: TrackGoalMatomoProperties): void;
  eventTrack(action: 'trackSiteSearch', properties: TrackSiteSearchMatomoProperties): void;
  eventTrack(action: string, properties: TrackEventMatomoProperties): void;

  /**
   * Track a basic event in Matomo, or send an ecommerce event.
   *
   * @param action A string corresponding to the type of event that needs to be tracked.
   * @param properties The properties that need to be logged with the event.
   */
  eventTrack(action: EventTrackAction, properties?: EventTrackactionProperties) {
    let params = [];
    switch (action) {
      /**
       * @description Sets the current page view as a product or category page view. When you call
       * setEcommerceView it must be followed by a call to trackPageView to record the product or
       * category page view.
       *
       * @link https://matomo.org/docs/ecommerce-analytics/#tracking-product-page-views-category-page-views-optional
       * @link https://developer.matomo.org/api-reference/tracking-javascript#ecommerce
       *
       * @property productSKU (required) SKU: Product unique identifier
       * @property productName (optional) Product name
       * @property categoryName (optional) Product category, or array of up to 5 categories
       * @property price (optional) Product Price as displayed on the page
       */
      case 'setEcommerceView':
        params = ['setEcommerceView',
          (properties as SetEcommerceViewMatomoProperties).productSKU,
          (properties as SetEcommerceViewMatomoProperties).productName,
          (properties as SetEcommerceViewMatomoProperties).categoryName,
          (properties as SetEcommerceViewMatomoProperties).price,
        ];
        break;

      /**
       * @description Adds a product into the ecommerce order. Must be called for each product in
       * the order.
       *
       * @link https://matomo.org/docs/ecommerce-analytics/#tracking-ecommerce-orders-items-purchased-required
       * @link https://developer.matomo.org/api-reference/tracking-javascript#ecommerce
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
          (properties as AddEcommerceItemProperties).productSKU,
          (properties as AddEcommerceItemProperties).productName,
          (properties as AddEcommerceItemProperties).productCategory,
          (properties as AddEcommerceItemProperties).price,
          (properties as AddEcommerceItemProperties).quantity,
        ];
        break;

      /**
       * @description Tracks a shopping cart. Call this javascript function every time a user is
       * adding, updating or deleting a product from the cart.
       *
       * @link https://matomo.org/docs/ecommerce-analytics/#tracking-add-to-cart-items-added-to-the-cart-optional
       * @link https://developer.matomo.org/api-reference/tracking-javascript#ecommerce
       *
       * @property grandTotal (required) Cart amount
       */
      case 'trackEcommerceCartUpdate':
        params = ['trackEcommerceCartUpdate', (properties as TrackEcommerceCartUpdateMatomoProperties).grandTotal];
        break;

      /**
       * @description Tracks an Ecommerce order, including any ecommerce item previously added to
       * the order. orderId and grandTotal (ie. revenue) are required parameters.
       *
       * @link https://matomo.org/docs/ecommerce-analytics/#tracking-ecommerce-orders-items-purchased-required
       * @link https://developer.matomo.org/api-reference/tracking-javascript#ecommerce
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
          (properties as TrackEcommerceOrderMatomoProperties).orderId,
          (properties as TrackEcommerceOrderMatomoProperties).grandTotal,
          (properties as TrackEcommerceOrderMatomoProperties).subTotal,
          (properties as TrackEcommerceOrderMatomoProperties).tax,
          (properties as TrackEcommerceOrderMatomoProperties).shipping,
          (properties as TrackEcommerceOrderMatomoProperties).discount,
        ];
        break;

      /**
       * @description To manually trigger an outlink
       *
       * @link https://matomo.org/docs/tracking-goals-web-analytics/
       * @link https://developer.matomo.org/guides/tracking-javascript-guide#tracking-a-click-as-an-outlink-via-css-or-javascript
       *
       * @property url (required) link url
       * @property linkType (optional) type of link
       */
      case 'trackLink':
        params = [
          'trackLink',
          (properties as TrackLinkMatomoProperties).url,
          (properties as TrackLinkMatomoProperties).linkType
        ];
        break;

      /**
       * @description Tracks an Ecommerce goal
       *
       * @link https://matomo.org/docs/tracking-goals-web-analytics/
       * @link https://developer.matomo.org/guides/tracking-javascript-guide#manually-trigger-goal-conversions
       *
       * @property goalId (required) Unique Goal ID
       * @property value (optional) passed to goal tracking
       */
      case 'trackGoal':
        params = [
          'trackGoal',
          (properties as TrackGoalMatomoProperties).goalId,
          (properties as TrackGoalMatomoProperties).value,
        ];
        break;

      /**
       * @description Tracks a site search
       *
       * @link https://matomo.org/docs/site-search/
       * @link https://developer.matomo.org/guides/tracking-javascript-guide#internal-search-tracking
       *
       * @property keyword (required) Keyword searched for
       * @property category (optional) Search category
       * @property searchCount (optional) Number of results
       */
      case 'trackSiteSearch':
        params = [
          'trackSiteSearch',
          (properties as TrackSiteSearchMatomoProperties).keyword,
          (properties as TrackSiteSearchMatomoProperties).category,
          (properties as TrackSiteSearchMatomoProperties).searchCount,
        ];
        break;

      /**
       * @description Logs an event with an event category (Videos, Music, Games...), an event
       * action (Play, Pause, Duration, Add Playlist, Downloaded, Clicked...), and an optional
       * event name and optional numeric value.
       *
       * @link https://matomo.org/docs/event-tracking/
       * @link https://developer.matomo.org/api-reference/tracking-javascript#using-the-tracker-object
       *
       * @property category
       * @property action
       * @property name (optional, recommended)
       * @property value (optional)
       */
      default:
        // PAQ requires that eventValue be an integer, see: http://matomo.org/docs/event-tracking
        if ((properties as TrackEventMatomoProperties).value) {
          const parsed = parseInt((properties as TrackEventMatomoProperties).value as any, 10);
          (properties as TrackEventMatomoProperties).value = isNaN(parsed) ? 0 : parsed;
        }

        params = [
          'trackEvent',
          (properties as TrackEventMatomoProperties).category,
          action,
          (properties as TrackEventMatomoProperties).name || (properties as TrackEventMatomoProperties).label, // Changed in favour of Matomo documentation. Added fallback so it's backwards compatible.
          (properties as TrackEventMatomoProperties).value,
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
   * @link https://matomo.org/docs/custom-variables/
   */
  setUserProperties(properties: SetCustomVariableMatomoProperties) {
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

  /**
    * If you created a custom variable and then decide to remove this variable from 
    * a visit or page view, you can use deleteCustomVariable.
    *
    * @link https://developer.matomo.org/guides/tracking-javascript-guide#deleting-a-custom-variable
    */
  deletedUserProperties(properties: DeleteCustomVariableMatomoProperties) {
    try {
      _paq.push(['deleteCustomVariable', properties.index, properties.scope]);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  private setCustomDimensions(properties: SetCustomVariableMatomoProperties): string[] {
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
