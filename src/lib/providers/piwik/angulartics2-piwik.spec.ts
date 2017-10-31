import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { ComponentFixture, fakeAsync, inject, TestBed } from '@angular/core/testing';

import { Angulartics2 } from '../../core';
import { advance, createRoot, RootCmp, TestModule } from '../../test.mocks';
import { Angulartics2Piwik } from './angulartics2-piwik';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

describe('Angulartics2Piwik', () => {
  let _paq: Array<any>;
  let fixture: ComponentFixture<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
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
      }),
    ),
  );

  it('should track events',
    fakeAsync(inject([Location, Angulartics2, Angulartics2Piwik],
      (location: Location, angulartics2: Angulartics2, angulartics2Piwik: Angulartics2Piwik) => {
        fixture = createRoot(RootCmp);
        angulartics2.eventTrack.next({ action: 'do', properties: { category: 'cat' } });
        advance(fixture);
        expect(_paq).toContain(['trackEvent', 'cat', 'do', undefined, undefined]);
      }),
    ),
  );

  it('should set username',
    fakeAsync(inject([Location, Angulartics2, Angulartics2Piwik],
      (location: Location, angulartics2: Angulartics2, angulartics2Piwik: Angulartics2Piwik) => {
        fixture = createRoot(RootCmp);
        angulartics2.setUsername.next('testUser');
        advance(fixture);
        expect(_paq).toContain(['setUserId', 'testUser']);
      }),
    ),
  );

  it('should set user properties as custom variable',
    fakeAsync(inject([Location, Angulartics2, Angulartics2Piwik],
      (location: Location, angulartics2: Angulartics2, angulartics2Piwik: Angulartics2Piwik) => {
        fixture = createRoot(RootCmp);
        angulartics2.setUserProperties.next({ userId: '1', firstName: 'John', lastName: 'Doe' });
        advance(fixture);
        expect(_paq).toContain(['setCustomVariable', { userId: '1', firstName: 'John', lastName: 'Doe' }]);
      }),
    ),
  );

    it('should set user properties as custom dimension',
      fakeAsync(inject([Location, Angulartics2, Angulartics2Piwik],
        (location: Location, angulartics2: Angulartics2, angulartics2Piwik: Angulartics2Piwik) => {
          fixture = createRoot(RootCmp);
          angulartics2.setUserProperties.next({dimension1: 'v1.2.3', dimension2: 'german', dimension43: 'green'});
          advance(fixture);
          expect(_paq).toContain(['setCustomDimension', 1, 'v1.2.3']);
          expect(_paq).toContain(['setCustomDimension', 2, 'german']);
          expect(_paq).toContain(['setCustomDimension', 43, 'green']);
      }),
    ),
  );

});
