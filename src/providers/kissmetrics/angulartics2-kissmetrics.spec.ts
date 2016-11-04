import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { TestBed, ComponentFixture, fakeAsync, inject } from '@angular/core/testing';

import { TestModule, RootCmp, advance, createRoot } from '../../test.mocks';

import { Angulartics2 } from '../../core/angulartics2';
import { Angulartics2Kissmetrics } from './angulartics2-kissmetrics';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

describe('Angulartics2Kissmetrics', () => {
  var _kmq: Array<any>;
  var fixture: ComponentFixture<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [
        { provide: Location, useClass: SpyLocation },
        Angulartics2Kissmetrics
      ]
    });

    window._kmq = _kmq = [];
  });
  
  it('should track initial page',
    fakeAsync(inject([Location, Angulartics2, Angulartics2Kissmetrics],
        (location: Location, angulartics2: Angulartics2, angulartics2Kissmetrics: Angulartics2Kissmetrics) => {
          fixture = createRoot(RootCmp);
          advance(fixture);
          expect(_kmq).toContain(['record', 'Pageview', { 'Page': '' }]);
      })));

  it('should track pages',
    fakeAsync(inject([Location, Angulartics2, Angulartics2Kissmetrics],
        (location: Location, angulartics2: Angulartics2, angulartics2Kissmetrics: Angulartics2Kissmetrics) => {
          fixture = createRoot(RootCmp);
          angulartics2.pageTrack.next({ path: '/abc', location: location });
          advance(fixture);
          expect(_kmq).toContain(['record', 'Pageview', { 'Page': '/abc' }]);
      })));

  it('should track events',
    fakeAsync(inject([Location, Angulartics2, Angulartics2Kissmetrics],
        (location: Location, angulartics2: Angulartics2, angulartics2Kissmetrics: Angulartics2Kissmetrics) => {
          fixture = createRoot(RootCmp);
          angulartics2.eventTrack.next({ action: 'do', properties: { category: 'cat' } });
          advance(fixture);
          expect(_kmq).toContain(['record', 'do', { category: 'cat' }]);
      })));

  it('should set username',
    fakeAsync(inject([Location, Angulartics2, Angulartics2Kissmetrics],
        (location: Location, angulartics2: Angulartics2, angulartics2Kissmetrics: Angulartics2Kissmetrics) => {
          fixture = createRoot(RootCmp);
          angulartics2.setUsername.next('testUser');
          advance(fixture);
          expect(_kmq).toContain(['identify', 'testUser']);
      })));

  it('should set user properties',
    fakeAsync(inject([Location, Angulartics2, Angulartics2Kissmetrics],
        (location: Location, angulartics2: Angulartics2, angulartics2Kissmetrics: Angulartics2Kissmetrics) => {
          fixture = createRoot(RootCmp);
          angulartics2.setUserProperties.next({ userId: '1', firstName: 'John', lastName: 'Doe' });
          advance(fixture);
          expect(_kmq).toContain(['set', { userId: '1', firstName: 'John', lastName: 'Doe' }]);
      })));

});
