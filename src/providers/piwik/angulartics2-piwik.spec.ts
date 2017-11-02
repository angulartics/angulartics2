import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { TestBed, ComponentFixture, fakeAsync, inject } from '@angular/core/testing';

import { TestModule, RootCmp, advance, createRoot } from '../../test.mocks';

import { Angulartics2 } from '../../core/angulartics2';
import { Angulartics2Piwik } from './angulartics2-piwik';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

describe('Angulartics2Piwik', () => {
  var _paq: Array<any>;
  var fixture: ComponentFixture<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [
        {provide: Location, useClass: SpyLocation},
        Angulartics2Piwik
      ]
    });

    window._paq = _paq = [];
  });

  it('should track pages',
    fakeAsync(inject([Location, Angulartics2, Angulartics2Piwik],
      (location: Location, angulartics2: Angulartics2, angulartics2Piwik: Angulartics2Piwik) => {
        fixture = createRoot(RootCmp);
        angulartics2.pageTrack.next({path: '/abc', location: location});
        advance(fixture);
        expect(_paq).toContain(['setCustomUrl', '/abc']);
      })));

  describe('track a basic event or an ecommerce event', () => {
    let product: any;

    beforeEach(() => {
      product = {
        productSKU: 1,
        productName: 'product name',
        productCategory: 'product category',
        price: 1.23,
        quantity: 1
      }
    });

    it('should track set ecommerce view events',
      fakeAsync(inject([Location, Angulartics2, Angulartics2Piwik],
        (location: Location, angulartics2: Angulartics2, angulartics2Piwik: Angulartics2Piwik) => {
          fixture = createRoot(RootCmp);

          // Set up ecommerce view description to inform Piwik that product details are shown
          let ecommerceViewDescription = product;
          ecommerceViewDescription.categoryName = 'category name';

          angulartics2.eventTrack.next({action: 'setEcommerceView', properties: ecommerceViewDescription});
          advance(fixture);

          expect(_paq).toContain(['setEcommerceView',
            ecommerceViewDescription.productSKU,
            ecommerceViewDescription.productName,
            ecommerceViewDescription.categoryName,
            ecommerceViewDescription.price
          ]);
        })));

    it('should track add ecommerce item events', fakeAsync(inject([Location, Angulartics2, Angulartics2Piwik],
      (location: Location, angulartics2: Angulartics2, angulartics2Piwik: Angulartics2Piwik) => {
        fixture = createRoot(RootCmp);

        angulartics2.eventTrack.next({action: 'addEcommerceItem', properties: product});
        advance(fixture);

        expect(_paq).toContain(['addEcommerceItem',
          product.productSKU,
          product.productName,
          product.productCategory,
          product.price,
          product.quantity
        ]);
      })));

    it('should track ecommerce cart update events', fakeAsync(inject([Location, Angulartics2, Angulartics2Piwik],
      (location: Location, angulartics2: Angulartics2, angulartics2Piwik: Angulartics2Piwik) => {
        fixture = createRoot(RootCmp);

        angulartics2.eventTrack.next({action: 'trackEcommerceCartUpdate', properties: {grandTotal: 15.5}});
        advance(fixture);

        expect(_paq).toContain(['trackEcommerceCartUpdate', 15.5]);
      })));

    it('should track ecommerce order events', fakeAsync(inject([Location, Angulartics2, Angulartics2Piwik],
      (location: Location, angulartics2: Angulartics2, angulartics2Piwik: Angulartics2Piwik) => {
        fixture = createRoot(RootCmp);

        let ecommerceOrder = {
          orderId: "A10000123",
          grandTotal: 35,
          subTotal: 30,
          tax: 5.5,
          shipping: 4.5,
          discount: false,
        };

        angulartics2.eventTrack.next({action: 'trackEcommerceOrder', properties: ecommerceOrder});
        advance(fixture);

        expect(_paq).toContain(['trackEcommerceOrder',
          ecommerceOrder.orderId,
          ecommerceOrder.grandTotal,
          ecommerceOrder.subTotal,
          ecommerceOrder.tax,
          ecommerceOrder.shipping,
          ecommerceOrder.discount
        ]);
      })));

    it('should track events',
      fakeAsync(inject([Location, Angulartics2, Angulartics2Piwik],
        (location: Location, angulartics2: Angulartics2, angulartics2Piwik: Angulartics2Piwik) => {
          fixture = createRoot(RootCmp);
          angulartics2.eventTrack.next({action: 'do', properties: {category: 'cat'}});
          advance(fixture);
          expect(_paq).toContain(['trackEvent', 'cat', 'do', undefined, undefined]);
        })));
  });

  it('should set username',
    fakeAsync(inject([Location, Angulartics2, Angulartics2Piwik],
      (location: Location, angulartics2: Angulartics2, angulartics2Piwik: Angulartics2Piwik) => {
        fixture = createRoot(RootCmp);
        angulartics2.setUsername.next('testUser');
        advance(fixture);
        expect(_paq).toContain(['setUserId', 'testUser']);
      })));

  it('should set user properties as custom variable',
    fakeAsync(inject([Location, Angulartics2, Angulartics2Piwik],
      (location: Location, angulartics2: Angulartics2, angulartics2Piwik: Angulartics2Piwik) => {
        fixture = createRoot(RootCmp);
        angulartics2.setUserProperties.next({userId: '1', firstName: 'John', lastName: 'Doe'});
        advance(fixture);
        expect(_paq).toContain(['setCustomVariable', {userId: '1', firstName: 'John', lastName: 'Doe'}]);
      })));

  it('should set user properties as custom dimension',
    fakeAsync(inject([Location, Angulartics2, Angulartics2Piwik],
      (location: Location, angulartics2: Angulartics2, angulartics2Piwik: Angulartics2Piwik) => {
        fixture = createRoot(RootCmp);
        angulartics2.setUserProperties.next({dimension1: 'v1.2.3', dimension2: 'german', dimension43: 'green'});
        advance(fixture);
        expect(_paq).toContain(['setCustomDimension', 1, 'v1.2.3']);
        expect(_paq).toContain(['setCustomDimension', 2, 'german']);
        expect(_paq).toContain(['setCustomDimension', 43, 'green']);
      })));

});
