import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { TestBed, ComponentFixture, fakeAsync, inject } from '@angular/core/testing';
import { TestModule } from '../../test.mocks';
import { Angulartics2GoogleAnalyticsEnhancedEcommerce } from './angulartics2-ga-enhanced-ecom';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

describe('Angulartics2GoogleAnalyticsEnhancedEcommerce', () => {
  var ga: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [
        { provide: Location, useClass: SpyLocation },
        Angulartics2GoogleAnalyticsEnhancedEcommerce
      ]
    });

    window.ga = ga = jasmine.createSpy('ga');
  });

  it('should add ec impression',
    fakeAsync(inject([Angulartics2GoogleAnalyticsEnhancedEcommerce],
      (angulartics2GoogleAnalyticsEnhancedEcommerce: Angulartics2GoogleAnalyticsEnhancedEcommerce) => {
        angulartics2GoogleAnalyticsEnhancedEcommerce.ecAddImpression({ id: 'this is id' });
        expect(ga).toHaveBeenCalledWith('ec:addImpression', { id: 'this is id' });
      })));

  it('should add ec product',
    fakeAsync(inject([Angulartics2GoogleAnalyticsEnhancedEcommerce],
      (angulartics2GoogleAnalyticsEnhancedEcommerce: Angulartics2GoogleAnalyticsEnhancedEcommerce) => {
        angulartics2GoogleAnalyticsEnhancedEcommerce.ecAddProduct({ id: 'this is id', name: 'alexander' });
        expect(ga).toHaveBeenCalledWith('ec:addProduct', { id: 'this is id', name: 'alexander' });
      })));

  it('should set ec action',
    fakeAsync(inject([Angulartics2GoogleAnalyticsEnhancedEcommerce],
      (angulartics2GoogleAnalyticsEnhancedEcommerce: Angulartics2GoogleAnalyticsEnhancedEcommerce) => {
        angulartics2GoogleAnalyticsEnhancedEcommerce.ecSetAction('add', { id: 'this is some kind of id' });
        expect(ga).toHaveBeenCalledWith('ec:setAction', 'add', { id: 'this is some kind of id' });
      })));
});
