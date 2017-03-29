import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { TestBed, ComponentFixture, fakeAsync, inject } from '@angular/core/testing';

import { TestModule, RootCmp, advance, createRoot } from '../../../../test.mocks';

import { Angulartics } from '../../../core/src/angulartics';
import { AngularticsKissmetrics } from '../src/provider';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

describe('AngularticsKissmetrics', () => {
  var _kmq: Array<any>;
  var fixture: ComponentFixture<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [
        { provide: Location, useClass: SpyLocation },
        AngularticsKissmetrics
      ]
    });

    window._kmq = _kmq = [];
  });
  
  it('should track pages',
    fakeAsync(inject([Location, Angulartics, AngularticsKissmetrics],
        (location: Location, angulartics: Angulartics, angularticsKissmetrics: AngularticsKissmetrics) => {
          fixture = createRoot(RootCmp);
          angulartics.pageTrack.next({ path: '/abc', location: location });
          advance(fixture);
          expect(_kmq).toContain(['record', 'Pageview', { 'Page': '/abc' }]);
      })));

  it('should track events',
    fakeAsync(inject([Location, Angulartics, AngularticsKissmetrics],
        (location: Location, angulartics: Angulartics, angularticsKissmetrics: AngularticsKissmetrics) => {
          fixture = createRoot(RootCmp);
          angulartics.eventTrack.next({ action: 'do', properties: { category: 'cat' } });
          advance(fixture);
          expect(_kmq).toContain(['record', 'do', { category: 'cat' }]);
      })));

  it('should set username',
    fakeAsync(inject([Location, Angulartics, AngularticsKissmetrics],
        (location: Location, angulartics: Angulartics, angularticsKissmetrics: AngularticsKissmetrics) => {
          fixture = createRoot(RootCmp);
          angulartics.setUsername.next('testUser');
          advance(fixture);
          expect(_kmq).toContain(['identify', 'testUser']);
      })));

  it('should set user properties',
    fakeAsync(inject([Location, Angulartics, AngularticsKissmetrics],
        (location: Location, angulartics: Angulartics, angularticsKissmetrics: AngularticsKissmetrics) => {
          fixture = createRoot(RootCmp);
          angulartics.setUserProperties.next({ userId: '1', firstName: 'John', lastName: 'Doe' });
          advance(fixture);
          expect(_kmq).toContain(['set', { userId: '1', firstName: 'John', lastName: 'Doe' }]);
      })));

});
