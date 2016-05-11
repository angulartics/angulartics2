import {provide, Component} from '@angular/core';
import {Location} from '@angular/common';
import {SpyLocation} from '@angular/common/testing';
import {
  async,
  it,
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

import {advance} from '../test.mocks';
import {Angulartics2} from './angulartics2';
import {Angulartics2On} from './angulartics2On';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

export function main() {
  describe('angulartics2On', () => {

    var fixture: ComponentFixture<any>;
    var compiled: any;
    var EventSpy: any;

    beforeEachProviders(() => [
      provide(Location, { useClass: SpyLocation }),
      Angulartics2
    ]);

    beforeEach(function() {
      EventSpy = jasmine.createSpy('EventSpy');
    });

    it('should not send on and event fields to the eventTrack function',
      fakeAsync(inject([TestComponentBuilder, Angulartics2],
        (tcb: TestComponentBuilder, angulartics2: Angulartics2) => {
          fixture = tcb.overrideTemplate(RootCmp, `<div [angulartics2On]="'click'" [angularticsEvent]="'InitiateSearch'" [angularticsCategory]="'Search'"></div>`).createFakeAsync(RootCmp);
          advance(fixture);
          expect(EventSpy).not.toHaveBeenCalled();
          angulartics2.eventTrack.subscribe((x: any) => EventSpy(x));
          compiled = fixture.debugElement.nativeElement.children[0];
          compiled.click();
          advance(fixture);
          expect(EventSpy).toHaveBeenCalledWith({ action: 'InitiateSearch', properties: { category: 'Search', eventType: 'click' } });
        })));

    it('should infer event',
      fakeAsync(inject([TestComponentBuilder, Angulartics2],
        (tcb: TestComponentBuilder, angulartics2: Angulartics2) => {
          fixture = tcb.overrideTemplate(RootCmp, `<a [angulartics2On]="'click'" [angularticsCategory]="'Search'">InitiateSearch</a>`).createFakeAsync(RootCmp);
          advance(fixture);
          expect(EventSpy).not.toHaveBeenCalled();
          angulartics2.eventTrack.subscribe((x: any) => EventSpy(x));
          compiled = fixture.debugElement.nativeElement.children[0];
          compiled.click();
          advance(fixture);
          expect(EventSpy).toHaveBeenCalledWith({ action: 'InitiateSearch', properties: { category: 'Search', eventType: 'click' } });
        })));

  });

  @Component({
    selector: 'root-comp',
    template: '',
    directives: [Angulartics2On]
  })
  class RootCmp {
    name: string;
  }
}
