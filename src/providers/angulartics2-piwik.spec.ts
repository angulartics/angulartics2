import {Location} from '@angular/common';
import {SpyLocation} from '@angular/common/testing';
import {
  async,
  it,
  xit,
  inject,
  describe,
  ddescribe,
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
import {Angulartics2Piwik} from './angulartics2-piwik';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

export function main() {
  describe('Angulartics2Piwik', () => {
	var _paq: Array<any>;
	var fixture: ComponentFixture<any>;

	beforeEachProviders(() => [
	  TEST_ROUTER_PROVIDERS,
	  Angulartics2,
	  Angulartics2Piwik
	]);

	beforeEach(function() {
	  window._paq = _paq = [];
	});


	it('should track events',
	  fakeAsync(inject([TestComponentBuilder, Location, Angulartics2, Angulartics2Piwik],
		(tcb: TestComponentBuilder, location: Location, angulartics2: Angulartics2, angulartics2Piwik: Angulartics2Piwik) => {
		  fixture = tcb.createFakeAsync(RootCmp);
		  angulartics2.eventTrack.next({ action: 'do', properties: { category: 'cat' } })
		  advance(fixture);
		  expect(_paq).toContain(['trackEvent', 'cat', 'do', undefined, undefined]);
		})));

	it('should set username',
	  fakeAsync(inject([TestComponentBuilder, Location, Angulartics2, Angulartics2Piwik],
		(tcb: TestComponentBuilder, location: Location, angulartics2: Angulartics2, angulartics2Piwik: Angulartics2Piwik) => {
		  fixture = tcb.createFakeAsync(RootCmp);
		  angulartics2.setUsername.next('testUser')
		  advance(fixture);
		  expect(_paq).toContain(['setUserId', 'testUser']);
		})));

	it('should set user properties',
	  fakeAsync(inject([TestComponentBuilder, Location, Angulartics2, Angulartics2Piwik],
		(tcb: TestComponentBuilder, location: Location, angulartics2: Angulartics2, angulartics2Piwik: Angulartics2Piwik) => {
		  fixture = tcb.createFakeAsync(RootCmp);
		  angulartics2.setUserProperties.next({ userId: '1', firstName: 'John', lastName: 'Doe' });
		  advance(fixture);
		  expect(_paq).toContain(['setCustomVariable', { userId: '1', firstName: 'John', lastName: 'Doe' }]);
		})));

  });
}
