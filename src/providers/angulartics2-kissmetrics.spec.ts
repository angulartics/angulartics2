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
import {Angulartics2Kissmetrics} from './angulartics2-kissmetrics';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

export function main() {
  describe('Angulartics2Kissmetrics', () => {
    var _kmq: Array<any>;
    var fixture: ComponentFixture;

    beforeEachProviders(() => [
      TEST_ROUTER_PROVIDERS,
      Angulartics2,
      Angulartics2Kissmetrics
    ]);

    beforeEach(function() {
      window._kmq = _kmq = [];
    });

    it('should track initial page',
      inject([TestComponentBuilder, Router, Angulartics2, Angulartics2Kissmetrics],
        (tcb: TestComponentBuilder, router: Router, angulartics2: Angulartics2, angulartics2Kissmetrics: Angulartics2Kissmetrics) => {
          compile(tcb)
            .then((rtc) => fixture = rtc)
            .then((_) => router.config([new Route({ path: '/', component: HelloCmp })]))
            .then((_) => {
              fixture.detectChanges();
              return new Promise((resolve) => {
                setTimeout(() => {
                  expect(_kmq).toContain(['record', 'Pageview', { 'Page': '' }]);
                  resolve();
                });
              });
            });
        }));

    it('should track pages',
      inject([TestComponentBuilder, Router, Angulartics2, Angulartics2Kissmetrics],
        (tcb: TestComponentBuilder, router: Router, angulartics2: Angulartics2, angulartics2Kissmetrics: Angulartics2Kissmetrics) => {
          compile(tcb)
            .then((rtc) => fixture = rtc)
            .then((_) => router.config([new Route({ path: '/abc', component: HelloCmp })]))
            .then((_) => router.navigateByUrl('/abc'))
            .then((_) => {
              fixture.detectChanges();
              return new Promise((resolve) => {
                setTimeout(() => {
                  expect(_kmq).toContain(['record', 'Pageview', { 'Page': '/abc' }]);
                  resolve();
                });
              });
            });
        }));

    it('should track events',
      inject([TestComponentBuilder, Angulartics2, Angulartics2Kissmetrics],
        (tcb: TestComponentBuilder, angulartics2: Angulartics2, angulartics2Kissmetrics: Angulartics2Kissmetrics) => {
          compile(tcb)
            .then((rtc) => fixture = rtc)
            .then((_) => angulartics2.eventTrack.next({ action: 'do', properties: { category: 'cat' } }))
            .then((_) => {
              fixture.detectChanges();
              return new Promise((resolve) => {
                // setTimeout(() => {
                  expect(_kmq).toContain(['record', 'do', { category: 'cat' }]);
                  resolve();
                // });
              });
            });
        }));

    it('should set username',
      inject([TestComponentBuilder, Angulartics2, Angulartics2Kissmetrics],
        ((tcb: TestComponentBuilder, angulartics2: Angulartics2, angulartics2Kissmetrics: Angulartics2Kissmetrics) => {
          compile(tcb)
            .then((rtc) => fixture = rtc)
            .then((_) => angulartics2.setUsername.next('testUser'))
            .then((_) => {
              fixture.detectChanges();
              return new Promise((resolve) => {
                // setTimeout(() => {
                  expect(_kmq).toContain(['identify', 'testUser']);
                  resolve();
                // });
              });
            });
        })));

    it('should set user properties',
      inject([TestComponentBuilder, Angulartics2, Angulartics2Kissmetrics],
        ((tcb: TestComponentBuilder, angulartics2: Angulartics2, angulartics2Kissmetrics: Angulartics2Kissmetrics) => {
          compile(tcb)
            .then((rtc) => fixture = rtc)
            .then((_) => angulartics2.setUserProperties.next({ userId: '1', firstName: 'John', lastName: 'Doe' }))
            .then((_) => {
              fixture.detectChanges();
              return new Promise((resolve) => {
                setTimeout(() => {
                  expect(_kmq).toContain(['set', { userId: '1', firstName: 'John', lastName: 'Doe' }]);
                  resolve();
                });
              });
            });
        })));

  });
}
