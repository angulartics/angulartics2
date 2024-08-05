import { fakeAsync, inject, ComponentFixture, TestBed } from '@angular/core/testing';

import { advance, createRoot, RootCmp, TestModule } from '../../test.mocks';

import { Angulartics2 } from '../../angulartics2-core';
import { Angulartics2Posthog } from './posthog';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

describe('Angulartics2Posthog', () => {
  let fixture: ComponentFixture<any>;
  let posthog: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [Angulartics2Posthog],
    });

    window.posthog = posthog = {
      capture: jasmine.createSpy('capture'),
      identify: jasmine.createSpy('identify'),
      alias: jasmine.createSpy('alias'),
      group: jasmine.createSpy('group'),
    };

    const provider: Angulartics2Posthog = TestBed.inject(Angulartics2Posthog);
    provider.startTracking();
  });

  it('should track pages', fakeAsync(
    inject(
      [Angulartics2, Angulartics2Posthog],
      (angulartics2: Angulartics2, angulartics2Posthog: Angulartics2Posthog) => {
        fixture = createRoot(RootCmp);
        angulartics2.pageTrack.next({ path: '/abc' });
        advance(fixture);
        expect(posthog.capture).toHaveBeenCalledWith('Page Viewed', {
          page: '/abc',
        });
      },
    ),
  ));

  it('should track events', fakeAsync(
    inject(
      [Angulartics2, Angulartics2Posthog],
      (angulartics2: Angulartics2, angulartics2Posthog: Angulartics2Posthog) => {
        fixture = createRoot(RootCmp);
        angulartics2.eventTrack.next({
          action: 'do',
          properties: { category: 'cat' },
        });
        advance(fixture);
        expect(posthog.capture).toHaveBeenCalledWith('do', { category: 'cat' });
      },
    ),
  ));

  it('should set username', fakeAsync(
    inject(
      [Angulartics2, Angulartics2Posthog],
      (angulartics2: Angulartics2, angulartics2Posthog: Angulartics2Posthog) => {
        fixture = createRoot(RootCmp);
        angulartics2.setUsername.next('testUser');
        advance(fixture);
        expect(posthog.identify).toHaveBeenCalledWith('testUser');
      },
    ),
  ));

  it('should set user properties', fakeAsync(
    inject(
      [Angulartics2, Angulartics2Posthog],
      (angulartics2: Angulartics2, angulartics2Posthog: Angulartics2Posthog) => {
        fixture = createRoot(RootCmp);
        angulartics2.setUserProperties.next({
          distinct_id: '1',
          firstName: 'John',
          lastName: 'Doe',
        });
        advance(fixture);
        expect(posthog.identify).toHaveBeenCalledWith('1', {
          distinct_id: '1',
          firstName: 'John',
          lastName: 'Doe',
        });
      },
    ),
  ));

  it('should set user properties once', fakeAsync(
    inject(
      [Angulartics2, Angulartics2Posthog],
      (angulartics2: Angulartics2, angulartics2Posthog: Angulartics2Posthog) => {
        fixture = createRoot(RootCmp);
        angulartics2.setUserPropertiesOnce.next({
          distinct_id: '1',
          firstName: 'John',
          lastName: 'Doe',
        });
        advance(fixture);
        expect(posthog.capture).toHaveBeenCalledWith('Set User Properties Once', {
          $set_once: {
            distinct_id: '1',
            firstName: 'John',
            lastName: 'Doe',
          }
        });
      },
    ),
  ));

  it('should set super properties', fakeAsync(
    inject(
      [Angulartics2, Angulartics2Posthog],
      (angulartics2: Angulartics2, angulartics2Posthog: Angulartics2Posthog) => {
        fixture = createRoot(RootCmp);
        angulartics2.setSuperProperties.next({
          distinct_id: '1',
          firstName: 'John',
          lastName: 'Doe',
        });
        advance(fixture);
        expect(posthog.capture).toHaveBeenCalledWith('Set Super Properties', {
          $set: {
            distinct_id: '1',
            firstName: 'John',
            lastName: 'Doe',
          }
        });
      },
    ),
  ));

  it('should set super properties once', fakeAsync(
    inject(
      [Angulartics2, Angulartics2Posthog],
      (angulartics2: Angulartics2, angulartics2Posthog: Angulartics2Posthog) => {
        fixture = createRoot(RootCmp);
        angulartics2.setSuperPropertiesOnce.next({
          distinct_id: '1',
          firstName: 'John',
          lastName: 'Doe',
        });
        advance(fixture);
        expect(posthog.capture).toHaveBeenCalledWith('Set Super Properties Once', {
          $set_once: {
            distinct_id: '1',
            firstName: 'John',
            lastName: 'Doe',
          }
        });
      },
    ),
  ));

  it('should set alias', fakeAsync(
    inject(
      [Angulartics2, Angulartics2Posthog],
      (angulartics2: Angulartics2, angulartics2Posthog: Angulartics2Posthog) => {
        fixture = createRoot(RootCmp);
        angulartics2.setAlias.next('testAlias');
        advance(fixture);
        expect(posthog.alias).toHaveBeenCalledWith('testAlias');
      },
    ),
  ));

  it('should set group properties', fakeAsync(
    inject(
      [Angulartics2, Angulartics2Posthog],
      (angulartics2: Angulartics2, angulartics2Posthog: Angulartics2Posthog) => {
        fixture = createRoot(RootCmp);
        angulartics2Posthog.setGroup('company', '123', { name: 'Company name' });
        advance(fixture);
        expect(posthog.group).toHaveBeenCalledWith('company', '123', { name: 'Company name' });
      }
    )
  ))
});
