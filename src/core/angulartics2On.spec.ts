import {Component, provide} from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {Location} from 'angular2/platform/common';
import {
  it,
  inject,
  describe,
  beforeEachProviders,
  ComponentFixture,
  TestComponentBuilder
} from 'angular2/testing';

import {TEST_ROUTER_PROVIDERS} from '../test.mocks';
import {Angulartics2} from './angulartics2';
import {Angulartics2On} from './angulartics2On';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

export function main() {
  describe('angulartics2On', () => {

    var fixture: ComponentFixture;
    var compiled: any;
    var EventSpy: any;

    beforeEachProviders(() => [
      TEST_ROUTER_PROVIDERS,
      Angulartics2
    ]);

    beforeEach(function() {
      EventSpy = jasmine.createSpy('EventSpy');
    });

    it('should not send on and event fields to the eventTrack function',
      inject([TestComponentBuilder, Router, Angulartics2],
        (tcb: TestComponentBuilder, router: Router, angulartics2: Angulartics2) => {
          return tcb.overrideTemplate(RootCmp, `<div [angulartics2On]="'click'" [angularticsEvent]="'InitiateSearch'" [angularticsCategory]="'Search'"></div>`)
            .createAsync(RootCmp)
            .then((rtc) => fixture = rtc)
            .then((_) => {
              fixture.detectChanges();
              return new Promise((resolve) => {
                expect(EventSpy).not.toHaveBeenCalled();
                angulartics2.eventTrack.subscribe((x: any) => EventSpy(x));
                compiled = fixture.debugElement.nativeElement.children[0];
                compiled.click();
                resolve();
              });
            })
            .then((_) => {
              fixture.detectChanges();
              return new Promise((resolve) => {
                setTimeout(() => {
                  expect(EventSpy).toHaveBeenCalledWith({ action: 'InitiateSearch', properties: { category: 'Search', eventType: 'click' } });
                  resolve();
                });
              });
            });
        }));

  });

  @Component({
    selector: 'root-comp',
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES, Angulartics2On]
  })
  class RootCmp {
    name: string;
  }
}
