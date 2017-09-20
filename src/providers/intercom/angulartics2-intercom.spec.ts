import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { TestBed, ComponentFixture, fakeAsync, inject } from '@angular/core/testing';

import { TestModule, RootCmp, advance, createRoot } from '../../test.mocks';

import { Angulartics2 } from '../../core/angulartics2';
import { Angulartics2Intercom } from './angulartics2-intercom';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

describe('Angulartics2Intercom', () => {
  var Intercom: any;
  var fixture: ComponentFixture<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [
        { provide: Location, useClass: SpyLocation },
        Angulartics2Intercom
      ]
    });

    window.Intercom = Intercom = Object.assign(jasmine.createSpy('Intercom'), {booted: true});
  });

  it('should track events',
    fakeAsync(inject([Location, Angulartics2, Angulartics2Intercom],
        (location: Location, angulartics2: Angulartics2, angulartics2Intercom: Angulartics2Intercom) => {
          fixture = createRoot(RootCmp);
          angulartics2.eventTrack.next({ action: 'did_a_thing', properties: { foo: 'bar' }});
          advance(fixture);
          expect(Intercom).toHaveBeenCalledWith('trackEvent', 'did_a_thing', { foo: 'bar' });
    })));

  it('should not track events when not booted yet',
    fakeAsync(inject([Location, Angulartics2, Angulartics2Intercom],
        (location: Location, angulartics2: Angulartics2, angulartics2Intercom: Angulartics2Intercom) => {
          Intercom.booted = false;
          fixture = createRoot(RootCmp);
          angulartics2.eventTrack.next({ action: 'did_a_thing', properties: { foo: 'bar' }});
          advance(fixture);
          expect(Intercom).not.toHaveBeenCalled();
    })));

  it('should set user name',
    fakeAsync(inject([Location, Angulartics2, Angulartics2Intercom],
        (location: Location, angulartics2: Angulartics2, angulartics2Intercom: Angulartics2Intercom) => {
          fixture = createRoot(RootCmp);
          angulartics2.setUsername.next('1234');
          advance(fixture);
          expect(Intercom).toHaveBeenCalledWith('update', {user_id: '1234'});
    })));

  it('should set super properties once',
    fakeAsync(inject([Location, Angulartics2, Angulartics2Intercom],
        (location: Location, angulartics2: Angulartics2, angulartics2Intercom: Angulartics2Intercom) => {
          fixture = createRoot(RootCmp);
          angulartics2.setSuperPropertiesOnce.next({app_id: 'a1b2c3d4', company: {id: '4321'}});
          advance(fixture);
          expect(Intercom).toHaveBeenCalledWith('boot', {app_id: 'a1b2c3d4', company: {id: '4321'}});
    })));

});
