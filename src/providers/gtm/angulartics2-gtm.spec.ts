import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { TestBed, ComponentFixture, fakeAsync, inject } from '@angular/core/testing';

import { TestModule, RootCmp, advance, createRoot } from '../../test.mocks';

import { Angulartics2 } from '../../core/angulartics2';
import { Angulartics2GoogleTagManager } from './angulartics2-gtm';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

describe('Angulartics2GoogleTagManager', () => {
  var dataLayer: any;
  var fixture: ComponentFixture<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [
        { provide: Location, useClass: SpyLocation },
        Angulartics2GoogleTagManager
      ]
    });

    window.dataLayer = dataLayer = [];
  });

  it('should track initial page',
    fakeAsync(inject([Location, Angulartics2, Angulartics2GoogleTagManager],
        (location: Location, angulartics2: Angulartics2, angulartics2GoogleTagManager: Angulartics2GoogleTagManager) => {
          fixture = createRoot(RootCmp);
          advance(fixture);
          expect(dataLayer).toContain({ event: 'pageview', content-name: '', userId: null });
      })));

  it('should track pages',
    fakeAsync(inject([Location, Angulartics2, Angulartics2GoogleTagManager],
        (location: Location, angulartics2: Angulartics2, angulartics2GoogleTagManager: Angulartics2GoogleTagManager) => {
          fixture = createRoot(RootCmp);
          angulartics2.pageTrack.next({ path: '/abc', location: location });
          advance(fixture);
          expect(dataLayer).toContain({ event: 'pageview', content-name: '/abc', userId: null });
      })));

  it('should track events',
    fakeAsync(inject([Location, Angulartics2, Angulartics2GoogleTagManager],
        (location: Location, angulartics2: Angulartics2, angulartics2GoogleTagManager: Angulartics2GoogleTagManager) => {
          fixture = createRoot(RootCmp);
          angulartics2.eventTrack.next({ action: 'do', properties: { category: 'cat' } });
          advance(fixture);
          expect(dataLayer).toContain({ event: 'do', target: 'cat', userId: null });
      })));

  it('should track exceptions',
    fakeAsync(inject([Location, Angulartics2, Angulartics2GoogleTagManager],
        (location: Location, angulartics2: Angulartics2, angulartics2GoogleTagManager: Angulartics2GoogleTagManager) => {
          fixture = createRoot(RootCmp);
          angulartics2.exceptionTrack.next({ appId: 'app', appName: 'Test App', appVersion: '0.1' });
          advance(fixture);
          expect(dataLayer).toContain({ appId: 'app', appName: 'Test App', appVersion: '0.1', exFatal: true, exDescription: undefined });
      })));

  it('should set username',
    fakeAsync(inject([Location, Angulartics2, Angulartics2GoogleTagManager],
        (location: Location, angulartics2: Angulartics2, angulartics2GoogleTagManager: Angulartics2GoogleTagManager) => {
          fixture = createRoot(RootCmp);
          angulartics2.setUsername.next('testuser');
          advance(fixture);
          expect(angulartics2.settings.dataLayer.userId).toBe('testuser');
      })));

});
