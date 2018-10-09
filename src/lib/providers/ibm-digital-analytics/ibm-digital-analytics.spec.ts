import {
  fakeAsync,
  inject,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { Angulartics2 } from 'angulartics2';
import { advance, createRoot, RootCmp, TestModule } from '../../test.mocks';
import { Angulartics2IBMDigitalAnalytics } from './ibm-digital-analytics';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

describe('Angulartics2IBMDigitalAnalytics', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [Angulartics2IBMDigitalAnalytics],
    });
    window.console = jasmine.createSpyObj('console', ['warn', 'log']);
  });

  describe('on init', () => {
    beforeEach(() => {
      window.console = jasmine.createSpyObj('console', ['warn', 'log']);
      window.cmCreatePageviewTag = undefined;
    });

    it('should complain if global IBM Digital Analytics functions were not loaded', fakeAsync(
      inject(
        [Angulartics2, Angulartics2IBMDigitalAnalytics],
        (
          angulartics2: Angulartics2,
          angulartics2IBMDigitalAnalytics: Angulartics2IBMDigitalAnalytics,
        ) => {
          fixture = createRoot(RootCmp);
          advance(fixture);
          expect(console.warn).toHaveBeenCalled();
        },
      ),
    ));
  });

  describe('while active', () => {
    beforeEach(() => {
      window.cmCreatePageviewTag = jasmine.createSpy('cmCreatePageviewTag');
      window.cmCreateProductviewTag = jasmine.createSpy('cmCreateProductviewTag');
      window.cmCreateShopAction5Tag = jasmine.createSpy('cmCreateShopAction5Tag');
      window.cmCreateShopAction9Tag = jasmine.createSpy('cmCreateShopAction9Tag');
      window.cmCreateOrderTag = jasmine.createSpy('cmCreateOrderTag');
      window.cmCreateRegistrationTag = jasmine.createSpy('cmCreateRegistrationTag');
      window.cmCreateElementTag = jasmine.createSpy('cmCreateElementTag');
      window.cmCreateConversionEventTag = jasmine.createSpy('cmCreateConversionEventTag');
      window.cmDisplayShops = jasmine.createSpy('cmDisplayShops');
      const provider: Angulartics2IBMDigitalAnalytics = TestBed.get(Angulartics2IBMDigitalAnalytics);
      provider.startTracking();
    });

    it('should track pages', fakeAsync(
      inject(
        [Angulartics2, Angulartics2IBMDigitalAnalytics],
        (
          angulartics2: Angulartics2,
          angulartics2IBMDigitalAnalytics: Angulartics2IBMDigitalAnalytics,
        ) => {
          fixture = createRoot(RootCmp);
          angulartics2.pageTrack.next({ path: '/abc' });
          advance(fixture);
          expect(window.cmCreatePageviewTag).toHaveBeenCalledWith(
            '/abc',
            null,
            null,
            null,
          );
        },
      ),
    ));

    it('should track cmCreateProductviewTag event', fakeAsync(
      inject(
        [Angulartics2, Angulartics2IBMDigitalAnalytics],
        (
          angulartics2: Angulartics2,
          angulartics2IBMDigitalAnalytics: Angulartics2IBMDigitalAnalytics,
        ) => {
          fixture = createRoot(RootCmp);
          angulartics2.eventTrack.next({
            action: 'cmCreateProductviewTag',
            properties: {
              productId: '123',
              productName: 'Apples',
              categoryId: 'Fruits',
              attrbute: 'attributes',
              virtualCategory: 'virtual category',
            },
          });
          advance(fixture);
          expect(window.cmCreateProductviewTag).toHaveBeenCalledWith(
            '123',
            'Apples',
            'Fruits',
            'attributes',
            'virtual category',
          );
        },
      ),
    ));

    it('should track cmCreateShopAction5Tag event', fakeAsync(
      inject(
        [Angulartics2, Angulartics2IBMDigitalAnalytics],
        (
          angulartics2: Angulartics2,
          angulartics2IBMDigitalAnalytics: Angulartics2IBMDigitalAnalytics,
        ) => {
          fixture = createRoot(RootCmp);
          angulartics2.eventTrack.next({
            action: 'cmCreateShopAction5Tag',
            properties: {
              productId: '123',
              productName: 'Apples',
              quantity: '5',
              unitPrice: '1.99',
              categoryId: 'Fruits',
              attrbute: 'attributes',
              extraFields: 'extra',
              virtualCategory: 'virtual category',
            },
          });

          advance(fixture);
          expect(window.cmCreateShopAction5Tag).toHaveBeenCalledWith(
            '123',
            'Apples',
            '5',
            '1.99',
            'Fruits',
            'attributes',
            'extra',
            'virtual category',
          );
        },
      ),
    ));

    it('should track cmCreateShopAction9Tag event', fakeAsync(
      inject(
        [Angulartics2, Angulartics2IBMDigitalAnalytics],
        (
          angulartics2: Angulartics2,
          angulartics2IBMDigitalAnalytics: Angulartics2IBMDigitalAnalytics,
        ) => {
          fixture = createRoot(RootCmp);
          angulartics2.eventTrack.next({
            action: 'cmCreateShopAction9Tag',
            properties: {
              productId: '123',
              productName: 'Apples',
              quantity: '5',
              unitPrice: '1.99',
              registrationId: '001',
              orderId: '777',
              orderSubtotal: '19.90',
              categoryId: 'Fruits',
              attrbute: 'attributes',
              extraFields: 'extra',
            },
          });

          advance(fixture);
          expect(window.cmCreateShopAction9Tag).toHaveBeenCalledWith(
            '123',
            'Apples',
            '5',
            '1.99',
            '001',
            '777',
            '19.90',
            'Fruits',
            'attributes',
            'extra',
          );
        },
      ),
    ));

    it('should track cmCreateOrderTag event', fakeAsync(
      inject(
        [Angulartics2, Angulartics2IBMDigitalAnalytics],
        (
          angulartics2: Angulartics2,
          angulartics2IBMDigitalAnalytics: Angulartics2IBMDigitalAnalytics,
        ) => {
          fixture = createRoot(RootCmp);
          angulartics2.eventTrack.next({
            action: 'cmCreateOrderTag',
            properties: {
              orderId: '777',
              orderSubtotal: '19.90',
              orderShipping: '1.00',
              registrationId: '001',
              registrantCity: 'Atlanta',
              registrantState: 'GA',
              registrantPostalCode: '30303',
              attrbute: 'attributes',
              extraFields: 'extra',
            },
          });

          advance(fixture);
          expect(window.cmCreateOrderTag).toHaveBeenCalledWith(
            '777',
            '19.90',
            '1.00',
            '001',
            'Atlanta',
            'GA',
            '30303',
            'attributes',
            'extra',
          );
        },
      ),
    ));

    it('should track cmCreateRegistrationTag event', fakeAsync(
      inject(
        [Angulartics2, Angulartics2IBMDigitalAnalytics],
        (
          angulartics2: Angulartics2,
          angulartics2IBMDigitalAnalytics: Angulartics2IBMDigitalAnalytics,
        ) => {
          fixture = createRoot(RootCmp);
          angulartics2.eventTrack.next({
            action: 'cmCreateRegistrationTag',
            properties: {
              registrationId: '001',
              registrantEmail: 'john@doe.com',
              registrantCity: 'Atlanta',
              registrantState: 'GA',
              registrantPostalCode: '30303',
              registrantCountry: 'US',
              attrbute: 'attributes',
            },
          });

          advance(fixture);
          expect(window.cmCreateRegistrationTag).toHaveBeenCalledWith(
            '001',
            'john@doe.com',
            'Atlanta',
            'GA',
            '30303',
            'US',
            'attributes',
          );
        },
      ),
    ));

    it('should track cmCreateElementTag event', fakeAsync(
      inject(
        [Angulartics2, Angulartics2IBMDigitalAnalytics],
        (
          angulartics2: Angulartics2,
          angulartics2IBMDigitalAnalytics: Angulartics2IBMDigitalAnalytics,
        ) => {
          fixture = createRoot(RootCmp);
          angulartics2.eventTrack.next({
            action: 'cmCreateElementTag',
            properties: {
              elementId: 'form_001',
              elementCategory: 'forms',
              attrbute: 'attributes',
            },
          });

          advance(fixture);
          expect(window.cmCreateElementTag).toHaveBeenCalledWith(
            'form_001',
            'forms',
            'attributes',
          );
        },
      ),
    ));

    it('should track cmCreateConversionEventTag event', fakeAsync(
      inject(
        [Angulartics2, Angulartics2IBMDigitalAnalytics],
        (
          angulartics2: Angulartics2,
          angulartics2IBMDigitalAnalytics: Angulartics2IBMDigitalAnalytics,
        ) => {
          fixture = createRoot(RootCmp);
          angulartics2.eventTrack.next({
            action: 'cmCreateConversionEventTag',
            properties: {
              eventId: 'event_001',
              actionType: 'form submitted',
              eventCategoryId: 'forms',
              points: '10.00',
              attrbute: 'attributes',
              extraFields: 'extra',
            },
          });

          advance(fixture);
          expect(window.cmCreateConversionEventTag).toHaveBeenCalledWith(
            'event_001',
            'form submitted',
            'forms',
            '10.00',
            'attributes',
            'extra',
          );
        },
      ),
    ));

    it('should complain for unsupported event type', fakeAsync(
      inject(
        [Angulartics2, Angulartics2IBMDigitalAnalytics],
        (
          angulartics2: Angulartics2,
          angulartics2IBMDigitalAnalytics: Angulartics2IBMDigitalAnalytics,
        ) => {
          fixture = createRoot(RootCmp);
          angulartics2.eventTrack.next({
            action: 'unsupported event',
            properties: {},
          });

          advance(fixture);
          expect(console.warn).toHaveBeenCalled();
        },
      ),
    ));
  });
});
