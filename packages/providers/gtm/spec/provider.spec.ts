import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { TestBed, ComponentFixture, fakeAsync, inject } from '@angular/core/testing';

import { TestModule, RootCmp, advance, createRoot } from '../../../../test.mocks';

import { Angulartics } from '../../../core/src/angulartics';
import { AngularticsGoogleTagManager } from '../src/provider';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

describe('AngularticsGoogleTagManager', () => {
  var dataLayer: any;
  var fixture: ComponentFixture<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [
        { provide: Location, useClass: SpyLocation },
        AngularticsGoogleTagManager
      ]
    });

    window.dataLayer = dataLayer = [];
  });

  it('should track pages',
    fakeAsync(inject([Location, Angulartics, AngularticsGoogleTagManager],
        (location: Location, angulartics: Angulartics, angularticsGoogleTagManager: AngularticsGoogleTagManager) => {
          fixture = createRoot(RootCmp);
          angulartics.pageTrack.next({ path: '/abc', location: location });
          advance(fixture);
          expect(dataLayer).toContain({ event: 'Page View', 'content-name': '/abc', userId: null });
      })));

  it('should track events',
    fakeAsync(inject([Angulartics, AngularticsGoogleTagManager],
        (angulartics: Angulartics, angularticsGoogleTagManager: AngularticsGoogleTagManager) => {
          fixture = createRoot(RootCmp);
          angulartics.eventTrack.next({ action: 'do', properties: { category: 'cat' } });
          advance(fixture);
          expect(dataLayer).toContain({ event: 'interaction', target: 'cat', action: 'do', label: undefined, value: undefined, interactionType: undefined, userId: null });
      })));

  it('should track exceptions',
    fakeAsync(inject([Angulartics, AngularticsGoogleTagManager],
        (angulartics: Angulartics, angularticsGoogleTagManager: AngularticsGoogleTagManager) => {
          fixture = createRoot(RootCmp);
          angulartics.exceptionTrack.next({ appId: 'app', appName: 'Test App', appVersion: '0.1' });
          advance(fixture);
          expect(dataLayer).toContain({ event: 'interaction', target: 'Exception', action: 'Exception thrown for Test App <app@0.1>', label: undefined, value: undefined, interactionType: undefined, userId: null });
      })));

  it('should set username',
    fakeAsync(inject([Angulartics, AngularticsGoogleTagManager],
        (angulartics: Angulartics, angularticsGoogleTagManager: AngularticsGoogleTagManager) => {
          fixture = createRoot(RootCmp);
          angulartics.setUsername.next('testuser');
          advance(fixture);
          expect(angulartics.settings.gtm.userId).toBe('testuser');
      })));

});
