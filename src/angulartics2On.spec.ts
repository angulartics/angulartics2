import {ApplicationRef, Component, provide} from 'angular2/core';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, ROUTER_PRIMARY_COMPONENT, Router, Location} from 'angular2/router';
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
import {Angulartics2On} from './angulartics2On';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

export function main() {
	describe('angulartics2On', () => {

		var fixture: ComponentFixture;
		var compiled: any;
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

		it('should not send on and event fields to the eventTrack function',
			injectAsync([TestComponentBuilder, Router, Angulartics2],
				(tcb: TestComponentBuilder, router: Router, angulartics2: Angulartics2) => {
					return tcb.overrideTemplate(RootCmp, `<div [angulartics2On]="'click'" [angularticsEvent]="'InitiateSearch'" [angularticsCategory]="'Search'"></div>`)
						.createAsync(RootCmp)
						.then((rtc) => fixture = rtc)
						.then((_) => {
							fixture.detectChanges();
							expect(EventSpy).not.toHaveBeenCalled();
						})
						.then((_) => angulartics2.eventTrack.subscribe((x: any) => EventSpy(x)))
						.then((_) => compiled = fixture.debugElement.nativeElement.children[0])
						.then((_) => compiled.click())
						.then((_) => {
							fixture.detectChanges();
							setTimeout(() => {
								expect(EventSpy).toHaveBeenCalledWith({ action: 'InitiateSearch', properties: { category: 'Search', eventType: 'click' } });
							});
						});
				}));

	});

	class MockPrimaryComponent {
	}

	@Component({
		selector: 'root-comp',
		template: `<router-outlet></router-outlet>`,
		directives: [ROUTER_DIRECTIVES, Angulartics2On]
	})
	class RootCmp {
		name: string;
	}
}
