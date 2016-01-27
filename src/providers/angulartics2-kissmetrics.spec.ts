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
import {Angulartics2Kissmetrics} from './angulartics2-kissmetrics';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

export function main() {
	describe('Angulartics2Kissmetrics', () => {

		var fixture: ComponentFixture;
		let win: any = window;

		beforeEachProviders(() => [
				ROUTER_PROVIDERS,
				provide(Location, { useClass: SpyLocation }),
				provide(ROUTER_PRIMARY_COMPONENT, { useClass: MockPrimaryComponent }),
				Angulartics2,
				Angulartics2Kissmetrics,
				provide(ApplicationRef, { useClass: MockApplicationRef })
		]);

		beforeEach(function() {
			win._kmq = [];
		});

		it('should track initial page',
			injectAsync([TestComponentBuilder, Router, Angulartics2, Angulartics2Kissmetrics],
				(tcb: TestComponentBuilder, router: Router, angulartics2: Angulartics2, angulartics2Kissmetrics: Angulartics2Kissmetrics) => {
					return compile(tcb)
						.then((rtc) => fixture = rtc)
						.then((_) => {
							fixture.detectChanges();
							setTimeout(() => {
								expect(win._kmq).toContain(['record', 'Pageview', { 'Page': '' }]);
							}, 20);
						});
				}));

		it('should track pages',
			injectAsync([TestComponentBuilder, Router, Angulartics2, Angulartics2Kissmetrics],
				(tcb: TestComponentBuilder, router: Router, angulartics2: Angulartics2, angulartics2Kissmetrics: Angulartics2Kissmetrics) => {
					return compile(tcb)
						.then((rtc) => fixture = rtc)
						.then((_) => router.config([new Route({ path: '/abc', component: HelloCmp })]))
						.then((_) => router.navigateByUrl('/abc'))
						.then((_) => {
							fixture.detectChanges();
							setTimeout(() => {
								expect(win._kmq).toContain(['record', 'Pageview', { 'Page': '/abc' }]);
							}, 20);
						});
				}));

		it('should track events',
			injectAsync([TestComponentBuilder, Angulartics2, Angulartics2Kissmetrics],
				(tcb: TestComponentBuilder, angulartics2: Angulartics2, angulartics2Kissmetrics: Angulartics2Kissmetrics) => {
					return compile(tcb)
						.then((rtc) => fixture = rtc)
						.then((_) => angulartics2.eventTrack.next({ action: 'do', properties: { category: 'cat' } }))
						.then((_) => {
							fixture.detectChanges();
							setTimeout(() => {
								expect(win._kmq).toContain(['record', 'do', { category: 'cat' }]);
							}, 20);
						});
				}));

		it('should set username',
			injectAsync([TestComponentBuilder, Angulartics2, Angulartics2Kissmetrics],
				((tcb: TestComponentBuilder, angulartics2: Angulartics2, angulartics2Kissmetrics: Angulartics2Kissmetrics) => {
					return compile(tcb)
						.then((rtc) => fixture = rtc)
						.then((_) => angulartics2.setUsername.next('testUser'))
						.then((_) => {
							fixture.detectChanges();
							setTimeout(() => {
								expect(win._kmq).toContain(['identify', 'testUser']);
							}, 20);
						});
				})));

		it('should set user properties',
			injectAsync([TestComponentBuilder, Angulartics2, Angulartics2Kissmetrics],
				((tcb: TestComponentBuilder, angulartics2: Angulartics2, angulartics2Kissmetrics: Angulartics2Kissmetrics) => {
					return compile(tcb)
						.then((rtc) => fixture = rtc)
						.then((_) => angulartics2.setUserProperties.next({ userId: '1', firstName: 'John', lastName: 'Doe' }))
						.then((_) => {
							fixture.detectChanges();
							setTimeout(() => {
								expect(win._kmq).toContain(['set', { userId: '1', firstName: 'John', lastName: 'Doe' }]);
							}, 20);
						});
				})));

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
