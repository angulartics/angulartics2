import { CommonModule, Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { Component, Directive, Injectable } from '@angular/core';
import { fakeAsync, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { advance, createRoot } from '../test.mocks';
import { Angulartics2 } from './angulartics2-core';
import { Angulartics2Module } from './angulartics2.module';
import { Angulartics2On } from './angulartics2On';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

@Injectable({ providedIn: 'root' })
export class DummyProvider {
  // tslint:disable-next-line:no-unused-variable
  constructor(private angulartics2: Angulartics2) {}
}

@Component({
  selector: 'root-comp',
  template: `
    <a angulartics2On="click"
      angularticsAction="InitiateSearch">
    </a>
  `,
})
class RootCmp {
  name: string;
}

@Component({
  selector: 'root-comp',
  template: `
    <button (click)="triggerEvent($event)">Greet</button>
    <a angulartics2On
      (customEvent)="eventTrack($event)"
      angularticsAction="InitiateSearch">
    </a>
  `,
})
class RootCmp1 {
  name: string;
}

@Component({
  selector: 'root-comp',
  template: `
    <div
      [angulartics2On]="'click'"
      angularticsAction="InitiateSearch"
      angularticsLabel="custom-label"
      angularticsValue="custom-value"
      [angularticsCategory]="angularticsCategory">
    </div>
  `,
})
class RootCmp2 {
  name: string;
  angularticsCategory = 'Search';
}

@Component({
  selector: 'root-comp',
  template: `
    <a angulartics2On="click" angularticsCategory="Search">
      InitiateSearch
    </a>
  `,
})
class RootCmp3 {
  name: string;
}

describe('angulartics2On', () => {
  let fixture: ComponentFixture<any>;
  let compiled: any;
  let EventSpy: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        Angulartics2Module.forRoot(),
      ],
      declarations: [RootCmp, RootCmp1, RootCmp2, RootCmp3],
      providers: [{ provide: Location, useClass: SpyLocation }],
    });

    EventSpy = jasmine.createSpy('EventSpy');
  });

  it('should subscribe to element events',
    fakeAsync(
      inject([Angulartics2], (angulartics2: Angulartics2) => {
        fixture = createRoot(RootCmp);
        expect(EventSpy).not.toHaveBeenCalled();
        angulartics2.eventTrack.subscribe((x) => EventSpy(x));
        compiled = fixture.debugElement.nativeElement.children[0];
        compiled.click();
        advance(fixture);
        expect(EventSpy).toHaveBeenCalledWith({
          action: 'InitiateSearch',
          properties: { eventType: 'click' },
        });
      }),
    ),
  );

  // WIP: trying to implement a way to subscribe to custom event types
  xit('should subscribe to custom eventemiter',
    fakeAsync(
      inject([Angulartics2], (angulartics2: Angulartics2) => {
        fixture = createRoot(RootCmp1);
        expect(EventSpy).not.toHaveBeenCalled();
        angulartics2.eventTrack.subscribe((x) => EventSpy(x));
        compiled = fixture.debugElement.nativeElement.children[0];
        compiled.click();
        advance(fixture);
        expect(EventSpy).toHaveBeenCalledWith({
          action: 'InitiateSearch',
          properties: { eventType: undefined },
        });
      }),
    ),
  );

  it('should not send on and event fields to the eventTrack function',
    fakeAsync(
      inject([Angulartics2], (angulartics2: Angulartics2) => {
        fixture = createRoot(RootCmp2);
        expect(EventSpy).not.toHaveBeenCalled();
        angulartics2.eventTrack.subscribe((x) => EventSpy(x));
        compiled = fixture.debugElement.nativeElement.children[0];
        compiled.click();
        advance(fixture);
        expect(EventSpy).toHaveBeenCalledWith({
          action: 'InitiateSearch',
          properties: {
            category: 'Search',
            eventType: 'click',
            label: 'custom-label',
            value: 'custom-value',
          },
        });
      }),
    ),
  );

  // Need refactor or maybe just remove functionality as it might break in other platforms other than web browsers.
  xit('should infer event',
    fakeAsync(
      inject([Angulartics2], (angulartics2: Angulartics2) => {
        fixture = createRoot(RootCmp3);
        expect(EventSpy).not.toHaveBeenCalled();
        angulartics2.eventTrack.subscribe((x) => EventSpy(x));
        compiled = fixture.debugElement.nativeElement.children[0];
        compiled.click();
        advance(fixture);
        expect(EventSpy).toHaveBeenCalledWith({
          action: 'InitiateSearch',
          properties: { category: 'Search', eventType: 'click' },
        });
      }),
    ),
  );

  describe('running on server', () => {
    @Injectable({ providedIn: 'root' })
    @Directive({
      selector: '[angulartics2On]',
    })
    class Angulartics2OnStub extends Angulartics2On {
      isBrowser() {
        return false;
      }
    }

    beforeEach(() => {
      TestBed.overrideModule(Angulartics2Module, {
        set: {
          declarations: [Angulartics2OnStub],
          exports: [Angulartics2OnStub],
        },
      });
    });
  });
});
