import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { TestBed, ComponentFixture, fakeAsync, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { RoutesConfig, TestModule, RootCmp, advance, createRoot, createRootWithRouter } from '../test.mocks';
import { Angulartics2 } from 'angulartics2';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

describe('angulartics2', () => {
  let fixture: ComponentFixture<any>;

  it('is defined', () => {
    expect(Angulartics2).toBeDefined();
  });

  describe('initialize', function() {

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes(RoutesConfig),
          TestModule
        ],
        providers: [
          Angulartics2,
        ],
      });
    });

    it('should track pages by default',
      inject([Angulartics2],
        (angulartics2: Angulartics2) => {
          expect(angulartics2.settings.pageTracking.autoTrackVirtualPages).toBe(true);
    }));
  });

  describe('Configuration', function() {
    let EventSpy: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes(RoutesConfig),
          TestModule
        ],
        providers: [
          { provide: Location, useClass: SpyLocation },
          Angulartics2
        ]
      });

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
          angulartics2.excludeRoutes(['/abc/def', /\/[0-9]+/]);
          expect(angulartics2.settings.pageTracking.excludedRoutes).toEqual(['/abc/def', /\/[0-9]+/]);
    }));

    it('should configure cleaning of ids',
      inject([Angulartics2],
        (angulartics2: Angulartics2) => {
          angulartics2.clearIds(true);
          expect(angulartics2.settings.pageTracking.clearIds).toBe(true);
    }));

    it('should configure developer mode',
      fakeAsync(inject([Router, Location, Angulartics2],
         (router: Router, location: Location, angulartics2: Angulartics2) => {
          fixture = createRootWithRouter(router, RootCmp);
          // angulartics2.settings.developerMode = true;
          angulartics2.developerMode(true);
          angulartics2.pageTrack.subscribe((x) => EventSpy(x));
          (<SpyLocation>location).simulateUrlPop('/abc');
          advance(fixture);
          expect(EventSpy).not.toHaveBeenCalledWith({ path: '/abc', location: location });
        })));

  });

  describe('router support', function() {
    let EventSpy: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes(RoutesConfig),
          TestModule
        ],
        providers: [
          { provide: Location, useClass: SpyLocation },
          Angulartics2
        ]
      });

      EventSpy = jasmine.createSpy('EventSpy');
    });

    it('should track pages on route v3 change',
      fakeAsync(inject([Router, Location, Angulartics2],
        (router: Router, location: Location, angulartics2: Angulartics2) => {
          fixture = createRootWithRouter(router, RootCmp);
          angulartics2.pageTrack.subscribe((x) => EventSpy(x));
          router.navigateByUrl('/abc');
          advance(fixture);
          router.navigate(['def']);
          advance(fixture);
          expect(EventSpy).toHaveBeenCalledWith({ path: '/abc', location: location });
          expect(EventSpy).toHaveBeenCalledWith({ path: '/def', location: location });
        })));

    it('should track initial page',
      fakeAsync(inject([Router, Location, Angulartics2],
        (router: Router, location: Location, angulartics2: Angulartics2) => {
          angulartics2.pageTrack.subscribe((x) => EventSpy(x));
          fixture = createRootWithRouter(router, RootCmp);
          advance(fixture);
          expect(EventSpy).toHaveBeenCalledWith({ path: '/', location: location });
        })));
  });

  describe('excludedRoutes', function() {
    let EventSpy: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes(RoutesConfig),
          TestModule
        ],
        providers: [
          { provide: Location, useClass: SpyLocation },
          Angulartics2
        ]
      });

      EventSpy = jasmine.createSpy('EventSpy');
    });

    it('should have empty excludedRoutes by default',
      inject([Angulartics2], (angulartics2: Angulartics2) => {
        expect(angulartics2.settings.pageTracking.excludedRoutes.length).toBe(0);
      }));

    it('should trigger page track if excludeRoutes is empty',
      fakeAsync(inject([Router, Location, Angulartics2],
         (router: Router, location: Location, angulartics2: Angulartics2) => {
          fixture = createRootWithRouter(router, RootCmp);
          angulartics2.pageTrack.subscribe((x) => EventSpy(x));
          angulartics2.settings.pageTracking.excludedRoutes = [];
          (<SpyLocation>location).simulateUrlPop('/abc');
          advance(fixture);
          expect(EventSpy).toHaveBeenCalledWith({ path: '/abc', location: location });
        })));

    it('should trigger page track if excludeRoutes do not match current route',
      fakeAsync(inject([Router, Location, Angulartics2],
         (router: Router, location: Location, angulartics2: Angulartics2) => {
          fixture = createRootWithRouter(router, RootCmp);
          angulartics2.pageTrack.subscribe((x) => EventSpy(x));
          angulartics2.settings.pageTracking.excludedRoutes = ['/def'];
          (<SpyLocation>location).simulateUrlPop('/abc');
          advance(fixture);
          expect(EventSpy).toHaveBeenCalledWith({ path: '/abc', location: location });
        })));

    it('should not trigger page track if current route is excluded',
      fakeAsync(inject([Router, Location, Angulartics2],
         (router: Router, location: Location, angulartics2: Angulartics2) => {
          fixture = createRootWithRouter(router, RootCmp);
          angulartics2.pageTrack.subscribe((x) => EventSpy(x));
          angulartics2.settings.pageTracking.excludedRoutes = ['/abc'];
          (<SpyLocation>location).simulateUrlPop('/abc');
          advance(fixture);
          expect(EventSpy).not.toHaveBeenCalledWith({ path: '/abc', location: location });
        })));

    it('should not allow for multiple route exclusions to be specified',
      fakeAsync(inject([Router, Location, Angulartics2],
         (router: Router, location: Location, angulartics2: Angulartics2) => {
          fixture = createRootWithRouter(router, RootCmp);
          angulartics2.pageTrack.subscribe((x) => EventSpy(x));
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
      fakeAsync(inject([Router, Location, Angulartics2],
         (router: Router, location: Location, angulartics2: Angulartics2) => {
          fixture = createRootWithRouter(router, RootCmp);
          angulartics2.pageTrack.subscribe((x) => EventSpy(x));
          angulartics2.settings.pageTracking.excludedRoutes = [/\/sections\/\d+\/pages\/\d+/];
          (<SpyLocation>location).simulateUrlPop('/sections/123/pages/456');
          advance(fixture);
          expect(EventSpy).not.toHaveBeenCalledWith({ path: '/sections/123/pages/456', location: location });
        })));

  });

  describe('clearIds', function() {
    let EventSpy: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes(RoutesConfig),
          TestModule
        ],
        providers: [
          { provide: Location, useClass: SpyLocation },
          Angulartics2
        ]
      });

      EventSpy = jasmine.createSpy('EventSpy');
    });

    it('should not clear ids by default',
      inject([Angulartics2],
        (angulartics2: Angulartics2) => {
          expect(angulartics2.settings.pageTracking.clearIds).toBe(false);
      }));

    it('should not change url if clearIds is false',
      fakeAsync(inject([Router, Location, Angulartics2],
         (router: Router, location: Location, angulartics2: Angulartics2) => {
          fixture = createRootWithRouter(router, RootCmp);
          angulartics2.pageTrack.subscribe((x) => EventSpy(x));
          angulartics2.settings.pageTracking.clearIds = false;
          (<SpyLocation>location).simulateUrlPop('/sections/123/pages/456');
          advance(fixture);
          expect(EventSpy).toHaveBeenCalledWith({ path: '/sections/123/pages/456', location: location });
      })));

    it('should remove ids from url if clearIds is true',
      fakeAsync(inject([Router, Location, Angulartics2],
        (router: Router, location: Location, angulartics2: Angulartics2) => {
        fixture = createRootWithRouter(router, RootCmp);
        angulartics2.pageTrack.subscribe((x) => EventSpy(x));
        angulartics2.settings.pageTracking.clearIds = true;
        (<SpyLocation>location).simulateUrlPop('/sections/123/pages/456');
        advance(fixture);
        expect(EventSpy).toHaveBeenCalledWith({ path: '/sections/pages', location: location });
      })));
  });

  describe('EventEmiters', function() {
    let EventSpy: any;

    const EventEmiters = [
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

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes(RoutesConfig),
          TestModule
        ],
        providers: [
          { provide: Location, useClass: SpyLocation },
          Angulartics2
        ]
      });

      EventSpy = jasmine.createSpy('EventSpy');
    });

    it('should replay all events',
      fakeAsync(inject([Router, Location, Angulartics2],
        (router: Router, location: Location, angulartics2: Angulartics2) => {
          fixture = createRootWithRouter(router, RootCmp);

          (<SpyLocation>location).simulateUrlPop('/abc');
          advance(fixture);
          (<SpyLocation>location).simulateUrlPop('/def');
          advance(fixture);
          (<SpyLocation>location).simulateUrlPop('/ghi');
          advance(fixture);

          angulartics2.pageTrack.subscribe((x) => EventSpy(x));

          expect(EventSpy).toHaveBeenCalledWith({ path: '/abc', location: location });
          expect(EventSpy).toHaveBeenCalledWith({ path: '/def', location: location });
          expect(EventSpy).toHaveBeenCalledWith({ path: '/ghi', location: location });
        })));

    it('should subscribe to and emit from ' + event,
      fakeAsync(inject([Angulartics2],
        (angulartics2: Angulartics2) => {
          fixture = createRoot(RootCmp);
          for (const event of EventEmiters) {
            (<any>angulartics2)[event].subscribe((x: any) => EventSpy(x));
            (<any>angulartics2)[event].next(`test: ${event}`);
            advance(fixture);
            expect(EventSpy).toHaveBeenCalledWith(`test: ${event}`);
          }
        })));

  });

});
