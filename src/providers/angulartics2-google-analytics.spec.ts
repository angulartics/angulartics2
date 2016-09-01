import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { TestBed, ComponentFixture, fakeAsync, inject } from '@angular/core/testing';

import { TestModule, RootCmp, advance, createRoot } from '../test.mocks';

import { Angulartics2 } from '../core/angulartics2';
import { Angulartics2GoogleAnalytics } from './angulartics2-google-analytics';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

export function main() {

  describe('Angulartics2GoogleAnalytics', () => {
    var ga: any;
    var _gaq: Array<any>;
    var fixture: ComponentFixture<any>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          TestModule
        ],
        providers: [
          { provide: Location, useClass: SpyLocation },
          Angulartics2,
          Angulartics2GoogleAnalytics
        ]
      });

      window.ga = ga = jasmine.createSpy('ga');
      window._gaq = _gaq = [];
    });

    it('should track initial page',
      fakeAsync(inject([Location, Angulartics2, Angulartics2GoogleAnalytics],
          (location: Location, angulartics2: Angulartics2, angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) => {
            fixture = createRoot(RootCmp);
            advance(fixture);
            expect(_gaq).toContain(['_trackPageview', '']);
            expect(ga).toHaveBeenCalledWith('send', 'pageview', '');
        })));

    it('should track pages',
      fakeAsync(inject([Location, Angulartics2, Angulartics2GoogleAnalytics],
          (location: Location, angulartics2: Angulartics2, angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) => {
            fixture = createRoot(RootCmp);
            (<SpyLocation>location).simulateUrlPop('/abc');
            advance(fixture);
            expect(ga).toHaveBeenCalledWith('send', 'pageview', '/abc');
        })));

    it('should track events',
      fakeAsync(inject([Location, Angulartics2, Angulartics2GoogleAnalytics],
          (location: Location, angulartics2: Angulartics2, angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) => {
            fixture = createRoot(RootCmp);
            angulartics2.eventTrack.next({ action: 'do', properties: { category: 'cat' } });
            advance(fixture);
            expect(ga).toHaveBeenCalledWith('send', 'event', { eventCategory: 'cat', eventAction: 'do', eventLabel: undefined, eventValue: undefined, nonInteraction: undefined, page: '/context.html', userId: null });
        })));

    it('should track exceptions',
      fakeAsync(inject([Location, Angulartics2, Angulartics2GoogleAnalytics],
          (location: Location, angulartics2: Angulartics2, angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) => {
            fixture = createRoot(RootCmp);
            angulartics2.exceptionTrack.next({ appId: 'app', appName: 'Test App', appVersion: '0.1' });
            advance(fixture);
            expect(ga).toHaveBeenCalledWith('send', 'exception', { appId: 'app', appName: 'Test App', appVersion: '0.1', exFatal: true, exDescription: undefined });
        })));

    it('should set username',
      fakeAsync(inject([Location, Angulartics2, Angulartics2GoogleAnalytics],
          (location: Location, angulartics2: Angulartics2, angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) => {
            fixture = createRoot(RootCmp);
            angulartics2.setUsername.next('testuser');
            advance(fixture);
            expect(angulartics2.settings.ga.userId).toBe('testuser');
        })));

    it('should set user porperties',
      fakeAsync(inject([Location, Angulartics2, Angulartics2GoogleAnalytics],
          (location: Location, angulartics2: Angulartics2, angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) => {
            fixture = createRoot(RootCmp);
            angulartics2.setUserProperties.next({ dimension1: 'test' });
            advance(fixture);
            expect(ga).toHaveBeenCalledWith('set', 'dimension1', 'test');
            angulartics2.setUserProperties.next({ metric1: 'test' });
            advance(fixture);
            expect(ga).toHaveBeenCalledWith('set', 'metric1', 'test');
        })));

    it('should track user timings',
      fakeAsync(inject([Location, Angulartics2, Angulartics2GoogleAnalytics],
          (location: Location, angulartics2: Angulartics2, angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) => {
            fixture = createRoot(RootCmp);
            angulartics2.userTimings.next({ timingCategory: 'cat', timingVar: 'var', timingValue: 100 })
            advance(fixture);
            expect(ga).toHaveBeenCalledWith('send', 'timing', { timingCategory: 'cat', timingVar: 'var', timingValue: 100 });
        })));

  });
}
