import { fakeAsync, inject, ComponentFixture, TestBed } from '@angular/core/testing';

import { advance, createRoot, RootCmp, TestModule } from '../../test.mocks';

import { Angulartics2 } from 'angulartics2';
import { Angulartics2Mixpanel } from './mixpanel';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

describe('Angulartics2Mixpanel', () => {
  let fixture: ComponentFixture<any>;
  let mixpanel: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [Angulartics2Mixpanel],
    });

    window.mixpanel = mixpanel = {
      track: jasmine.createSpy('track'),
      identify: jasmine.createSpy('identify'),
      people: {
        set: jasmine.createSpy('people.set'),
        set_once: jasmine.createSpy('people.set_once'),
      },
      register: jasmine.createSpy('register'),
      register_once: jasmine.createSpy('register_once'),
      alias: jasmine.createSpy('alias'),
    };

    const provider: Angulartics2Mixpanel = TestBed.inject(Angulartics2Mixpanel);
    provider.startTracking();
  });

  it('should track pages',
    fakeAsync(inject([Angulartics2, Angulartics2Mixpanel],
      (angulartics2: Angulartics2, angulartics2Mixpanel: Angulartics2Mixpanel) => {
        fixture = createRoot(RootCmp);
        angulartics2.pageTrack.next({ path: '/abc' });
        advance(fixture);
        expect(mixpanel.track).toHaveBeenCalledWith('Page Viewed', { page: '/abc' });
      }),
    ),
  );

  it('should track events',
    fakeAsync(inject([Angulartics2, Angulartics2Mixpanel],
      (angulartics2: Angulartics2, angulartics2Mixpanel: Angulartics2Mixpanel) => {
        fixture = createRoot(RootCmp);
        angulartics2.eventTrack.next({ action: 'do', properties: { category: 'cat' } });
        advance(fixture);
        expect(mixpanel.track).toHaveBeenCalledWith('do', { category: 'cat' });
      }),
    ),
  );


  it('should set username',
    fakeAsync(inject([Angulartics2, Angulartics2Mixpanel],
      (angulartics2: Angulartics2, angulartics2Mixpanel: Angulartics2Mixpanel) => {
        fixture = createRoot(RootCmp);
        angulartics2.setUsername.next('testUser');
        advance(fixture);
        expect(mixpanel.identify).toHaveBeenCalledWith('testUser');
      }),
    ),
  );

  it('should set user properties',
    fakeAsync(inject([Angulartics2, Angulartics2Mixpanel],
      (angulartics2: Angulartics2, angulartics2Mixpanel: Angulartics2Mixpanel) => {
        fixture = createRoot(RootCmp);
        angulartics2.setUserProperties.next({ userId: '1', firstName: 'John', lastName: 'Doe' });
        advance(fixture);
        expect(mixpanel.people.set).toHaveBeenCalledWith({
          userId: '1',
          firstName: 'John',
          lastName: 'Doe',
        });
      }),
    ),
  );

  it('should set user properties once',
    fakeAsync(inject([Angulartics2, Angulartics2Mixpanel],
      (angulartics2: Angulartics2, angulartics2Mixpanel: Angulartics2Mixpanel) => {
        fixture = createRoot(RootCmp);
        angulartics2.setUserPropertiesOnce.next({
          userId: '1',
          firstName: 'John',
          lastName: 'Doe',
        });
        advance(fixture);
        expect(mixpanel.people.set_once).toHaveBeenCalledWith({
          userId: '1',
          firstName: 'John',
          lastName: 'Doe',
        });
      }),
    ),
  );

  it('should set super properties',
    fakeAsync(inject([Angulartics2, Angulartics2Mixpanel],
      (angulartics2: Angulartics2, angulartics2Mixpanel: Angulartics2Mixpanel) => {
        fixture = createRoot(RootCmp);
        angulartics2.setSuperProperties.next({
          userId: '1',
          firstName: 'John',
          lastName: 'Doe',
        });
        advance(fixture);
        expect(mixpanel.register).toHaveBeenCalledWith({
          userId: '1',
          firstName: 'John',
          lastName: 'Doe',
        });
      }),
    ),
  );

  it('should set super properties once',
    fakeAsync(inject([Angulartics2, Angulartics2Mixpanel],
      (angulartics2: Angulartics2, angulartics2Mixpanel: Angulartics2Mixpanel) => {
        fixture = createRoot(RootCmp);
        angulartics2.setSuperPropertiesOnce.next({
          userId: '1',
          firstName: 'John',
          lastName: 'Doe',
        });
        advance(fixture);
        expect(mixpanel.register_once).toHaveBeenCalledWith({
          userId: '1',
          firstName: 'John',
          lastName: 'Doe',
        });
      }),
    ),
  );

  it('should set alias',
    fakeAsync(inject([Angulartics2, Angulartics2Mixpanel],
      (angulartics2: Angulartics2, angulartics2Mixpanel: Angulartics2Mixpanel) => {
        fixture = createRoot(RootCmp);
        angulartics2.setAlias.next('testAlias');
        advance(fixture);
        expect(mixpanel.alias).toHaveBeenCalledWith('testAlias');
      }),
    ),
  );

});
