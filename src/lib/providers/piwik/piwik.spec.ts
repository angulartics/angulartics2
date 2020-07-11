import { fakeAsync, inject, ComponentFixture, TestBed } from '@angular/core/testing';

import { Angulartics2 } from 'angulartics2';
import { advance, createRoot, RootCmp, TestModule } from '../../test.mocks';
import { Angulartics2Piwik } from './piwik';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

describe('Angulartics2Piwik', () => {
  let _paq: Array<any>;
  let fixture: ComponentFixture<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [Angulartics2Piwik],
    });

    window._paq = _paq = [];
    const provider: Angulartics2Piwik = TestBed.inject(Angulartics2Piwik);
    provider.startTracking();
  });

  it('should track pages',
    fakeAsync(inject([Angulartics2, Angulartics2Piwik],
      (angulartics2: Angulartics2, angulartics2Piwik: Angulartics2Piwik) => {
        fixture = createRoot(RootCmp);
        angulartics2.pageTrack.next({path: '/abc' });
        advance(fixture);
        expect(_paq).toContain(['setCustomUrl', window.location.origin + '/abc']);
      },
    )),
  );

  describe('track a basic event or an ecommerce event', () => {
    let product: any;

    beforeEach(() => {
      product = {
        productSKU: 1,
        productName: 'product name',
        productCategory: 'product category',
        price: 1.23,
        quantity: 1
      };
    });

    it('should track set ecommerce view events',
      fakeAsync(inject([Angulartics2, Angulartics2Piwik],
        (angulartics2: Angulartics2, angulartics2Piwik: Angulartics2Piwik) => {
          fixture = createRoot(RootCmp);

          // Set up ecommerce view description to inform Piwik that product details are shown
          const ecommerceViewDescription = product;
          ecommerceViewDescription.categoryName = 'category name';

          angulartics2.eventTrack.next({action: 'setEcommerceView', properties: ecommerceViewDescription});
          advance(fixture);

          expect(_paq).toContain(['setEcommerceView',
            ecommerceViewDescription.productSKU,
            ecommerceViewDescription.productName,
            ecommerceViewDescription.categoryName,
            ecommerceViewDescription.price
          ]);
        },
      )),
    );


    it('should track goals',
      fakeAsync(inject([Angulartics2, Angulartics2Piwik],
        (angulartics2: Angulartics2, angulartics2Piwik: Angulartics2Piwik) => {
          fixture = createRoot(RootCmp);

          const piwikGoal = {
            goalId: 1,
            value: 35,
          };

          angulartics2.eventTrack.next({action: 'trackGoal', properties: piwikGoal});
          advance(fixture);

          expect(_paq).toContain([
            'trackGoal',
            piwikGoal.goalId,
            piwikGoal.value,
          ]);
        }
      )),
    );

    it('should track add ecommerce item events',
      fakeAsync(inject([Angulartics2, Angulartics2Piwik],
        (angulartics2: Angulartics2, angulartics2Piwik: Angulartics2Piwik) => {
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
        }
      )),
    );

    it('should track ecommerce cart update events',
      fakeAsync(inject([Angulartics2, Angulartics2Piwik],
        (angulartics2: Angulartics2, angulartics2Piwik: Angulartics2Piwik) => {
          fixture = createRoot(RootCmp);

          angulartics2.eventTrack.next({action: 'trackEcommerceCartUpdate', properties: {grandTotal: 15.5}});
          advance(fixture);

          expect(_paq).toContain(['trackEcommerceCartUpdate', 15.5]);
        }
      )),
    );

    it('should track ecommerce order events',
      fakeAsync(inject([Angulartics2, Angulartics2Piwik],
        (angulartics2: Angulartics2, angulartics2Piwik: Angulartics2Piwik) => {
          fixture = createRoot(RootCmp);

          const ecommerceOrder = {
            orderId: 'A10000123',
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
        }
      )),
    );

    it('should track search',
      fakeAsync(inject([Angulartics2, Angulartics2Piwik],
        (angulartics2: Angulartics2, angulartics2Piwik: Angulartics2Piwik) => {
          fixture = createRoot(RootCmp);

          const search = {
            keyword: 'my search string',
            category: 'my search category',
            searchCount: 42,
          };

          angulartics2.eventTrack.next({action: 'trackSiteSearch', properties: search});
          advance(fixture);

          expect(_paq).toContain(['trackSiteSearch',
            search.keyword,
            search.category,
            search.searchCount,
          ]);
        }
      )),
    );

    it('should track events', fakeAsync(inject([Angulartics2, Angulartics2Piwik],
      (angulartics2: Angulartics2, angulartics2Piwik: Angulartics2Piwik) => {
        fixture = createRoot(RootCmp);
        angulartics2.eventTrack.next({action: 'do', properties: {category: 'cat'}});
        advance(fixture);
        expect(_paq).toContain(['trackEvent', 'cat', 'do', undefined, undefined]);
      }
    )));

  });

  it('should set username', fakeAsync(inject([Angulartics2, Angulartics2Piwik],
    (angulartics2: Angulartics2, angulartics2Piwik: Angulartics2Piwik) => {
      fixture = createRoot(RootCmp);
      angulartics2.setUsername.next('testUser');
      advance(fixture);
      expect(_paq).toContain(['setUserId', 'testUser']);
    }
  )));

  it('should set user properties as custom variable',
    fakeAsync(inject([Angulartics2, Angulartics2Piwik],
      (angulartics2: Angulartics2, angulartics2Piwik: Angulartics2Piwik) => {
        fixture = createRoot(RootCmp);
        angulartics2.setUserProperties.next({index: 1, name: 'John', value: 123, scope: 'visit'});
        advance(fixture);
        expect(_paq).toContain(['setCustomVariable', 1, 'John', 123, 'visit']);
      }
    )),
  );

  it('should set user properties as custom dimension',
    fakeAsync(inject([Angulartics2, Angulartics2Piwik],
      (angulartics2: Angulartics2, angulartics2Piwik: Angulartics2Piwik) => {
        fixture = createRoot(RootCmp);
        angulartics2.setUserProperties.next({
          dimension1: 'v1.2.3',
          dimension2: 'german',
          dimension43: 'green',
        });
        advance(fixture);
        expect(_paq).toContain(['setCustomDimension', 1, 'v1.2.3']);
        expect(_paq).toContain(['setCustomDimension', 2, 'german']);
        expect(_paq).toContain(['setCustomDimension', 43, 'green']);
      },
    )),
  );

});
