import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { TestBed, ComponentFixture, fakeAsync, inject } from '@angular/core/testing';

import { TestModule, RootCmp, advance, createRoot } from '../../../../test.mocks';

import { Angulartics } from '../../../core/src/angulartics';
import { AngularticsGoogleAnalytics } from '../src/provider';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

describe('AngularticsGoogleAnalytics', () => {
  var ga: any;
  var _gaq: Array<any>;
  var fixture: ComponentFixture<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [
        { provide: Location, useClass: SpyLocation },
        AngularticsGoogleAnalytics
      ]
    });

    window.ga = ga = jasmine.createSpy('ga');
    window._gaq = _gaq = [];
  });

  it('should track pages',
    fakeAsync(inject([Location, Angulartics, AngularticsGoogleAnalytics],
        (location: Location, angulartics: Angulartics, angularticsGoogleAnalytics: AngularticsGoogleAnalytics) => {
          fixture = createRoot(RootCmp);
          angulartics.pageTrack.next({ path: '/abc', location: location });
          advance(fixture);
          expect(ga).toHaveBeenCalledWith('send', 'pageview', '/abc');
      })));

  it('should track events',
    fakeAsync(inject([Location, Angulartics, AngularticsGoogleAnalytics],
        (location: Location, angulartics: Angulartics, angularticsGoogleAnalytics: AngularticsGoogleAnalytics) => {
          fixture = createRoot(RootCmp);
          angulartics.eventTrack.next({ action: 'do', properties: { category: 'cat' } });
          advance(fixture);
          expect(ga).toHaveBeenCalledWith('send', 'event', { eventCategory: 'cat', eventAction: 'do', eventLabel: undefined, eventValue: undefined, nonInteraction: undefined, page: '/context.html', userId: null });
      })));

  it('should track exceptions',
    fakeAsync(inject([Location, Angulartics, AngularticsGoogleAnalytics],
        (location: Location, angulartics: Angulartics, angularticsGoogleAnalytics: AngularticsGoogleAnalytics) => {
          fixture = createRoot(RootCmp);
          angulartics.exceptionTrack.next({ fatal: true, description: 'test' });
          advance(fixture);
          expect(ga).toHaveBeenCalledWith('send', 'exception', { exFatal: true, exDescription: 'test' });
      })));

  it('should set username',
    fakeAsync(inject([Location, Angulartics, AngularticsGoogleAnalytics],
        (location: Location, angulartics: Angulartics, angularticsGoogleAnalytics: AngularticsGoogleAnalytics) => {
          fixture = createRoot(RootCmp);
          angulartics.setUsername.next('testuser');
          advance(fixture);
          expect(angulartics.settings.ga.userId).toBe('testuser');
      })));

  it('should set user porperties',
    fakeAsync(inject([Location, Angulartics, AngularticsGoogleAnalytics],
        (location: Location, angulartics: Angulartics, angularticsGoogleAnalytics: AngularticsGoogleAnalytics) => {
          fixture = createRoot(RootCmp);
          angulartics.setUserProperties.next({ dimension1: 'test' });
          advance(fixture);
          expect(ga).toHaveBeenCalledWith('set', 'dimension1', 'test');
          angulartics.setUserProperties.next({ metric1: 'test' });
          advance(fixture);
          expect(ga).toHaveBeenCalledWith('set', 'metric1', 'test');
      })));

  it('should track user timings',
    fakeAsync(inject([Location, Angulartics, AngularticsGoogleAnalytics],
        (location: Location, angulartics: Angulartics, angularticsGoogleAnalytics: AngularticsGoogleAnalytics) => {
          fixture = createRoot(RootCmp);
          angulartics.userTimings.next({ timingCategory: 'cat', timingVar: 'var', timingValue: 100 });
          advance(fixture);
          expect(ga).toHaveBeenCalledWith('send', 'timing', { timingCategory: 'cat', timingVar: 'var', timingValue: 100 });
      })));

});
