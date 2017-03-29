import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { TestBed, ComponentFixture, fakeAsync, inject } from '@angular/core/testing';

import { TestModule, RootCmp, advance, createRoot } from '../../../../test.mocks';

import { Angulartics } from '../../../core/src/angulartics';
import { AngularticsFacebook } from '../src/provider';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

describe('AngularticsFacebook', () => {
  var fbq: any;
  var fixture: ComponentFixture<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [
        { provide: Location, useClass: SpyLocation },
        AngularticsFacebook
      ]
    });

    window.fbq = fbq = jasmine.createSpy('fbq');
  });

  it('should track events',
    fakeAsync(inject([Angulartics, AngularticsFacebook],
        (angulartics: Angulartics, angularticsFacebook: AngularticsFacebook) => {
          fixture = createRoot(RootCmp);
          angulartics.eventTrack.next({ action: 'ViewContent', properties: { category: 'cat' } });
          advance(fixture);
          expect(fbq).toHaveBeenCalledWith('track', 'ViewContent', { category: 'cat' });
      })));

  it('should track custom events',
    fakeAsync(inject([Angulartics, AngularticsFacebook],
        (angulartics: Angulartics, angularticsFacebook: AngularticsFacebook) => {
          fixture = createRoot(RootCmp);
          angulartics.eventTrack.next({ action: 'do', properties: { category: 'cat' } });
          advance(fixture);
          expect(fbq).toHaveBeenCalledWith('trackCustom', 'do', { category: 'cat' });
      })));

});
