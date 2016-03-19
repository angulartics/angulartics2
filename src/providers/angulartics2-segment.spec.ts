import {Component, provide} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router, Route, Location} from 'angular2/router';
import {
  it,
  iit,
  injectAsync,
  describe,
  ddescribe,
  beforeEachProviders,
  ComponentFixture,
  TestComponentBuilder
} from 'angular2/testing';

import {TEST_ROUTER_PROVIDERS, RootCmp, HelloCmp, compile} from '../test.mocks';
import {Angulartics2} from '../core/angulartics2';
import {Angulartics2Segment} from './angulartics2-segment';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

export function main() {
  describe('Angulartics2Segment', () => {

    var fixture: ComponentFixture;
    var analytics: any;

    beforeEachProviders(() => [
      TEST_ROUTER_PROVIDERS,
      Angulartics2,
      Angulartics2Segment
    ]);

    beforeEach(function() {
      window.analytics = analytics = {
        page: jasmine.createSpy('page'),
        track: jasmine.createSpy('track'),
        identify: jasmine.createSpy('identify'),
        alias: jasmine.createSpy('alias')
      }
    });

    it('should track initial page',
      injectAsync([TestComponentBuilder, Router, Angulartics2, Angulartics2Segment],
        (tcb: TestComponentBuilder, router: Router, angulartics2: Angulartics2, angulartics2Segment: Angulartics2Segment) => {
          return compile(tcb)
            .then((rtc) => fixture = rtc)
            .then((_) => router.config([new Route({ path: '/', component: HelloCmp })]))
            .then((_) => {
              fixture.detectChanges();
              return new Promise((resolve) => {
                setTimeout(() => {
                  expect(analytics.page).toHaveBeenCalledWith('');
                  resolve();
                });
              });
            });
        }));

    it('should track pages',
      injectAsync([TestComponentBuilder, Router, Angulartics2, Angulartics2Segment],
        (tcb: TestComponentBuilder, router: Router, angulartics2: Angulartics2, angulartics2Segment: Angulartics2Segment) => {
          return compile(tcb)
            .then((rtc) => fixture = rtc)
            .then((_) => router.config([new Route({ path: '/abc', component: HelloCmp })]))
            .then((_) => router.navigateByUrl('/abc'))
            .then((_) => {
              fixture.detectChanges();
              return new Promise((resolve) => {
                setTimeout(() => {
                  expect(analytics.page).toHaveBeenCalledWith('/abc');
                  resolve();
                });
              });
            });
        }));

    it('should track events',
      injectAsync([TestComponentBuilder, Angulartics2, Angulartics2Segment],
        (tcb: TestComponentBuilder, angulartics2: Angulartics2, angulartics2Segment: Angulartics2Segment) => {
          return compile(tcb)
            .then((rtc) => fixture = rtc)
            .then((_) => angulartics2.eventTrack.next({ action: 'do', properties: { category: 'cat' } }))
            .then((_) => {
              fixture.detectChanges();
              return new Promise((resolve) => {
                setTimeout(() => {
                  expect(analytics.track).toHaveBeenCalledWith('do', { category: 'cat' });
                  resolve();
                });
              });
            });
        }));

    it('should set user properties',
      injectAsync([TestComponentBuilder, Angulartics2, Angulartics2Segment],
        ((tcb: TestComponentBuilder, angulartics2: Angulartics2, angulartics2Segment: Angulartics2Segment) => {
          return compile(tcb)
            .then((rtc) => fixture = rtc)
            .then((_) => angulartics2.setUserProperties.next({ userId: '1', firstName: 'John', lastName: 'Doe' }))
            .then((_) => {
              fixture.detectChanges();
              return new Promise((resolve) => {
                setTimeout(() => {
                  expect(analytics.identify).toHaveBeenCalledWith('1', { userId: '1', firstName: 'John', lastName: 'Doe' });
                  resolve();
                });
              });
            });
        })));

    it('should set user properties once',
      injectAsync([TestComponentBuilder, Angulartics2, Angulartics2Segment],
        ((tcb: TestComponentBuilder, angulartics2: Angulartics2, angulartics2Segment: Angulartics2Segment) => {
          return compile(tcb)
            .then((rtc) => fixture = rtc)
            .then((_) => angulartics2.setUserPropertiesOnce.next({ userId: '1', firstName: 'John', lastName: 'Doe' }))
            .then((_) => {
              fixture.detectChanges();
              return new Promise((resolve) => {
                setTimeout(() => {
                  expect(analytics.identify).toHaveBeenCalledWith('1', { userId: '1', firstName: 'John', lastName: 'Doe' });
                  resolve();
                }, 100);
              });
            });
        })));

    it('should set alias',
      injectAsync([TestComponentBuilder, Angulartics2, Angulartics2Segment],
        (tcb: TestComponentBuilder, angulartics2: Angulartics2, angulartics2Segment: Angulartics2Segment) => {
          return compile(tcb)
            .then((rtc) => fixture = rtc)
            .then((_) => angulartics2.setAlias.next('testAlias'))
            .then((_) => {
              fixture.detectChanges();
              return new Promise((resolve) => {
                setTimeout(() => {
                  expect(analytics.alias).toHaveBeenCalledWith('testAlias');
                  resolve();
                });
              });
            });
        }));

  });
}
