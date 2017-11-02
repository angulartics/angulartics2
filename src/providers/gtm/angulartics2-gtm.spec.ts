import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { TestBed, ComponentFixture, fakeAsync, inject } from '@angular/core/testing';

import { TestModule, RootCmp, advance, createRoot } from '../../test.mocks';

import { Angulartics2 } from '../../core/angulartics2';
import { Angulartics2GoogleTagManager } from './angulartics2-gtm';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

describe('Angulartics2GoogleTagManager', () => {
  var dataLayer: any;
  var fixture: ComponentFixture<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [
        { provide: Location, useClass: SpyLocation },
        Angulartics2GoogleTagManager
      ]
    });

    window.dataLayer = dataLayer = [];
  });

  it('should track pages',
    fakeAsync(inject([Location, Angulartics2, Angulartics2GoogleTagManager],
        (location: Location, angulartics2: Angulartics2, angulartics2GoogleTagManager: Angulartics2GoogleTagManager) => {
          fixture = createRoot(RootCmp);
          angulartics2.pageTrack.next({ path: '/abc', location: location });
          advance(fixture);
          expect(dataLayer).toContain({ event: 'Page View', 'content-name': '/abc', userId: null });
      })));

  it('should track events',
    fakeAsync(inject([Angulartics2, Angulartics2GoogleTagManager],
        (angulartics2: Angulartics2, angulartics2GoogleTagManager: Angulartics2GoogleTagManager) => {
          fixture = createRoot(RootCmp);
          angulartics2.eventTrack.next({ action: 'do', properties: { category: 'cat', gtmCustom: { customKey: 'customValue' } } });
          advance(fixture);
          expect(dataLayer).toContain({ event: 'interaction', target: 'cat', action: 'do', customKey: 'customValue', label: undefined, value: undefined, interactionType: undefined, userId: null });
      })));

  it('should track exceptions',
    fakeAsync(inject([Angulartics2, Angulartics2GoogleTagManager],
        (angulartics2: Angulartics2, angulartics2GoogleTagManager: Angulartics2GoogleTagManager) => {
          fixture = createRoot(RootCmp);
          angulartics2.exceptionTrack.next({ appId: 'app', appName: 'Test App', appVersion: '0.1' });
          advance(fixture);
          expect(dataLayer).toContain({ event: 'interaction', target: 'Exception', action: 'Exception thrown for Test App <app@0.1>', label: undefined, value: undefined, interactionType: undefined, userId: null });
      })));

  it('should set username',
    fakeAsync(inject([Angulartics2, Angulartics2GoogleTagManager],
        (angulartics2: Angulartics2, angulartics2GoogleTagManager: Angulartics2GoogleTagManager) => {
          fixture = createRoot(RootCmp);
          angulartics2.setUsername.next('testuser');
          advance(fixture);
          expect(angulartics2.settings.gtm.userId).toBe('testuser');
      })));

});
