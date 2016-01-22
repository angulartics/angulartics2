import {ApplicationRef, Component, provide} from 'angular2/core';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, ROUTER_PRIMARY_COMPONENT, Router, Route, Location} from 'angular2/router';
import {
	it,
	injectAsync,
	describe,
	beforeEachProviders,
	ComponentFixture,
	TestComponentBuilder,
	MockApplicationRef
} from 'angular2/testing';
import {SpyLocation} from 'angular2/router/testing';

import {Angulartics2} from './angulartics2';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

export function main() {
	describe('angulartics2', () => {

		var fixture: ComponentFixture;

		it('is defined', () => {
			expect(Angulartics2).toBeDefined();
		});

		describe('initialize', function() {

			beforeEachProviders(() => [
				ROUTER_PROVIDERS,
				provide(Location, { useClass: SpyLocation }),
				provide(ROUTER_PRIMARY_COMPONENT, { useClass: MockPrimaryComponent }),
				Angulartics2,
				provide(ApplicationRef, { useClass: MockApplicationRef })
			]);

			it('should track pages by default',
				injectAsync([TestComponentBuilder, Router, Angulartics2],
					(tcb: TestComponentBuilder, router: Router, angulartics2: Angulartics2) => {
						return compile(tcb)
							.then((rtc) => fixture = rtc)
							.then((_) => {
								fixture.detectChanges();
								expect(angulartics2.settings.pageTracking.autoTrackVirtualPages).toBe(true);
							});
					}));

		});

		describe('Configuration', function() {

			beforeEachProviders(() => [
				ROUTER_PROVIDERS,
				provide(Location, { useClass: SpyLocation }),
				provide(ROUTER_PRIMARY_COMPONENT, { useClass: MockPrimaryComponent }),
				Angulartics2,
				provide(ApplicationRef, { useClass: MockApplicationRef })
			]);

			it('should configure virtualPageviews',
				injectAsync([TestComponentBuilder, Router, Angulartics2],
					(tcb: TestComponentBuilder, router: Router, angulartics2: Angulartics2) => {
						return compile(tcb)
							.then((rtc) => fixture = rtc)
							.then((_) => angulartics2.virtualPageviews(false))
							.then((_) => {
								fixture.detectChanges();
								expect(angulartics2.settings.pageTracking.autoTrackVirtualPages).toBe(false);
							});
					}));

			it('should configure excluded routes',
				injectAsync([TestComponentBuilder, Router, Angulartics2],
					(tcb: TestComponentBuilder, router: Router, angulartics2: Angulartics2) => {
						return compile(tcb)
								.then((rtc) => fixture = rtc)
							.then((_) => router.config([new Route({ path: '/abc/def', component: HelloCmp })]))
							.then((_) => angulartics2.excludeRoutes(['/abc/def']))
							.then((_) => {
								fixture.detectChanges();
								expect(angulartics2.settings.pageTracking.excludedRoutes).toEqual(['/abc/def']);
							});
					}));

		});

		describe('router support', function() {
			var EventSpy: any;

			beforeEachProviders(() => [
				ROUTER_PROVIDERS,
				provide(Location, { useClass: SpyLocation }),
				provide(ROUTER_PRIMARY_COMPONENT, { useClass: MockPrimaryComponent }),
				Angulartics2,
				provide(ApplicationRef, { useClass: MockApplicationRef })
			]);

			beforeEach(function() {
				EventSpy = jasmine.createSpy('EventSpy');
			});

			it('should track pages on route change',
				injectAsync([TestComponentBuilder, Router, Location, Angulartics2],
					(tcb: TestComponentBuilder, router: Router, location: Location, angulartics2: Angulartics2) => {
						return compile(tcb)
							.then((rtc) => fixture = rtc)
							.then((_) => router.config([new Route({ path: '/abc', component: HelloCmp })]))
							.then((_) => angulartics2.pageTrack.subscribe((x: any) => EventSpy(x)))
							.then((_) => router.navigateByUrl('/abc'))
							.then((_) => {
								fixture.detectChanges();
								setTimeout(() => {
									expect(EventSpy).toHaveBeenCalledWith({ path: '/abc', location: location });
								}, 10);
							});
					}));
		});

		describe('excludedRoutes', function() {
			var EventSpy: any;

			beforeEachProviders(() => [
				ROUTER_PROVIDERS,
				provide(Location, { useClass: SpyLocation }),
				provide(ROUTER_PRIMARY_COMPONENT, { useClass: MockPrimaryComponent }),
				Angulartics2,
				provide(ApplicationRef, { useClass: MockApplicationRef })
			]);

			beforeEach(function() {
				EventSpy = jasmine.createSpy('EventSpy');
			});

			it('should have empty excludedRoutes by default',
				injectAsync([TestComponentBuilder, Router, Location, Angulartics2],
					(tcb: TestComponentBuilder, router: Router, location: Location, angulartics2: Angulartics2) => {
						return compile(tcb)
								.then((rtc) => fixture = rtc)
							.then((_) => {
								fixture.detectChanges();
								expect(angulartics2.settings.pageTracking.excludedRoutes.length).toBe(0);
							});
					}));

			it('should trigger page track if excludeRoutes is empty',
				injectAsync([TestComponentBuilder, Router, Location, Angulartics2],
					(tcb: TestComponentBuilder, router: Router, location: Location, angulartics2: Angulartics2) => {
						return compile(tcb)
							.then((rtc) => fixture = rtc)
							.then((_) => router.config([new Route({ path: '/abc', component: HelloCmp })]))
							.then((_) => angulartics2.pageTrack.subscribe((x: any) => EventSpy(x)))
							.then((_) => angulartics2.settings.pageTracking.excludedRoutes = [])
							.then((_) => router.navigateByUrl('/abc'))
							.then((_) => {
								fixture.detectChanges();
								setTimeout(() => {
									expect(EventSpy).toHaveBeenCalledWith({ path: '/abc', location: location });
								}, 10);
							});
					}));

			it('should trigger page track if excludeRoutes do not match current route',
				injectAsync([TestComponentBuilder, Router, Location, Angulartics2],
					(tcb: TestComponentBuilder, router: Router, location: Location, angulartics2: Angulartics2) => {
						return compile(tcb)
							.then((rtc) => fixture = rtc)
							.then((_) => router.config([new Route({ path: '/abc', component: HelloCmp })]))
							.then((_) => angulartics2.pageTrack.subscribe((x: any) => EventSpy(x)))
							.then((_) => angulartics2.settings.pageTracking.excludedRoutes = ['/def'])
							.then((_) => router.navigateByUrl('/abc'))
							.then((_) => {
								fixture.detectChanges();
								setTimeout(() => {
									expect(EventSpy).toHaveBeenCalledWith({ path: '/abc', location: location });
								}, 10);
							});
					}));

			it('should not trigger page track if current route is excluded',
				injectAsync([TestComponentBuilder, Router, Location, Angulartics2],
					(tcb: TestComponentBuilder, router: Router, location: Location, angulartics2: Angulartics2) => {
						return compile(tcb)
							.then((rtc) => fixture = rtc)
							.then((_) => router.config([new Route({ path: '/abc', component: HelloCmp })]))
							.then((_) => angulartics2.pageTrack.subscribe((x: any) => EventSpy(x)))
							.then((_) => angulartics2.settings.pageTracking.excludedRoutes = ['/abc'])
							.then((_) => router.navigateByUrl('/abc'))
							.then((_) => {
								fixture.detectChanges();
								setTimeout(() => {
									expect(EventSpy).not.toHaveBeenCalledWith({ path: '/abc', location: location });
								});
							});
					}));

			it('should not allow for multiple route exclusions to be specified',
				injectAsync([TestComponentBuilder, Router, Location, Angulartics2],
					(tcb: TestComponentBuilder, router: Router, location: Location, angulartics2: Angulartics2) => {
						return compile(tcb)
							.then((rtc) => fixture = rtc)
							.then((_) => router.config([
								new Route({ path: '/abc', component: HelloCmp }),
								new Route({ path: '/def', component: HelloCmp }),
								new Route({ path: '/ghi', component: HelloCmp })
							]))
							.then((_) => angulartics2.pageTrack.subscribe((x: any) => EventSpy(x)))
							.then((_) => angulartics2.settings.pageTracking.excludedRoutes = ['/def', '/abc'])
							.then((_) => {
								// Ignore excluded route
								router.navigateByUrl('/abc');
								fixture.detectChanges();
								setTimeout(() => {
									expect(EventSpy).not.toHaveBeenCalledWith({ path: '/abc', location: location });
								});
							})
							.then((_) => {
								// Ignore excluded route
								router.navigateByUrl('/def');
								fixture.detectChanges();
								setTimeout(() => {
									expect(EventSpy).not.toHaveBeenCalledWith({ path: '/def', location: location });
								});
							})
							.then((_) => {
								// Track non-excluded route
								router.navigateByUrl('/ghi');
								fixture.detectChanges();
								setTimeout(() => {
									expect(EventSpy).toHaveBeenCalledWith({ path: '/ghi', location: location });
								}, 40);
							});
					}));

		it('should allow specifying excluded routes as regular expressions',
			injectAsync([TestComponentBuilder, Router, Location, Angulartics2],
				(tcb: TestComponentBuilder, router: Router, location: Location, angulartics2: Angulartics2) => {
					return compile(tcb)
						.then((rtc) => fixture = rtc)
						.then((_) => router.config([new Route({ path: '/sections/123/pages/456', component: HelloCmp })]))
						.then((_) => angulartics2.pageTrack.subscribe((x: any) => EventSpy(x)))
						.then((_) => angulartics2.settings.pageTracking.excludedRoutes = [/\/sections\/\d+\/pages\/\d+/])
						.then((_) => router.navigateByUrl('/sections/123/pages/456'))
						.then((_) => {
							fixture.detectChanges();
							setTimeout(() => {
								expect(EventSpy).not.toHaveBeenCalledWith({ path: '/sections/123/pages/456', location: location });
							}, 10);
						});
				}));

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
				ROUTER_PROVIDERS,
				provide(Location, { useClass: SpyLocation }),
				provide(ROUTER_PRIMARY_COMPONENT, { useClass: MockPrimaryComponent }),
				Angulartics2,
				provide(ApplicationRef, { useClass: MockApplicationRef })
			]);

			beforeEach(function() {
				EventSpy = jasmine.createSpy('EventSpy');
			});

			for (var event of EventEmiters) {
				it('should subscribe to and emit from ' + event,
					injectAsync([TestComponentBuilder, Angulartics2],
						(tcb: TestComponentBuilder, angulartics2: Angulartics2) => {
							return compile(tcb)
								.then((rtc) => fixture = rtc)
								.then((_) => (<any>angulartics2)[event].subscribe((x: any) => EventSpy(x)))
								.then((_) => (<any>angulartics2)[event].next('test'))
								.then((_) => {
									fixture.detectChanges();
									setTimeout(() => {
										expect(EventSpy).toHaveBeenCalledWith('test');
									});
								});
						}));
			}

		});

	});

	class MockPrimaryComponent {
	}

	@Component({
		selector: 'root-comp',
		template: `<router-outlet></router-outlet>`,
		directives: [ROUTER_DIRECTIVES]
	})
	class RootCmp {
		name: string;
	}

	@Component({ selector: 'hello-cmp', template: `{{greeting}}` })
	class HelloCmp {
		greeting: string;
		constructor() { this.greeting = 'hello'; }
	}

	function compile(tcb: TestComponentBuilder,
		template: string = '<router-outlet></router-outlet>') {
		return tcb.overrideTemplate(RootCmp, ('<router-outlet></router-outlet>')).createAsync(RootCmp);
	}
}
