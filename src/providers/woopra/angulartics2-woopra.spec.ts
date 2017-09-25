import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { TestBed, ComponentFixture, fakeAsync, inject } from '@angular/core/testing';

import { TestModule, RootCmp, advance, createRoot } from '../../test.mocks';

import { Angulartics2 } from '../../core/angulartics2';
import { Angulartics2Woopra } from './angulartics2-woopra';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

describe('Angulartics2Woopra', () => {

  var fixture: ComponentFixture<any>;
  var woopra: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [
        {provide: Location, useClass: SpyLocation},
        Angulartics2Woopra
      ]
    });

    window.woopra = woopra = {
      track: jasmine.createSpy('track'),
      identify: jasmine.createSpy('identify')
    };
  });

  it('should track pages',
    fakeAsync(inject([Location, Angulartics2, Angulartics2Woopra],
      (location: Location, angulartics2: Angulartics2, angulartics2Woopra: Angulartics2Woopra) => {
        fixture = createRoot(RootCmp);
        angulartics2.pageTrack.next({path: '/abc', location: location});
        advance(fixture);
        expect(woopra.track).toHaveBeenCalledWith('pv', {url: '/abc'});
      })));

  it('should track events',
    fakeAsync(inject([Location, Angulartics2, Angulartics2Woopra],
      (location: Location, angulartics2: Angulartics2, angulartics2Woopra: Angulartics2Woopra) => {
        fixture = createRoot(RootCmp);
        angulartics2.eventTrack.next({
          action: 'payment', properties: {
            amount: "49.95",
            currency: "USD"
          }
        });
        advance(fixture);
        expect(woopra.track).toHaveBeenCalledWith('payment', {
          amount: "49.95",
          currency: "USD"
        });
      })));

  it('should set user properties',
    fakeAsync(inject([Location, Angulartics2, Angulartics2Woopra],
      (location: Location, angulartics2: Angulartics2, angulartics2Woopra: Angulartics2Woopra) => {
        fixture = createRoot(RootCmp);
        angulartics2.setUserProperties.next({email: 'test@test.com', name: 'John Doe', company: 'Test Co'});
        advance(fixture);
        expect(woopra.identify).toHaveBeenCalledWith({
          email: 'test@test.com',
          name: 'John Doe',
          company: 'Test Co'
        });
      })));
});
