import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { TestBed, ComponentFixture, fakeAsync, inject } from '@angular/core/testing';

import { TestModule, RootCmp, advance, createRoot } from '../../test.mocks';

import { Angulartics2 } from 'angulartics2';
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
        { provide: Location, useClass: SpyLocation },
        Angulartics2Piwik
      ]
    });

    window._paq = _paq = [];
  });

  it('should track pages',
    fakeAsync(inject([Location, Angulartics2, Angulartics2Piwik],
    (location: Location, angulartics2: Angulartics2, angulartics2Piwik: Angulartics2Piwik) => {
      fixture = createRoot(RootCmp);
      angulartics2.pageTrack.next({ path: '/abc', location: location });
      advance(fixture);
      expect(_paq).toContain(['setCustomUrl', '/abc']);
    })));

  it('should track events',
    fakeAsync(inject([Location, Angulartics2, Angulartics2Piwik],
    (location: Location, angulartics2: Angulartics2, angulartics2Piwik: Angulartics2Piwik) => {
      fixture = createRoot(RootCmp);
      angulartics2.eventTrack.next({ action: 'do', properties: { category: 'cat' } });
      advance(fixture);
      expect(_paq).toContain(['trackEvent', 'cat', 'do', undefined, undefined]);
    })));

  it('should set username',
    fakeAsync(inject([Location, Angulartics2, Angulartics2Piwik],
    (location: Location, angulartics2: Angulartics2, angulartics2Piwik: Angulartics2Piwik) => {
      fixture = createRoot(RootCmp);
      angulartics2.setUsername.next('testUser');
      advance(fixture);
      expect(_paq).toContain(['setUserId', 'testUser']);
    })));

  it('should set user properties',
    fakeAsync(inject([Location, Angulartics2, Angulartics2Piwik],
    (location: Location, angulartics2: Angulartics2, angulartics2Piwik: Angulartics2Piwik) => {
      fixture = createRoot(RootCmp);
      angulartics2.setUserProperties.next({ userId: '1', firstName: 'John', lastName: 'Doe' });
      advance(fixture);
      expect(_paq).toContain(['setCustomVariable', { userId: '1', firstName: 'John', lastName: 'Doe' }]);
    })));

});
