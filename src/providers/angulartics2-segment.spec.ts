import {Location} from '@angular/common';
import {SpyLocation} from '@angular/common/testing';
import {
  async,
  it,
  xit,
  inject,
  describe,
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
import {Angulartics2Segment} from './angulartics2-segment';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

export function main() {
  describe('Angulartics2Segment', () => {

    var fixture: ComponentFixture<any>;
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
      };
    });

    xit('should track initial page',
      fakeAsync(inject([TestComponentBuilder, Location, Angulartics2, Angulartics2Segment],
          (tcb: TestComponentBuilder, location: Location, angulartics2: Angulartics2, angulartics2Segment: Angulartics2Segment) => {
            fixture = tcb.createFakeAsync(RootCmp);
            advance(fixture);
            expect(analytics.page).toHaveBeenCalledWith('');
        })));

    it('should track pages',
      fakeAsync(inject([TestComponentBuilder, Location, Angulartics2, Angulartics2Segment],
          (tcb: TestComponentBuilder, location: Location, angulartics2: Angulartics2, angulartics2Segment: Angulartics2Segment) => {
            fixture = tcb.createFakeAsync(RootCmp);
            (<SpyLocation>location).simulateUrlPop('/abc');
            advance(fixture);
            expect(analytics.page).toHaveBeenCalledWith('/abc');
        })));

    it('should track events',
      fakeAsync(inject([TestComponentBuilder, Location, Angulartics2, Angulartics2Segment],
          (tcb: TestComponentBuilder, location: Location, angulartics2: Angulartics2, angulartics2Segment: Angulartics2Segment) => {
            fixture = tcb.createFakeAsync(RootCmp);
            angulartics2.eventTrack.next({ action: 'do', properties: { category: 'cat' } })
            advance(fixture);
            expect(analytics.track).toHaveBeenCalledWith('do', { category: 'cat' });
        })));

    it('should set user properties',
      fakeAsync(inject([TestComponentBuilder, Location, Angulartics2, Angulartics2Segment],
          (tcb: TestComponentBuilder, location: Location, angulartics2: Angulartics2, angulartics2Segment: Angulartics2Segment) => {
            fixture = tcb.createFakeAsync(RootCmp);
            angulartics2.setUserProperties.next({ userId: '1', firstName: 'John', lastName: 'Doe' });
            advance(fixture);
            expect(analytics.identify).toHaveBeenCalledWith('1', { userId: '1', firstName: 'John', lastName: 'Doe' });
        })));

    it('should set user properties once',
      fakeAsync(inject([TestComponentBuilder, Location, Angulartics2, Angulartics2Segment],
          (tcb: TestComponentBuilder, location: Location, angulartics2: Angulartics2, angulartics2Segment: Angulartics2Segment) => {
            fixture = tcb.createFakeAsync(RootCmp);
            angulartics2.setUserPropertiesOnce.next({ userId: '1', firstName: 'John', lastName: 'Doe' });
            advance(fixture);
            expect(analytics.identify).toHaveBeenCalledWith('1', { userId: '1', firstName: 'John', lastName: 'Doe' });
        })));

    it('should set alias',
      fakeAsync(inject([TestComponentBuilder, Location, Angulartics2, Angulartics2Segment],
          (tcb: TestComponentBuilder, location: Location, angulartics2: Angulartics2, angulartics2Segment: Angulartics2Segment) => {
            fixture = tcb.createFakeAsync(RootCmp);
            angulartics2.setAlias.next('testAlias');
            advance(fixture);
            expect(analytics.alias).toHaveBeenCalledWith('testAlias');
        })));

  });
}
