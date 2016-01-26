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
import {Angulartics2Mixpanel} from './angulartics2-mixpanel';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

export function main() {
	describe('Angulartics2Mixpanel', () => {

		var fixture: ComponentFixture;
		let win: any = window;

		beforeEachProviders(() => [
				ROUTER_PROVIDERS,
				provide(Location, { useClass: SpyLocation }),
				provide(ROUTER_PRIMARY_COMPONENT, { useClass: MockPrimaryComponent }),
				Angulartics2,
				Angulartics2Mixpanel,
				provide(ApplicationRef, { useClass: MockApplicationRef })
		]);

		beforeEach(function() {
			win.mixpanel = {
				track: jasmine.createSpy('track'),
				identify: jasmine.createSpy('identify'),
				people: {
					set: jasmine.createSpy('people.set'),
					set_once: jasmine.createSpy('people.set_once')
				},
				register: jasmine.createSpy('register'),
				register_once: jasmine.createSpy('register_once'),
				alias: jasmine.createSpy('alias')
			}
		});

		it('should track initial page',
			injectAsync([TestComponentBuilder, Router, Angulartics2, Angulartics2Mixpanel],
				(tcb: TestComponentBuilder, router: Router, angulartics2: Angulartics2, angulartics2Mixpanel: Angulartics2Mixpanel) => {
					return compile(tcb)
						.then((rtc) => fixture = rtc)
						.then((_) => {
							fixture.detectChanges();
							setTimeout(() => {
								expect(win.mixpanel.track).toHaveBeenCalledWith("Page Viewed", { "page": '' });
							}, 20);
						});
				}));

		it('should track pages',
			injectAsync([TestComponentBuilder, Router, Angulartics2, Angulartics2Mixpanel],
				(tcb: TestComponentBuilder, router: Router, angulartics2: Angulartics2, angulartics2Mixpanel: Angulartics2Mixpanel) => {
					return compile(tcb)
						.then((rtc) => fixture = rtc)
						.then((_) => router.config([new Route({ path: '/abc', component: HelloCmp })]))
						.then((_) => router.navigateByUrl('/abc'))
						.then((_) => {
							fixture.detectChanges();
							setTimeout(() => {
								expect(win.mixpanel.track).toHaveBeenCalledWith("Page Viewed", { "page": '/abc' });
							}, 20);
						});
				}));

		it('should track events',
			injectAsync([TestComponentBuilder, Angulartics2, Angulartics2Mixpanel],
				(tcb: TestComponentBuilder, angulartics2: Angulartics2, angulartics2Mixpanel: Angulartics2Mixpanel) => {
					return compile(tcb)
						.then((rtc) => fixture = rtc)
						.then((_) => angulartics2.eventTrack.next({ action: 'do', properties: { category: 'cat' } }))
						.then((_) => {
							fixture.detectChanges();
							setTimeout(() => {
								expect(win.mixpanel.track).toHaveBeenCalledWith('do', { category: 'cat' });
							}, 20);
						});
				}));

		it('should set username',
			injectAsync([TestComponentBuilder, Angulartics2, Angulartics2Mixpanel],
				((tcb: TestComponentBuilder, angulartics2: Angulartics2, angulartics2Mixpanel: Angulartics2Mixpanel) => {
					return compile(tcb)
						.then((rtc) => fixture = rtc)
						.then((_) => angulartics2.setUsername.next('testUser'))
						.then((_) => {
							fixture.detectChanges();
							setTimeout(() => {
								expect(win.mixpanel.identify).toHaveBeenCalledWith('testUser');
							}, 20);
						});
				})));

		it('should set user properties',
			injectAsync([TestComponentBuilder, Angulartics2, Angulartics2Mixpanel],
				((tcb: TestComponentBuilder, angulartics2: Angulartics2, angulartics2Mixpanel: Angulartics2Mixpanel) => {
					return compile(tcb)
						.then((rtc) => fixture = rtc)
						.then((_) => angulartics2.setUserProperties.next({ userId: '1', firstName: 'John', lastName: 'Doe' }))
						.then((_) => {
							fixture.detectChanges();
							setTimeout(() => {
								expect(win.mixpanel.people.set).toHaveBeenCalledWith({ userId: '1', firstName: 'John', lastName: 'Doe' });
							}, 20);
						});
				})));

		it('should set user properties once',
			injectAsync([TestComponentBuilder, Angulartics2, Angulartics2Mixpanel],
				((tcb: TestComponentBuilder, angulartics2: Angulartics2, angulartics2Mixpanel: Angulartics2Mixpanel) => {
					return compile(tcb)
						.then((rtc) => fixture = rtc)
						.then((_) => angulartics2.setUserPropertiesOnce.next({ userId: '1', firstName: 'John', lastName: 'Doe' }))
						.then((_) => {
							fixture.detectChanges();
							setTimeout(() => {
								expect(win.mixpanel.people.set_once).toHaveBeenCalledWith({ userId: '1', firstName: 'John', lastName: 'Doe' });
							}, 20);
						});
				})));

		it('should set super properties',
			injectAsync([TestComponentBuilder, Angulartics2, Angulartics2Mixpanel],
				((tcb: TestComponentBuilder, angulartics2: Angulartics2, angulartics2Mixpanel: Angulartics2Mixpanel) => {
					return compile(tcb)
						.then((rtc) => fixture = rtc)
						.then((_) => angulartics2.setSuperProperties.next({ userId: '1', firstName: 'John', lastName: 'Doe' }))
						.then((_) => {
							fixture.detectChanges();
							setTimeout(() => {
								expect(win.mixpanel.register).toHaveBeenCalledWith({ userId: '1', firstName: 'John', lastName: 'Doe' });
							}, 20);
						});
				})));

		it('should set super properties once',
			injectAsync([TestComponentBuilder, Angulartics2, Angulartics2Mixpanel],
				((tcb: TestComponentBuilder, angulartics2: Angulartics2, angulartics2Mixpanel: Angulartics2Mixpanel) => {
					return compile(tcb)
						.then((rtc) => fixture = rtc)
						.then((_) => angulartics2.setSuperPropertiesOnce.next({ userId: '1', firstName: 'John', lastName: 'Doe' }))
						.then((_) => {
							fixture.detectChanges();
							setTimeout(() => {
								expect(win.mixpanel.register_once).toHaveBeenCalledWith({ userId: '1', firstName: 'John', lastName: 'Doe' });
							}, 20);
						});
				})));

		it('should set alias',
			injectAsync([TestComponentBuilder, Angulartics2, Angulartics2Mixpanel],
				(tcb: TestComponentBuilder, angulartics2: Angulartics2, angulartics2Mixpanel: Angulartics2Mixpanel) => {
					return compile(tcb)
						.then((rtc) => fixture = rtc)
						.then((_) => angulartics2.setAlias.next('testAlias'))
						.then((_) => {
							fixture.detectChanges();
							setTimeout(() => {
								expect(win.mixpanel.alias).toHaveBeenCalledWith('testAlias');
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
