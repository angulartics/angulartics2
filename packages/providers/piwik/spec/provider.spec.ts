import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { TestBed, ComponentFixture, fakeAsync, inject } from '@angular/core/testing';

import { TestModule, RootCmp, advance, createRoot } from '../../../../test.mocks';

import { Angulartics } from '../../../core/src/angulartics';
import { AngularticsPiwik } from '../src/provider';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

describe('AngularticsPiwik', () => {
  var _paq: Array<any>;
  var fixture: ComponentFixture<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [
        { provide: Location, useClass: SpyLocation },
        AngularticsPiwik
      ]
    });

    window._paq = _paq = [];
  });

  it('should track pages',
    fakeAsync(inject([Location, Angulartics, AngularticsPiwik],
    (location: Location, angulartics: Angulartics, angularticsPiwik: AngularticsPiwik) => {
      fixture = createRoot(RootCmp);
      angulartics.pageTrack.next({ path: '/abc', location: location });
      advance(fixture);
      expect(_paq).toContain(['setCustomUrl', '/abc']);
    })));

  it('should track events',
    fakeAsync(inject([Location, Angulartics, AngularticsPiwik],
    (location: Location, angulartics: Angulartics, angularticsPiwik: AngularticsPiwik) => {
      fixture = createRoot(RootCmp);
      angulartics.eventTrack.next({ action: 'do', properties: { category: 'cat' } });
      advance(fixture);
      expect(_paq).toContain(['trackEvent', 'cat', 'do', undefined, undefined]);
    })));

  it('should set username',
    fakeAsync(inject([Location, Angulartics, AngularticsPiwik],
    (location: Location, angulartics: Angulartics, angularticsPiwik: AngularticsPiwik) => {
      fixture = createRoot(RootCmp);
      angulartics.setUsername.next('testUser');
      advance(fixture);
      expect(_paq).toContain(['setUserId', 'testUser']);
    })));

  it('should set user properties',
    fakeAsync(inject([Location, Angulartics, AngularticsPiwik],
    (location: Location, angulartics: Angulartics, angularticsPiwik: AngularticsPiwik) => {
      fixture = createRoot(RootCmp);
      angulartics.setUserProperties.next({ userId: '1', firstName: 'John', lastName: 'Doe' });
      advance(fixture);
      expect(_paq).toContain(['setCustomVariable', { userId: '1', firstName: 'John', lastName: 'Doe' }]);
    })));

});
