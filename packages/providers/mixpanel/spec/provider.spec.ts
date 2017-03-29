import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { TestBed, ComponentFixture, fakeAsync, inject } from '@angular/core/testing';

import { TestModule, RootCmp, advance, createRoot } from '../../../../test.mocks';

import { Angulartics } from '../../../core/src/angulartics';
import { AngularticsMixpanel } from '../src/provider';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

describe('AngularticsMixpanel', () => {

  var fixture: ComponentFixture<any>;
  var mixpanel: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [
        { provide: Location, useClass: SpyLocation },
        AngularticsMixpanel
      ]
    });

    window.mixpanel = mixpanel = {
      track: jasmine.createSpy('track'),
      identify: jasmine.createSpy('identify'),
      people: {
        set: jasmine.createSpy('people.set'),
        set_once: jasmine.createSpy('people.set_once')
      },
      register: jasmine.createSpy('register'),
      register_once: jasmine.createSpy('register_once'),
      alias: jasmine.createSpy('alias')
    };
  });

  it('should track pages',
    fakeAsync(inject([Location, Angulartics, AngularticsMixpanel],
        (location: Location, angulartics: Angulartics, angularticsMixpanel: AngularticsMixpanel) => {
          fixture = createRoot(RootCmp);
          angulartics.pageTrack.next({ path: '/abc', location: location });
          advance(fixture);
          expect(mixpanel.track).toHaveBeenCalledWith('Page Viewed', { page: '/abc' });
      })));

  it('should track events',
    fakeAsync(inject([Location, Angulartics, AngularticsMixpanel],
        (location: Location, angulartics: Angulartics, angularticsMixpanel: AngularticsMixpanel) => {
          fixture = createRoot(RootCmp);
          angulartics.eventTrack.next({ action: 'do', properties: { category: 'cat' } });
          advance(fixture);
          expect(mixpanel.track).toHaveBeenCalledWith('do', { category: 'cat' });
      })));


  it('should set username',
    fakeAsync(inject([Location, Angulartics, AngularticsMixpanel],
        (location: Location, angulartics: Angulartics, angularticsMixpanel: AngularticsMixpanel) => {
          fixture = createRoot(RootCmp);
          angulartics.setUsername.next('testUser');
          advance(fixture);
          expect(mixpanel.identify).toHaveBeenCalledWith('testUser');
      })));

  it('should set user properties',
    fakeAsync(inject([Location, Angulartics, AngularticsMixpanel],
        (location: Location, angulartics: Angulartics, angularticsMixpanel: AngularticsMixpanel) => {
          fixture = createRoot(RootCmp);
          angulartics.setUserProperties.next({ userId: '1', firstName: 'John', lastName: 'Doe' });
          advance(fixture);
          expect(mixpanel.people.set).toHaveBeenCalledWith({ userId: '1', firstName: 'John', lastName: 'Doe' });
      })));

  it('should set user properties once',
    fakeAsync(inject([Location, Angulartics, AngularticsMixpanel],
        (location: Location, angulartics: Angulartics, angularticsMixpanel: AngularticsMixpanel) => {
          fixture = createRoot(RootCmp);
          angulartics.setUserPropertiesOnce.next({ userId: '1', firstName: 'John', lastName: 'Doe' });
          advance(fixture);
          expect(mixpanel.people.set_once).toHaveBeenCalledWith({ userId: '1', firstName: 'John', lastName: 'Doe' });
      })));

  it('should set super properties',
    fakeAsync(inject([Location, Angulartics, AngularticsMixpanel],
        (location: Location, angulartics: Angulartics, angularticsMixpanel: AngularticsMixpanel) => {
          fixture = createRoot(RootCmp);
          angulartics.setSuperProperties.next({ userId: '1', firstName: 'John', lastName: 'Doe' });
          advance(fixture);
          expect(mixpanel.register).toHaveBeenCalledWith({ userId: '1', firstName: 'John', lastName: 'Doe' });
      })));

  it('should set super properties once',
    fakeAsync(inject([Location, Angulartics, AngularticsMixpanel],
        (location: Location, angulartics: Angulartics, angularticsMixpanel: AngularticsMixpanel) => {
          fixture = createRoot(RootCmp);
          angulartics.setSuperPropertiesOnce.next({ userId: '1', firstName: 'John', lastName: 'Doe' });
          advance(fixture);
          expect(mixpanel.register_once).toHaveBeenCalledWith({ userId: '1', firstName: 'John', lastName: 'Doe' });
      })));

  it('should set alias',
    fakeAsync(inject([Location, Angulartics, AngularticsMixpanel],
        (location: Location, angulartics: Angulartics, angularticsMixpanel: AngularticsMixpanel) => {
          fixture = createRoot(RootCmp);
          angulartics.setAlias.next('testAlias');
          advance(fixture);
          expect(mixpanel.alias).toHaveBeenCalledWith('testAlias');
      })));

});
