import {Router, Route} from 'angular2/router';
import {
  it,
  inject,
  describe,
  beforeEach,
  beforeEachProviders,
  ComponentFixture,
  TestComponentBuilder
} from 'angular2/testing';

import {TEST_ROUTER_PROVIDERS, HelloCmp, compile} from '../test.mocks';
import {Angulartics2} from '../core/angulartics2';
import {Angulartics2Facebook} from './angulartics2-facebook';

declare var window: any;
declare var jasmine: any;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

export function main() {


  describe('Angulartics2Facebook', () => {
    var fbq: Function;
    var fixture: ComponentFixture;

    beforeEachProviders(() => [
      TEST_ROUTER_PROVIDERS,
      Angulartics2,
      Angulartics2Facebook
    ]);

    beforeEach(function() {
      window.fbq = fbq = jasmine.createSpy('fbq');
    });

    it('should track initial page',
      inject([TestComponentBuilder, Router, Angulartics2, Angulartics2Facebook],
        (tcb: TestComponentBuilder, router: Router, angulartics2: Angulartics2, angulartics2Facebook: Angulartics2Facebook) => {
          compile(tcb)
            .then((rtc) => fixture = rtc)
            .then((_) => router.config([new Route({ path: '/', component: HelloCmp })]))
            .then((_) => {
              fixture.detectChanges();
              return new Promise((resolve) => {
                setTimeout(() => {
                  expect(fbq).toHaveBeenCalledWith('track', 'PageView');
                  resolve();
                });
              });
            });
        }));

    it('should track pages',
      inject([TestComponentBuilder, Router, Angulartics2, Angulartics2Facebook],
        (tcb: TestComponentBuilder, router: Router, angulartics2: Angulartics2, angulartics2Facebook: Angulartics2Facebook) => {
          compile(tcb)
            .then((rtc) => fixture = rtc)
            .then((_) => router.config([new Route({ path: '/abc', component: HelloCmp })]))
            .then((_) => router.navigateByUrl('/abc'))
            .then((_) => {
              fixture.detectChanges();
              return new Promise((resolve) => {
                setTimeout(() => {
                  expect(fbq).toHaveBeenCalledWith('track', 'PageView');
                  resolve();
                });
              });
            });
        }));

    it('should track events',
      inject([TestComponentBuilder, Angulartics2, Angulartics2Facebook],
        (tcb: TestComponentBuilder, angulartics2: Angulartics2, angulartics2Facebook: Angulartics2Facebook) => {
          compile(tcb)
            .then((rtc) => fixture = rtc)
            .then((_) => angulartics2.eventTrack.next({ action: 'Do', properties: { category: 'cat' } }))
            .then((_) => {
              fixture.detectChanges();
              return new Promise((resolve) => {
                expect(fbq).toHaveBeenCalledWith('track', 'Do', { category: 'cat' });
                resolve();
              });
            });
        }));

  });
}
