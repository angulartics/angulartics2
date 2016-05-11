import {Location} from '@angular/common';
import {SpyLocation} from '@angular/common/testing';
import {
  async,
  it,
  xit,
  inject,
  describe,
  ddescribe,
  expect,
  beforeEach,
  beforeEachProviders,
  fakeAsync
} from '@angular/core/testing';
import {
  TestComponentBuilder,
  ComponentFixture
} from '@angular/compiler/testing';

import {TEST_ROUTER_PROVIDERS, RootCmp, compile, advance} from '../test.mocks';
import {Angulartics2} from '../core/angulartics2';
import {Angulartics2Kissmetrics} from './angulartics2-kissmetrics';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

export function main() {
  describe('Angulartics2Kissmetrics', () => {
    var _kmq: Array<any>;
    var fixture: ComponentFixture<any>;

    beforeEachProviders(() => [
      TEST_ROUTER_PROVIDERS,
      Angulartics2,
      Angulartics2Kissmetrics
    ]);

    beforeEach(function() {
      window._kmq = _kmq = [];
    });

    // tmp disabled since not relying on Router (which used to track on first init)     
    xit('should track initial page',
      fakeAsync(inject([TestComponentBuilder, Location, Angulartics2, Angulartics2Kissmetrics],
          (tcb: TestComponentBuilder, location: Location, angulartics2: Angulartics2, angulartics2Kissmetrics: Angulartics2Kissmetrics) => {
            fixture = tcb.createFakeAsync(RootCmp);
            advance(fixture);
            expect(_kmq).toContain(['record', 'Pageview', { 'Page': '' }]);
        })));

    it('should track pages',
      fakeAsync(inject([TestComponentBuilder, Location, Angulartics2, Angulartics2Kissmetrics],
          (tcb: TestComponentBuilder, location: Location, angulartics2: Angulartics2, angulartics2Kissmetrics: Angulartics2Kissmetrics) => {
            fixture = tcb.createFakeAsync(RootCmp);
            (<SpyLocation>location).simulateUrlPop('/abc');
            advance(fixture);
            expect(_kmq).toContain(['record', 'Pageview', { 'Page': '/abc' }]);
        })));

    it('should track events',
      fakeAsync(inject([TestComponentBuilder, Location, Angulartics2, Angulartics2Kissmetrics],
          (tcb: TestComponentBuilder, location: Location, angulartics2: Angulartics2, angulartics2Kissmetrics: Angulartics2Kissmetrics) => {
            fixture = tcb.createFakeAsync(RootCmp);
            angulartics2.eventTrack.next({ action: 'do', properties: { category: 'cat' } })
            advance(fixture);
            expect(_kmq).toContain(['record', 'do', { category: 'cat' }]);
        })));

    it('should set username',
      fakeAsync(inject([TestComponentBuilder, Location, Angulartics2, Angulartics2Kissmetrics],
          (tcb: TestComponentBuilder, location: Location, angulartics2: Angulartics2, angulartics2Kissmetrics: Angulartics2Kissmetrics) => {
            fixture = tcb.createFakeAsync(RootCmp);
            angulartics2.setUsername.next('testUser')
            advance(fixture);
            expect(_kmq).toContain(['identify', 'testUser']);
        })));

    it('should set user properties',
      fakeAsync(inject([TestComponentBuilder, Location, Angulartics2, Angulartics2Kissmetrics],
          (tcb: TestComponentBuilder, location: Location, angulartics2: Angulartics2, angulartics2Kissmetrics: Angulartics2Kissmetrics) => {
            fixture = tcb.createFakeAsync(RootCmp);
            angulartics2.setUserProperties.next({ userId: '1', firstName: 'John', lastName: 'Doe' });
            advance(fixture);
            expect(_kmq).toContain(['set', { userId: '1', firstName: 'John', lastName: 'Doe' }]);
        })));

  });
}
