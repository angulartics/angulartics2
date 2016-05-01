import {Router, Route} from 'angular2/router';
import {
  it,
  inject,
  describe,
  beforeEachProviders,
  ComponentFixture,
  TestComponentBuilder
} from 'angular2/testing';

import {TEST_ROUTER_PROVIDERS, HelloCmp, compile} from '../test.mocks';
import {Angulartics2} from '../core/angulartics2';
import {Angulartics2GoogleAnalytics} from './angulartics2-google-analytics';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

export function main() {


  describe('Angulartics2GoogleAnalytics', () => {
    var ga: any;
    var _gaq: Array<any>;
    var fixture: ComponentFixture;

    beforeEachProviders(() => [
      TEST_ROUTER_PROVIDERS,
      Angulartics2,
      Angulartics2GoogleAnalytics
    ]);

    beforeEach(function() {
      window.ga = ga = jasmine.createSpy('ga');
      window._gaq = _gaq = [];
    });

    it('should track initial page',
      inject([TestComponentBuilder, Router, Angulartics2, Angulartics2GoogleAnalytics],
        (tcb: TestComponentBuilder, router: Router, angulartics2: Angulartics2, angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) => {
          compile(tcb)
            .then((rtc) => fixture = rtc)
            .then((_) => router.config([new Route({ path: '/', component: HelloCmp })]))
            .then((_) => {
              fixture.detectChanges();
              return new Promise((resolve) => {
                setTimeout(() => {
                  expect(_gaq).toContain(['_trackPageview', '']);
                  expect(ga).toHaveBeenCalledWith('send', 'pageview', '');
                  resolve();
                });
              });
            });
        }));

    it('should track pages',
      inject([TestComponentBuilder, Router, Angulartics2, Angulartics2GoogleAnalytics],
        (tcb: TestComponentBuilder, router: Router, angulartics2: Angulartics2, angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) => {
          compile(tcb)
            .then((rtc) => fixture = rtc)
            .then((_) => router.config([new Route({ path: '/abc', component: HelloCmp })]))
            .then((_) => router.navigateByUrl('/abc'))
            .then((_) => {
              fixture.detectChanges();
              return new Promise((resolve) => {
                setTimeout(() => {
                  expect(ga).toHaveBeenCalledWith('send', 'pageview', '/abc');
                  resolve();
                });
              });
            });
        }));

    it('should track events',
      inject([TestComponentBuilder, Angulartics2, Angulartics2GoogleAnalytics],
        (tcb: TestComponentBuilder, angulartics2: Angulartics2, angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) => {
          compile(tcb)
            .then((rtc) => fixture = rtc)
            .then((_) => angulartics2.eventTrack.next({ action: 'do', properties: { category: 'cat' } }))
            .then((_) => {
              fixture.detectChanges();
              return new Promise((resolve) => {
              //   setTimeout(() => {
                  expect(ga).toHaveBeenCalledWith('send', 'event', { eventCategory: 'cat', eventAction: 'do', eventLabel: undefined, eventValue: undefined, nonInteraction: undefined, page: '/context.html', userId: null });
                  resolve();
              //   });
              });
            });
        }));

    it('should track exceptions',
      inject([TestComponentBuilder, Angulartics2, Angulartics2GoogleAnalytics],
        ((tcb: TestComponentBuilder, angulartics2: Angulartics2, angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) => {
          compile(tcb)
            .then((rtc) => fixture = rtc)
            .then((_) => angulartics2.exceptionTrack.next({ appId: 'app', appName: 'Test App', appVersion: '0.1' }))
            .then((_) => {
              fixture.detectChanges();
              return new Promise((resolve) => {
              //   setTimeout(() => {
                  expect(ga).toHaveBeenCalledWith('send', 'exception', { appId: 'app', appName: 'Test App', appVersion: '0.1', exFatal: true, exDescription: undefined });
                  resolve();
              //   });
              });
            });
        })));

    it('should set username',
      inject([TestComponentBuilder, Angulartics2, Angulartics2GoogleAnalytics],
        (tcb: TestComponentBuilder, angulartics2: Angulartics2, angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) => {
          compile(tcb)
            .then((rtc) => fixture = rtc)
            .then((_) => angulartics2.setUsername.next('testuser'))
            .then((_) => {
              fixture.detectChanges();
              return new Promise((resolve) => {
                setTimeout(() => {
                  expect(angulartics2.settings.ga.userId).toBe('testuser');
                  resolve();
                });
              });
            });
        }));

    it('should set user porperties',
      inject([TestComponentBuilder, Angulartics2, Angulartics2GoogleAnalytics],
        (tcb: TestComponentBuilder, angulartics2: Angulartics2, angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) => {
          compile(tcb)
            .then((rtc) => fixture = rtc)
            .then((_) => angulartics2.setUserProperties.next({ dimension1: 'test' }))
            .then((_) => {
              fixture.detectChanges();
              return new Promise((resolve) => {
                // setTimeout(() => {
                  expect(ga).toHaveBeenCalledWith('set', 'dimension1', 'test');
                  resolve();
                // });
              });
            })
            .then((_) => angulartics2.setUserProperties.next({ metric1: 'test' }))
            .then((_) => {
              fixture.detectChanges();
              return new Promise((resolve) => {
              //   setTimeout(() => {
                  expect(ga).toHaveBeenCalledWith('set', 'metric1', 'test');
                  resolve();
              //   });
              });
            });
        }));

    it('should track user timings',
      inject([TestComponentBuilder, Angulartics2, Angulartics2GoogleAnalytics],
        (tcb: TestComponentBuilder, angulartics2: Angulartics2, angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) => {
          compile(tcb)
            .then((rtc) => fixture = rtc)
            .then((_) => angulartics2.userTimings.next({ timingCategory: 'cat', timingVar: 'var', timingValue: 100 }))
            .then((_) => {
              fixture.detectChanges();
              return new Promise((resolve) => {
                // setTimeout(() => {
                  expect(ga).toHaveBeenCalledWith('send', 'timing', { timingCategory: 'cat', timingVar: 'var', timingValue: 100 });
                  resolve();
                // });
              });
            });
        }));

  });
}
