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

import {Angulartics2} from '../index';
import {Angulartics2GoogleAnalytics} from './angulartics2-google-analytics';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

export function main() {
	describe('Angulartics2GoogleAnalytics', () => {

		var fixture: ComponentFixture;
		let win: any = window;

		beforeEachProviders(() => [
			ROUTER_PROVIDERS,
			provide(Location, { useClass: SpyLocation }),
			provide(ROUTER_PRIMARY_COMPONENT, { useClass: MockPrimaryComponent }),
			Angulartics2,
			Angulartics2GoogleAnalytics,
			provide(ApplicationRef, { useClass: MockApplicationRef })
		]);

		beforeEach(function() {
			win.ga = jasmine.createSpy('ga');
			win._gaq = [];
		});

		it('should track initial page',
			injectAsync([TestComponentBuilder, Router, Angulartics2, Angulartics2GoogleAnalytics],
				(tcb: TestComponentBuilder, router: Router, angulartics2: Angulartics2, angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) => {
					return compile(tcb)
						.then((rtc) => fixture = rtc)
						.then((_) => {
							fixture.detectChanges();
							setTimeout(() => {
								expect(win._gaq).toContain(['_trackPageview', '']);
								expect(win.ga).toHaveBeenCalledWith('send', 'pageview', '');
							}, 20);
						});
				}));

		it('should track pages',
			injectAsync([TestComponentBuilder, Router, Angulartics2, Angulartics2GoogleAnalytics],
				(tcb: TestComponentBuilder, router: Router, angulartics2: Angulartics2, angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) => {
					return compile(tcb)
						.then((rtc) => fixture = rtc)
						.then((_) => router.config([new Route({ path: '/abc', component: HelloCmp })]))
						.then((_) => router.navigateByUrl('/abc'))
						.then((_) => {
							fixture.detectChanges();
							setTimeout(() => {
								expect(win._gaq).toContain(['_trackPageview', '/abc']);
								expect(win.ga).toHaveBeenCalledWith('send', 'pageview', '/abc');
							}, 20);
						});
				}));

		it('should track events',
			injectAsync([TestComponentBuilder, Angulartics2, Angulartics2GoogleAnalytics],
				(tcb: TestComponentBuilder, angulartics2: Angulartics2, angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) => {
					return compile(tcb)
						.then((rtc) => fixture = rtc)
						.then((_) => angulartics2.eventTrack.next({ action: 'do', properties: { category: 'cat' } }))
						.then((_) => {
							fixture.detectChanges();
							setTimeout(() => {
								expect(win.ga).toHaveBeenCalledWith('send', 'event', { eventCategory: 'cat', eventAction: 'do', eventLabel: undefined, eventValue: undefined, nonInteraction: undefined, page: '/context.html', userId: null });
							});
						});
				}));

		it('should track exceptions',
			injectAsync([TestComponentBuilder, Angulartics2, Angulartics2GoogleAnalytics],
				((tcb: TestComponentBuilder, angulartics2: Angulartics2, angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) => {
					return compile(tcb)
						.then((rtc) => fixture = rtc)
						.then((_) => angulartics2.exceptionTrack.next({ appId: 'app', appName: 'Test App', appVersion: '0.1' }))
						.then((_) => {
							fixture.detectChanges();
							setTimeout(() => {
								expect(win.ga).toHaveBeenCalledWith('send', 'exception', { appId: 'app', appName: 'Test App', appVersion: '0.1', exFatal: true, exDescription: undefined });
							});
						});
				})));

		it('should set username',
			injectAsync([TestComponentBuilder, Angulartics2, Angulartics2GoogleAnalytics],
				(tcb: TestComponentBuilder, angulartics2: Angulartics2, angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) => {
					return compile(tcb)
						.then((rtc) => fixture = rtc)
						.then((_) => angulartics2.setUsername.next('testuser'))
						.then((_) => {
							fixture.detectChanges();
							setTimeout(() => {
								expect(angulartics2.settings.ga.userId).toBe('testuser');
							});
						});
				}));

		it('should set user porperties',
			injectAsync([TestComponentBuilder, Angulartics2, Angulartics2GoogleAnalytics],
				(tcb: TestComponentBuilder, angulartics2: Angulartics2, angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) => {
					return compile(tcb)
						.then((rtc) => fixture = rtc)
						.then((_) => angulartics2.setUserProperties.next({ dimension1: 'test' }))
						.then((_) => {
							fixture.detectChanges();
							setTimeout(() => {
								expect(win.ga).toHaveBeenCalledWith('set', 'dimension1', 'test');
							});
						})
						.then((_) => angulartics2.setUserProperties.next({ metric1: 'test' }))
						.then((_) => {
							fixture.detectChanges();
							setTimeout(() => {
								expect(win.ga).toHaveBeenCalledWith('set', 'metric1', 'test');
							});
						});
				}));

		it('should track user timings',
			injectAsync([TestComponentBuilder, Angulartics2, Angulartics2GoogleAnalytics],
				(tcb: TestComponentBuilder, angulartics2: Angulartics2, angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) => {
					return compile(tcb)
						.then((rtc) => fixture = rtc)
						.then((_) => angulartics2.userTimings.next({ timingCategory: 'cat', timingVar: 'var', timingValue: 100 }))
						.then((_) => {
							fixture.detectChanges();
							setTimeout(() => {
								expect(win.ga).toHaveBeenCalledWith('send', 'timing', { timingCategory: 'cat', timingVar: 'var', timingValue: 100 });
							});
						});
				}));

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

	function compile(tcb: TestComponentBuilder) {
		return tcb.createAsync(RootCmp);
	}
}
