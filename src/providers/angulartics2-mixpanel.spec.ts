import {Component, provide} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router, Route} from 'angular2/router';
import {Location} from 'angular2/platform/common';
import {
  it,
  iit,
  inject,
  describe,
  ddescribe,
  beforeEachProviders,
  ComponentFixture,
  TestComponentBuilder
} from 'angular2/testing';

import {TEST_ROUTER_PROVIDERS, RootCmp, HelloCmp, compile} from '../test.mocks';
import {Angulartics2} from '../core/angulartics2';
import {Angulartics2Mixpanel} from './angulartics2-mixpanel';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

export function main() {
  describe('Angulartics2Mixpanel', () => {

    var fixture: ComponentFixture;
    var mixpanel: any;

    beforeEachProviders(() => [
      TEST_ROUTER_PROVIDERS,
      Angulartics2,
      Angulartics2Mixpanel
    ]);

    beforeEach(function() {
      window.mixpanel = mixpanel = {
        track: jasmine.createSpy('track'),
        identify: jasmine.createSpy('identify'),
        people: {
          set: jasmine.createSpy('people.set'),
          set_once: jasmine.createSpy('people.set_once')
        },
        register: jasmine.createSpy('register'),
        register_once: jasmine.createSpy('register_once'),
        alias: jasmine.createSpy('alias')
      }
    });

    it('should track initial page',
      inject([TestComponentBuilder, Router, Angulartics2, Angulartics2Mixpanel],
        (tcb: TestComponentBuilder, router: Router, angulartics2: Angulartics2, angulartics2Mixpanel: Angulartics2Mixpanel) => {
          compile(tcb)
            .then((rtc) => fixture = rtc)
            .then((_) => router.config([new Route({ path: '/', component: HelloCmp })]))
            .then((_) => {
              fixture.detectChanges();
              return new Promise((resolve) => {
                setTimeout(() => {
                  expect(mixpanel.track).toHaveBeenCalledWith("Page Viewed", { "page": '' });
                  resolve();
                });
              });
            });
        }));

    it('should track pages',
      inject([TestComponentBuilder, Router, Angulartics2, Angulartics2Mixpanel],
        (tcb: TestComponentBuilder, router: Router, angulartics2: Angulartics2, angulartics2Mixpanel: Angulartics2Mixpanel) => {
          compile(tcb)
            .then((rtc) => fixture = rtc)
            .then((_) => router.config([new Route({ path: '/abc', component: HelloCmp })]))
            .then((_) => router.navigateByUrl('/abc'))
            .then((_) => {
              fixture.detectChanges();
              return new Promise((resolve) => {
                setTimeout(() => {
                  expect(mixpanel.track).toHaveBeenCalledWith("Page Viewed", { "page": '/abc' });
                  resolve();
                });
              });
            });
        }));

    it('should track events',
      inject([TestComponentBuilder, Angulartics2, Angulartics2Mixpanel],
        (tcb: TestComponentBuilder, angulartics2: Angulartics2, angulartics2Mixpanel: Angulartics2Mixpanel) => {
          compile(tcb)
            .then((rtc) => fixture = rtc)
            .then((_) => angulartics2.eventTrack.next({ action: 'do', properties: { category: 'cat' } }))
            .then((_) => {
              fixture.detectChanges();
              return new Promise((resolve) => {
                // setTimeout(() => {
                  expect(mixpanel.track).toHaveBeenCalledWith('do', { category: 'cat' });
                  resolve();
                // });
              });
            });
        }));

    it('should set username',
      inject([TestComponentBuilder, Angulartics2, Angulartics2Mixpanel],
        ((tcb: TestComponentBuilder, angulartics2: Angulartics2, angulartics2Mixpanel: Angulartics2Mixpanel) => {
          compile(tcb)
            .then((rtc) => fixture = rtc)
            .then((_) => angulartics2.setUsername.next('testUser'))
            .then((_) => {
              fixture.detectChanges();
              return new Promise((resolve) => {
                // setTimeout(() => {
                  expect(mixpanel.identify).toHaveBeenCalledWith('testUser');
                  resolve();
                // });
              });
            });
        })));

    it('should set user properties',
      inject([TestComponentBuilder, Angulartics2, Angulartics2Mixpanel],
        ((tcb: TestComponentBuilder, angulartics2: Angulartics2, angulartics2Mixpanel: Angulartics2Mixpanel) => {
          compile(tcb)
            .then((rtc) => fixture = rtc)
            .then((_) => angulartics2.setUserProperties.next({ userId: '1', firstName: 'John', lastName: 'Doe' }))
            .then((_) => {
              fixture.detectChanges();
              return new Promise((resolve) => {
                // setTimeout(() => {
                  expect(mixpanel.people.set).toHaveBeenCalledWith({ userId: '1', firstName: 'John', lastName: 'Doe' });
                  resolve();
                // });
              });
            });
        })));

    it('should set user properties once',
      inject([TestComponentBuilder, Angulartics2, Angulartics2Mixpanel],
        ((tcb: TestComponentBuilder, angulartics2: Angulartics2, angulartics2Mixpanel: Angulartics2Mixpanel) => {
          compile(tcb)
            .then((rtc) => fixture = rtc)
            .then((_) => angulartics2.setUserPropertiesOnce.next({ userId: '1', firstName: 'John', lastName: 'Doe' }))
            .then((_) => {
              fixture.detectChanges();
              return new Promise((resolve) => {
                // setTimeout(() => {
                  expect(mixpanel.people.set_once).toHaveBeenCalledWith({ userId: '1', firstName: 'John', lastName: 'Doe' });
                  resolve();
                // });
              });
            });
        })));

    it('should set super properties',
      inject([TestComponentBuilder, Angulartics2, Angulartics2Mixpanel],
        ((tcb: TestComponentBuilder, angulartics2: Angulartics2, angulartics2Mixpanel: Angulartics2Mixpanel) => {
          compile(tcb)
            .then((rtc) => fixture = rtc)
            .then((_) => angulartics2.setSuperProperties.next({ userId: '1', firstName: 'John', lastName: 'Doe' }))
            .then((_) => {
              fixture.detectChanges();
              return new Promise((resolve) => {
                // setTimeout(() => {
                  expect(mixpanel.register).toHaveBeenCalledWith({ userId: '1', firstName: 'John', lastName: 'Doe' });
                  resolve();
                // });
              });
            });
        })));

    it('should set super properties once',
      inject([TestComponentBuilder, Angulartics2, Angulartics2Mixpanel],
        ((tcb: TestComponentBuilder, angulartics2: Angulartics2, angulartics2Mixpanel: Angulartics2Mixpanel) => {
          compile(tcb)
            .then((rtc) => fixture = rtc)
            .then((_) => angulartics2.setSuperPropertiesOnce.next({ userId: '1', firstName: 'John', lastName: 'Doe' }))
            .then((_) => {
              fixture.detectChanges();
              return new Promise((resolve) => {
                // setTimeout(() => {
                  expect(mixpanel.register_once).toHaveBeenCalledWith({ userId: '1', firstName: 'John', lastName: 'Doe' });
                  resolve();
                // });
              });
            });
        })));

    it('should set alias',
      inject([TestComponentBuilder, Angulartics2, Angulartics2Mixpanel],
        (tcb: TestComponentBuilder, angulartics2: Angulartics2, angulartics2Mixpanel: Angulartics2Mixpanel) => {
          compile(tcb)
            .then((rtc) => fixture = rtc)
            .then((_) => angulartics2.setAlias.next('testAlias'))
            .then((_) => {
              fixture.detectChanges();
              return new Promise((resolve) => {
                // setTimeout(() => {
                  expect(mixpanel.alias).toHaveBeenCalledWith('testAlias');
                  resolve();
                // });
              });
            });
        }));

  });
}
