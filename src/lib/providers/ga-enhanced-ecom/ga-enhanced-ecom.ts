import { Injectable } from '@angular/core';
import {
  GaEnhancedEcomAction,
  GaEnhancedEcomActionFieldObject,
  GaEnhancedEcomImpressionFieldObject,
  GaEnhancedEcomProductFieldObject,
} from './ga-enhanced-ecom-options';

declare var ga: UniversalAnalytics.ga;

@Injectable({ providedIn: 'root' })
export class Angulartics2GoogleAnalyticsEnhancedEcommerce {
  /**
   * Add impression in GA enhanced ecommerce tracking
   * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#measuring-activities
   */
  ecAddImpression(properties: Partial<GaEnhancedEcomImpressionFieldObject>) {
    ga('ec:addImpression', properties);
  }

  /**
   * Add product in GA enhanced ecommerce tracking
   * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce
   */
  ecAddProduct(product: Partial<GaEnhancedEcomProductFieldObject>) {
    ga('ec:addProduct', product);
  }

  /**
   * Set action in GA enhanced ecommerce tracking
   * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce
   */
  ecSetAction(
    action: GaEnhancedEcomAction,
    properties: Partial<GaEnhancedEcomActionFieldObject>,
  ) {
    ga('ec:setAction', action, properties);
  }
}
