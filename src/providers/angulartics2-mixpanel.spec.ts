import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { TestBed, ComponentFixture, fakeAsync, inject } from '@angular/core/testing';

import { TestModule, RootCmp, advance, createRoot } from '../test.mocks';

import { Angulartics2 } from '../core/angulartics2';
import { Angulartics2Mixpanel } from './angulartics2-mixpanel';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

export function main() {

  describe('Angulartics2Mixpanel', () => {

    var fixture: ComponentFixture<any>;
    var mixpanel: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          TestModule
        ],
        providers: [
          { provide: Location, useClass: SpyLocation },
          Angulartics2Mixpanel
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

    it('should track initial page',
      fakeAsync(inject([Location, Angulartics2, Angulartics2Mixpanel],
          (location: Location, angulartics2: Angulartics2, angulartics2Mixpanel: Angulartics2Mixpanel) => {
            fixture = createRoot(RootCmp);
            advance(fixture);
            expect(mixpanel.track).toHaveBeenCalledWith('Page Viewed', { page: '' });
        })));

    it('should track pages',
      fakeAsync(inject([Location, Angulartics2, Angulartics2Mixpanel],
          (location: Location, angulartics2: Angulartics2, angulartics2Mixpanel: Angulartics2Mixpanel) => {
            fixture = createRoot(RootCmp);
            angulartics2.pageTrack.next({ path: '/abc', location: location });
            advance(fixture);
            expect(mixpanel.track).toHaveBeenCalledWith('Page Viewed', { page: '/abc' });
        })));

    it('should track events',
      fakeAsync(inject([Location, Angulartics2, Angulartics2Mixpanel],
          (location: Location, angulartics2: Angulartics2, angulartics2Mixpanel: Angulartics2Mixpanel) => {
            fixture = createRoot(RootCmp);
            angulartics2.eventTrack.next({ action: 'do', properties: { category: 'cat' } });
            advance(fixture);
            expect(mixpanel.track).toHaveBeenCalledWith('do', { category: 'cat' });
        })));


    it('should set username',
      fakeAsync(inject([Location, Angulartics2, Angulartics2Mixpanel],
          (location: Location, angulartics2: Angulartics2, angulartics2Mixpanel: Angulartics2Mixpanel) => {
            fixture = createRoot(RootCmp);
            angulartics2.setUsername.next('testUser');
            advance(fixture);
            expect(mixpanel.identify).toHaveBeenCalledWith('testUser');
        })));

    it('should set user properties',
      fakeAsync(inject([Location, Angulartics2, Angulartics2Mixpanel],
          (location: Location, angulartics2: Angulartics2, angulartics2Mixpanel: Angulartics2Mixpanel) => {
            fixture = createRoot(RootCmp);
            angulartics2.setUserProperties.next({ userId: '1', firstName: 'John', lastName: 'Doe' });
            advance(fixture);
            expect(mixpanel.people.set).toHaveBeenCalledWith({ userId: '1', firstName: 'John', lastName: 'Doe' });
        })));

    it('should set user properties once',
      fakeAsync(inject([Location, Angulartics2, Angulartics2Mixpanel],
          (location: Location, angulartics2: Angulartics2, angulartics2Mixpanel: Angulartics2Mixpanel) => {
            fixture = createRoot(RootCmp);
            angulartics2.setUserPropertiesOnce.next({ userId: '1', firstName: 'John', lastName: 'Doe' });
            advance(fixture);
            expect(mixpanel.people.set_once).toHaveBeenCalledWith({ userId: '1', firstName: 'John', lastName: 'Doe' });
        })));

    it('should set super properties',
      fakeAsync(inject([Location, Angulartics2, Angulartics2Mixpanel],
          (location: Location, angulartics2: Angulartics2, angulartics2Mixpanel: Angulartics2Mixpanel) => {
            fixture = createRoot(RootCmp);
            angulartics2.setSuperProperties.next({ userId: '1', firstName: 'John', lastName: 'Doe' });
            advance(fixture);
            expect(mixpanel.register).toHaveBeenCalledWith({ userId: '1', firstName: 'John', lastName: 'Doe' });
        })));

    it('should set super properties once',
      fakeAsync(inject([Location, Angulartics2, Angulartics2Mixpanel],
          (location: Location, angulartics2: Angulartics2, angulartics2Mixpanel: Angulartics2Mixpanel) => {
            fixture = createRoot(RootCmp);
            angulartics2.setSuperPropertiesOnce.next({ userId: '1', firstName: 'John', lastName: 'Doe' });
            advance(fixture);
            expect(mixpanel.register_once).toHaveBeenCalledWith({ userId: '1', firstName: 'John', lastName: 'Doe' });
        })));

    it('should set alias',
      fakeAsync(inject([Location, Angulartics2, Angulartics2Mixpanel],
          (location: Location, angulartics2: Angulartics2, angulartics2Mixpanel: Angulartics2Mixpanel) => {
            fixture = createRoot(RootCmp);
            angulartics2.setAlias.next('testAlias');
            advance(fixture);
            expect(mixpanel.alias).toHaveBeenCalledWith('testAlias');
        })));

  });
}
