import {Location} from '@angular/common';
import {SpyLocation} from '@angular/common/testing';
import {
  async,
  it,
  iit,
  inject,
  ddescribe,
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

import {TEST_ROUTER_PROVIDERS, RootCmp, advance, compile} from '../test.mocks';
import {Angulartics2} from './angulartics2';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

export function main() {
  describe('angulartics2', () => {

    var fixture: ComponentFixture<any>;

    it('is defined', () => {
      expect(Angulartics2).toBeDefined();
    });

    describe('initialize', function() {

      beforeEachProviders(() => [
        TEST_ROUTER_PROVIDERS,
        Angulartics2
      ]);

      it('should track pages by default',
        inject([Angulartics2],
          (angulartics2: Angulartics2) => {
            expect(angulartics2.settings.pageTracking.autoTrackVirtualPages).toBe(true);
      }));
    });

    describe('Configuration', function() {
      var EventSpy: any;

      beforeEachProviders(() => [
        TEST_ROUTER_PROVIDERS,
        Angulartics2
      ]);

      beforeEach(function() {
        EventSpy = jasmine.createSpy('EventSpy');
      });

      it('should configure virtualPageviews',
        inject([Angulartics2],
          (angulartics2: Angulartics2) => {
            angulartics2.virtualPageviews(false);
            expect(angulartics2.settings.pageTracking.autoTrackVirtualPages).toBe(false);
      }));

      it('should configure excluded routes',
        inject([Angulartics2],
          (angulartics2: Angulartics2) => {
            angulartics2.excludeRoutes(['/abc/def']);
            expect(angulartics2.settings.pageTracking.excludedRoutes).toEqual(['/abc/def']);
      }));

      it('should configure developer mode',
        fakeAsync(inject([TestComponentBuilder, Location, Angulartics2],
          (tcb: TestComponentBuilder, location: Location, angulartics2: Angulartics2) => {
            fixture = tcb.createFakeAsync(RootCmp);
            angulartics2.developerMode(true);
            angulartics2.pageTrack.subscribe((x: any) => EventSpy(x));
            (<SpyLocation>location).simulateUrlPop('/abc');
            advance(fixture);
            expect(EventSpy).not.toHaveBeenCalled();
          })));

    });

    describe('router support', function() {
      var EventSpy: any;

      beforeEachProviders(() => [
        TEST_ROUTER_PROVIDERS,
        Angulartics2
      ]);

      beforeEach(function() {
        EventSpy = jasmine.createSpy('EventSpy');
      });

      it('should track pages on route change',
        fakeAsync(inject([TestComponentBuilder, Location, Angulartics2],
          (tcb: TestComponentBuilder, location: Location, angulartics2: Angulartics2) => {
            fixture = tcb.createFakeAsync(RootCmp);
            angulartics2.pageTrack.subscribe((x: any) => EventSpy(x));
            (<SpyLocation>location).simulateUrlPop('/abc');
            advance(fixture);
            expect(EventSpy).toHaveBeenCalledWith({ path: '/abc', location: location });
          })));
    });

    describe('excludedRoutes', function() {
      var EventSpy: any;

      beforeEachProviders(() => [
        TEST_ROUTER_PROVIDERS,
        Angulartics2
      ]);

      beforeEach(function() {
        EventSpy = jasmine.createSpy('EventSpy');
      });

      it('should have empty excludedRoutes by default',
        inject([Angulartics2], (angulartics2: Angulartics2) => {
          expect(angulartics2.settings.pageTracking.excludedRoutes.length).toBe(0);
        }));

      it('should trigger page track if excludeRoutes is empty',
        fakeAsync(inject([TestComponentBuilder, Location, Angulartics2],
          (tcb: TestComponentBuilder, location: Location, angulartics2: Angulartics2) => {
            fixture = tcb.createFakeAsync(RootCmp);
            angulartics2.pageTrack.subscribe((x: any) => EventSpy(x));
            angulartics2.settings.pageTracking.excludedRoutes = [];
            (<SpyLocation>location).simulateUrlPop('/abc');
            advance(fixture);
            expect(EventSpy).toHaveBeenCalledWith({ path: '/abc', location: location });
          })));

      it('should trigger page track if excludeRoutes do not match current route',
        fakeAsync(inject([TestComponentBuilder, Location, Angulartics2],
          (tcb: TestComponentBuilder, location: Location, angulartics2: Angulartics2) => {
            fixture = tcb.createFakeAsync(RootCmp);
            angulartics2.pageTrack.subscribe((x: any) => EventSpy(x));
            angulartics2.settings.pageTracking.excludedRoutes = ['/def'];
            (<SpyLocation>location).simulateUrlPop('/abc');
            advance(fixture);
            expect(EventSpy).toHaveBeenCalledWith({ path: '/abc', location: location });
          })));

      it('should not trigger page track if current route is excluded',
        fakeAsync(inject([TestComponentBuilder, Location, Angulartics2],
          (tcb: TestComponentBuilder, location: Location, angulartics2: Angulartics2) => {
            fixture = tcb.createFakeAsync(RootCmp);
            angulartics2.pageTrack.subscribe((x: any) => EventSpy(x));
            angulartics2.settings.pageTracking.excludedRoutes = ['/abc'];
            (<SpyLocation>location).simulateUrlPop('/abc');
            advance(fixture);
            expect(EventSpy).not.toHaveBeenCalledWith({ path: '/abc', location: location });
          })));

      it('should not allow for multiple route exclusions to be specified',
        fakeAsync(inject([TestComponentBuilder, Location, Angulartics2],
          (tcb: TestComponentBuilder, location: Location, angulartics2: Angulartics2) => {
            fixture = tcb.createFakeAsync(RootCmp);
            angulartics2.pageTrack.subscribe((x: any) => EventSpy(x));
            // Ignore excluded route
            angulartics2.settings.pageTracking.excludedRoutes = ['/def', '/abc'];
            (<SpyLocation>location).simulateUrlPop('/abc');
            advance(fixture);
            expect(EventSpy).not.toHaveBeenCalledWith({ path: '/abc', location: location });
            (<SpyLocation>location).simulateUrlPop('/def');
            advance(fixture);
            expect(EventSpy).not.toHaveBeenCalledWith({ path: '/def', location: location });
            (<SpyLocation>location).simulateUrlPop('/ghi');
            advance(fixture);
            expect(EventSpy).toHaveBeenCalledWith({ path: '/ghi', location: location });
          })));

      it('should allow specifying excluded routes as regular expressions',
        fakeAsync(inject([TestComponentBuilder, Location, Angulartics2],
          (tcb: TestComponentBuilder, location: Location, angulartics2: Angulartics2) => {
            fixture = tcb.createFakeAsync(RootCmp);
            angulartics2.pageTrack.subscribe((x: any) => EventSpy(x));
            angulartics2.settings.pageTracking.excludedRoutes = [/\/sections\/\d+\/pages\/\d+/];
            (<SpyLocation>location).simulateUrlPop('/sections/123/pages/456');
            advance(fixture);
            expect(EventSpy).not.toHaveBeenCalledWith({ path: '/sections/123/pages/456', location: location });
          })));

    });

    describe('EventEmiters', function() {
      var EventSpy: any;

      var EventEmiters: Array<string> = [
        'pageTrack',
        'eventTrack',
        'exceptionTrack',
        'setUsername',
        'setUserProperties',
        'setUserPropertiesOnce',
        'setSuperProperties',
        'setSuperPropertiesOnce',
        'userTimings'
      ];

      beforeEachProviders(() => [
        TEST_ROUTER_PROVIDERS,
        Angulartics2
      ]);

      beforeEach(function() {
        EventSpy = jasmine.createSpy('EventSpy');
      });

      it('should subscribe to and emit from ' + event,
        fakeAsync(inject([TestComponentBuilder, Angulartics2],
          (tcb: TestComponentBuilder, angulartics2: Angulartics2) => {
            fixture = tcb.createFakeAsync(RootCmp);
            for (var event of EventEmiters) {
              (<any>angulartics2)[event].subscribe((x: any) => EventSpy(x));
              (<any>angulartics2)[event].next(`test: ${event}`);
              advance(fixture);
              expect(EventSpy).toHaveBeenCalledWith(`test: ${event}`);
            }
          })));

    });

  });
}
