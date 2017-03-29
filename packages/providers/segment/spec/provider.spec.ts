import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { TestBed, ComponentFixture, fakeAsync, inject } from '@angular/core/testing';

import { TestModule, RootCmp, advance, createRoot } from '../../../../test.mocks';

import { Angulartics } from '../../../core/src/angulartics';
import { AngularticsSegment } from '../src/provider';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

describe('AngularticsSegment', () => {

  var fixture: ComponentFixture<any>;
  var analytics: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [
        { provide: Location, useClass: SpyLocation },
        AngularticsSegment
      ]
    });

    window.analytics = analytics = {
      page: jasmine.createSpy('page'),
      track: jasmine.createSpy('track'),
      identify: jasmine.createSpy('identify'),
      alias: jasmine.createSpy('alias')
    };
  });

  it('should track pages',
    fakeAsync(inject([Location, Angulartics, AngularticsSegment],
        (location: Location, angulartics: Angulartics, angularticsSegment: AngularticsSegment) => {
          fixture = createRoot(RootCmp);
          angulartics.pageTrack.next({ path: '/abc', location: location });
          advance(fixture);
          expect(analytics.page).toHaveBeenCalledWith('/abc');
      })));

  it('should track events',
    fakeAsync(inject([Location, Angulartics, AngularticsSegment],
        (location: Location, angulartics: Angulartics, angularticsSegment: AngularticsSegment) => {
          fixture = createRoot(RootCmp);
          angulartics.eventTrack.next({ action: 'do', properties: { category: 'cat' } });
          advance(fixture);
          expect(analytics.track).toHaveBeenCalledWith('do', { category: 'cat' });
      })));

  it('should set user properties',
    fakeAsync(inject([Location, Angulartics, AngularticsSegment],
        (location: Location, angulartics: Angulartics, angularticsSegment: AngularticsSegment) => {
          fixture = createRoot(RootCmp);
          angulartics.setUserProperties.next({ userId: '1', firstName: 'John', lastName: 'Doe' });
          advance(fixture);
          expect(analytics.identify).toHaveBeenCalledWith('1', { userId: '1', firstName: 'John', lastName: 'Doe' });
      })));

  it('should set user properties once',
    fakeAsync(inject([Location, Angulartics, AngularticsSegment],
        (location: Location, angulartics: Angulartics, angularticsSegment: AngularticsSegment) => {
          fixture = createRoot(RootCmp);
          angulartics.setUserPropertiesOnce.next({ userId: '1', firstName: 'John', lastName: 'Doe' });
          advance(fixture);
          expect(analytics.identify).toHaveBeenCalledWith('1', { userId: '1', firstName: 'John', lastName: 'Doe' });
      })));

  it('should set alias',
    fakeAsync(inject([Location, Angulartics, AngularticsSegment],
        (location: Location, angulartics: Angulartics, angularticsSegment: AngularticsSegment) => {
          fixture = createRoot(RootCmp);
          angulartics.setAlias.next('testAlias');
          advance(fixture);
          expect(analytics.alias).toHaveBeenCalledWith('testAlias');
      })));

});
