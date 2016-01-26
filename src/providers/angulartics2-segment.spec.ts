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
import {Angulartics2Segment} from './angulartics2-segment';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

export function main() {
	describe('Angulartics2Segment', () => {

		var fixture: ComponentFixture;
		let win: any = window;

		beforeEachProviders(() => [
				ROUTER_PROVIDERS,
				provide(Location, { useClass: SpyLocation }),
				provide(ROUTER_PRIMARY_COMPONENT, { useClass: MockPrimaryComponent }),
				Angulartics2,
				Angulartics2Segment,
				provide(ApplicationRef, { useClass: MockApplicationRef })
		]);

		beforeEach(function() {
			win.analytics = {
				page: jasmine.createSpy('page'),
				track: jasmine.createSpy('track'),
				identify: jasmine.createSpy('identify'),
				alias: jasmine.createSpy('alias')
			}
		});

		it('should track initial page',
			injectAsync([TestComponentBuilder, Router, Angulartics2, Angulartics2Segment],
				(tcb: TestComponentBuilder, router: Router, angulartics2: Angulartics2, angulartics2Segment: Angulartics2Segment) => {
					return compile(tcb)
						.then((rtc) => fixture = rtc)
						.then((_) => {
							fixture.detectChanges();
							setTimeout(() => {
								expect(win.analytics.page).toHaveBeenCalledWith('');
							}, 20);
						});
				}));

		it('should track pages',
			injectAsync([TestComponentBuilder, Router, Angulartics2, Angulartics2Segment],
				(tcb: TestComponentBuilder, router: Router, angulartics2: Angulartics2, angulartics2Segment: Angulartics2Segment) => {
					return compile(tcb)
						.then((rtc) => fixture = rtc)
						.then((_) => router.config([new Route({ path: '/abc', component: HelloCmp })]))
						.then((_) => router.navigateByUrl('/abc'))
						.then((_) => {
							fixture.detectChanges();
							setTimeout(() => {
								expect(win.analytics.page).toHaveBeenCalledWith('/abc');
							}, 20);
						});
				}));

		it('should track events',
			injectAsync([TestComponentBuilder, Angulartics2, Angulartics2Segment],
				(tcb: TestComponentBuilder, angulartics2: Angulartics2, angulartics2Segment: Angulartics2Segment) => {
					return compile(tcb)
						.then((rtc) => fixture = rtc)
						.then((_) => angulartics2.eventTrack.next({ action: 'do', properties: { category: 'cat' } }))
						.then((_) => {
							fixture.detectChanges();
							setTimeout(() => {
									expect(win.analytics.track).toHaveBeenCalledWith('do', { category: 'cat' });
							}, 20);
						});
				}));

		it('should set user properties',
			injectAsync([TestComponentBuilder, Angulartics2, Angulartics2Segment],
				((tcb: TestComponentBuilder, angulartics2: Angulartics2, angulartics2Segment: Angulartics2Segment) => {
					return compile(tcb)
						.then((rtc) => fixture = rtc)
						.then((_) => angulartics2.setUserProperties.next({ userId: '1', firstName: 'John', lastName: 'Doe' }))
						.then((_) => {
							fixture.detectChanges();
							setTimeout(() => {
									expect(win.analytics.identify).toHaveBeenCalledWith('1', { userId: '1', firstName: 'John', lastName: 'Doe' });
							}, 20);
						});
				})));

		it('should set user properties once',
			injectAsync([TestComponentBuilder, Angulartics2, Angulartics2Segment],
				((tcb: TestComponentBuilder, angulartics2: Angulartics2, angulartics2Segment: Angulartics2Segment) => {
					return compile(tcb)
						.then((rtc) => fixture = rtc)
						.then((_) => angulartics2.setUserPropertiesOnce.next({ userId: '1', firstName: 'John', lastName: 'Doe' }))
						.then((_) => {
							fixture.detectChanges();
							setTimeout(() => {
								expect(win.analytics.identify).toHaveBeenCalledWith('1', { userId: '1', firstName: 'John', lastName: 'Doe' });
							}, 20);
						});
				})));

		it('should set alias',
			injectAsync([TestComponentBuilder, Angulartics2, Angulartics2Segment],
				(tcb: TestComponentBuilder, angulartics2: Angulartics2, angulartics2Segment: Angulartics2Segment) => {
					return compile(tcb)
						.then((rtc) => fixture = rtc)
						.then((_) => angulartics2.setAlias.next('testAlias'))
						.then((_) => {
							fixture.detectChanges();
							setTimeout(() => {
								expect(win.analytics.alias).toHaveBeenCalledWith('testAlias');
							}, 20);
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
