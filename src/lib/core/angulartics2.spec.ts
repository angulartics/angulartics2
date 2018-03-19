import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import {
  fakeAsync,
  inject,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StateService } from '@uirouter/angular';

import {
  Angulartics2,
  ANGULARTICS2_TOKEN,
} from 'angulartics2';
import {
  advance,
  createRoot,
  createRootWithRouter,
  DummyProvider,
  RootCmp,
  RouterlessRootCmp,
  RoutesConfig,
  TestModule,
  UIRootCmp,
  UITestModule,
} from '../test.mocks';
import { UIRouterTracking } from '../uiroutermodule/uirouter';
import { RouterlessTracking } from './routerless';

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
          TestModule,
        ],
        providers: [Angulartics2],
      });
    });

    it('should track pages by default',
      inject([Angulartics2],
        (angulartics2: Angulartics2) => {
          expect(angulartics2.settings.pageTracking.autoTrackVirtualPages).toBe(true);
      }),
    );
  });

  describe('Configuration', function() {
    let EventSpy: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes(RoutesConfig),
          TestModule,
        ],
        providers: [
          { provide: Location, useClass: SpyLocation },
          Angulartics2,
        ]
      });

      EventSpy = jasmine.createSpy('EventSpy');
    });

    it('should configure virtualPageviews',
      inject([Angulartics2], (angulartics2: Angulartics2) => {
        angulartics2.virtualPageviews(false);
        expect(angulartics2.settings.pageTracking.autoTrackVirtualPages).toBe(false);
      }),
    );

    it('should configure excluded routes',
      inject([Angulartics2], (angulartics2: Angulartics2) => {
        angulartics2.excludeRoutes(['/abc/def', /\/[0-9]+/]);
        expect(angulartics2.settings.pageTracking.excludedRoutes).toEqual(['/abc/def', /\/[0-9]+/]);
      }),
    );

    it('should configure cleaning of ids',
      inject([Angulartics2], (angulartics2: Angulartics2) => {
        angulartics2.clearIds(true);
        expect(angulartics2.settings.pageTracking.clearIds).toBe(true);
      }),
    );

    it('should configure developer mode',
      fakeAsync(inject([Router, Location, Angulartics2],
        (router: Router, location: Location, angulartics2: Angulartics2) => {
          fixture = createRootWithRouter(router, RootCmp);
          angulartics2.settings.developerMode = true;
          angulartics2.pageTrack.subscribe((x) => EventSpy(x));
          (<SpyLocation>location).simulateUrlPop('/abc');
          advance(fixture);
          expect(EventSpy).not.toHaveBeenCalledWith({ path: '/abc' });
        }),
      ),
    );

  });

  describe('ui-router support', function() {
    let EventSpy: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [UITestModule],
        providers: [
          { provide: Location, useClass: SpyLocation },
          { provide: RouterlessTracking, useClass: UIRouterTracking },
          Angulartics2,
        ]
      });

      EventSpy = jasmine.createSpy('EventSpy');
    });

    it('should track pages on ui router',
      fakeAsync(inject([StateService, Angulartics2],
        (state: StateService, angulartics2: Angulartics2) => {
          fixture = TestBed.createComponent(UIRootCmp);
          advance(fixture);
          angulartics2.pageTrack.subscribe((x) => EventSpy(x));
          state.go('home');
          advance(fixture);
          state.go('def');
          advance(fixture);
          expect(EventSpy).toHaveBeenCalledWith({ path: '/home' });
          expect(EventSpy).toHaveBeenCalledWith({ path: '/' });
        }),
      ),
    );
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
          Angulartics2,
        ]
      });

      EventSpy = jasmine.createSpy('EventSpy');
    });

    it('should track pages on route change',
      fakeAsync(inject([Router, Angulartics2],
        (router: Router, angulartics2: Angulartics2) => {
          fixture = createRootWithRouter(router, RootCmp);
          angulartics2.pageTrack.subscribe((x) => EventSpy(x));
          router.navigateByUrl('/abc');
          advance(fixture);
          router.navigate(['def']);
          advance(fixture);
          expect(EventSpy).toHaveBeenCalledWith({ path: '/abc' });
          expect(EventSpy).toHaveBeenCalledWith({ path: '/def' });
        }),
      ),
    );

    it('should track initial page',
      fakeAsync(inject([Router, Angulartics2],
        (router: Router, angulartics2: Angulartics2) => {
          angulartics2.pageTrack.subscribe((x) => EventSpy(x));
          fixture = createRootWithRouter(router, RootCmp);
          advance(fixture);
          expect(EventSpy).toHaveBeenCalledWith({ path: '/' });
        }),
      ),
    );
  });

  describe('routerless tracking', function() {

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [RouterlessRootCmp],
        imports: [],
        providers: [
          { provide: Location, useClass: SpyLocation },
          { provide: RouterlessTracking, useClass: RouterlessTracking },
          { provide: ANGULARTICS2_TOKEN, useValue: { providers: [DummyProvider], settings: {} } },
          Angulartics2,
          DummyProvider,
        ],
      });
    });

    it('should track initial page',
      fakeAsync(inject([DummyProvider], (dummy: DummyProvider) => {
        fixture = TestBed.createComponent(RouterlessRootCmp);
        advance(fixture);
        expect(dummy.eventSpy).toHaveBeenCalledWith({ path: '/' });
      })),
    );
  });

  describe('excludedRoutes', function() {
    let EventSpy: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes(RoutesConfig),
          TestModule,
        ],
        providers: [
          { provide: Location, useClass: SpyLocation },
          Angulartics2,
        ],
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
          expect(EventSpy).toHaveBeenCalledWith({ path: '/abc' });
        })));

    it('should trigger page track if excludeRoutes do not match current route',
      fakeAsync(inject([Router, Location, Angulartics2],
         (router: Router, location: Location, angulartics2: Angulartics2) => {
          fixture = createRootWithRouter(router, RootCmp);
          angulartics2.pageTrack.subscribe((x) => EventSpy(x));
          angulartics2.settings.pageTracking.excludedRoutes = ['/def'];
          (<SpyLocation>location).simulateUrlPop('/abc');
          advance(fixture);
          expect(EventSpy).toHaveBeenCalledWith({ path: '/abc' });
        })));

    it('should not trigger page track if current route is excluded',
      fakeAsync(inject([Router, Location, Angulartics2],
         (router: Router, location: Location, angulartics2: Angulartics2) => {
          fixture = createRootWithRouter(router, RootCmp);
          angulartics2.pageTrack.subscribe((x) => EventSpy(x));
          angulartics2.settings.pageTracking.excludedRoutes = ['/abc'];
          (<SpyLocation>location).simulateUrlPop('/abc');
          advance(fixture);
          expect(EventSpy).not.toHaveBeenCalledWith({ path: '/abc' });
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
          expect(EventSpy).not.toHaveBeenCalledWith({ path: '/abc' });
          (<SpyLocation>location).simulateUrlPop('/def');
          advance(fixture);
          expect(EventSpy).not.toHaveBeenCalledWith({ path: '/def' });
          (<SpyLocation>location).simulateUrlPop('/ghi');
          advance(fixture);
          expect(EventSpy).toHaveBeenCalledWith({ path: '/ghi' });
        })));

    it('should allow specifying excluded routes as regular expressions',
      fakeAsync(inject([Router, Location, Angulartics2],
         (router: Router, location: Location, angulartics2: Angulartics2) => {
          fixture = createRootWithRouter(router, RootCmp);
          angulartics2.pageTrack.subscribe((x) => EventSpy(x));
          angulartics2.settings.pageTracking.excludedRoutes = [/\/sections\/\d+\/pages\/\d+/];
          (<SpyLocation>location).simulateUrlPop('/sections/123/pages/456');
          advance(fixture);
          expect(EventSpy).not.toHaveBeenCalledWith({ path: '/sections/123/pages/456' });
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
      inject([Angulartics2], (angulartics2: Angulartics2) => {
        expect(angulartics2.settings.pageTracking.clearIds).toBe(false);
      }),
    );

    it('should not change url if clearIds is false',
      fakeAsync(inject([Router, Location, Angulartics2],
         (router: Router, location: Location, angulartics2: Angulartics2) => {
          fixture = createRootWithRouter(router, RootCmp);
          angulartics2.pageTrack.subscribe((x) => EventSpy(x));
          angulartics2.settings.pageTracking.clearIds = false;
          (<SpyLocation>location).simulateUrlPop('/sections/01234567-9ABC-DEF0-1234-56789ABCDEF0/pages/456');
          advance(fixture);
          expect(EventSpy).toHaveBeenCalledWith({
            path: '/sections/01234567-9ABC-DEF0-1234-56789ABCDEF0/pages/456',
          });
      })));

    it('should remove ids and uuids from url if clearIds is true',
      fakeAsync(inject([Router, Location, Angulartics2],
      (router: Router, location: Location, angulartics2: Angulartics2) => {
        fixture = createRootWithRouter(router, RootCmp);
        angulartics2.pageTrack.subscribe((x: any) => EventSpy(x));
        angulartics2.settings.pageTracking.clearIds = true;
        (<SpyLocation>location).simulateUrlPop('/0sections0/01234567-9ABC-DEF0-1234-56789ABCDEF0/pages?param=456');
        advance(fixture);
        expect(EventSpy).toHaveBeenCalledWith({ path: '/0sections0/pages?param=456' });
      })),
    );

    it('should remove ids using custom regex if idsRegExp is set',
      fakeAsync(inject([Router, Location, Angulartics2],
      (router: Router, location: Location, angulartics2: Angulartics2) => {
        fixture = createRootWithRouter(router, RootCmp);
        angulartics2.pageTrack.subscribe((x: any) => EventSpy(x));
        angulartics2.settings.pageTracking.clearIds = true;
        angulartics2.settings.pageTracking.idsRegExp = /^[a-z]\d+$/;
        (<SpyLocation>location).simulateUrlPop('/0sections0/a01/pages/page/2/summary?param=456');
        advance(fixture);
        expect(EventSpy).toHaveBeenCalledWith({ path: '/0sections0/pages/page/2/summary?param=456' });
      })),
    );

    it('should remove query params if clearQueryParams is set',
      fakeAsync(inject([Router, Location, Angulartics2],
      (router: Router, location: Location, angulartics2: Angulartics2) => {
        fixture = createRootWithRouter(router, RootCmp);
        angulartics2.pageTrack.subscribe((x: any) => EventSpy(x));
        angulartics2.settings.pageTracking.clearQueryParams = true;
        (<SpyLocation>location).simulateUrlPop('/0sections0/a01/pages/page/2/summary?param=456');
        advance(fixture);
        expect(EventSpy).toHaveBeenCalledWith({ path: '/0sections0/a01/pages/page/2/summary' });
      })),
    );

    it('should remove hash if clearHash is set',
      fakeAsync(inject([Router, Location, Angulartics2],
      (router: Router, location: Location, angulartics2: Angulartics2) => {
        fixture = createRootWithRouter(router, RootCmp);
        angulartics2.pageTrack.subscribe((x: any) => EventSpy(x));
        angulartics2.settings.pageTracking.clearHash = true;
        (<SpyLocation>location).simulateUrlPop('/0sections0/a01/pages/page/2/summary#authCode=123');
        advance(fixture);
        expect(EventSpy).toHaveBeenCalledWith({ path: '/0sections0/a01/pages/page/2/summary' });
      })),
    );

    it('should remove ids and query params if clearQueryParams and clearIds are set',
      fakeAsync(inject([Router, Location, Angulartics2],
      (router: Router, location: Location, angulartics2: Angulartics2) => {
        fixture = createRootWithRouter(router, RootCmp);
        angulartics2.pageTrack.subscribe((x: any) => EventSpy(x));
        angulartics2.settings.pageTracking.clearQueryParams = true;
        angulartics2.settings.pageTracking.clearIds = true;
        (<SpyLocation>location).simulateUrlPop('/0sections0/01234567-9ABC-DEF0-1234-56789ABCDEF0/pages?param=456');
        advance(fixture);
        expect(EventSpy).toHaveBeenCalledWith({ path: '/0sections0/pages' });
      })),
    );
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

          expect(EventSpy).toHaveBeenCalledWith({ path: '/abc' });
          expect(EventSpy).toHaveBeenCalledWith({ path: '/def' });
          expect(EventSpy).toHaveBeenCalledWith({ path: '/ghi' });
        },
      )),
    );

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
        }),
      ),
    );

  });

});
