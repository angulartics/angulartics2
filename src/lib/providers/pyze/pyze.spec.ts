import { fakeAsync, inject, ComponentFixture, TestBed } from '@angular/core/testing';

import { advance, createRoot, RootCmp, TestModule } from '../../test.mocks';

import { Angulartics2 } from 'angulartics2';
import { Angulartics2Pyze } from './pyze';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

describe('Angulartics2Pyze', () => {
  let fixture: ComponentFixture<any>;
  let Pyze: any;
  let PyzeEvents: any;
  let PyzeIdentity: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [Angulartics2Pyze],
    });

    window.Pyze = Pyze = {
        postPageView: jasmine.createSpy('postPageView'),
    };
    window.PyzeEvents = PyzeEvents = {
        postCustomEventWithAttributes: jasmine.createSpy('postCustomEventWithAttributes'),
    };
    window.PyzeIdentity = PyzeIdentity = {
      setUserIdentifier: jasmine.createSpy('setUserIdentifier'),
      postTraits: jasmine.createSpy('postTraits'),
    };

    const provider: Angulartics2Pyze = TestBed.inject(Angulartics2Pyze);
    provider.startTracking();
  });

  it('should track pages',
    fakeAsync(inject([Angulartics2, Angulartics2Pyze],
      (angulartics2: Angulartics2, angulartics2Pyze: Angulartics2Pyze) => {
        fixture = createRoot(RootCmp);
        angulartics2.pageTrack.next({ path: '/one' });
        advance(fixture);
        expect(Pyze.postPageView).toHaveBeenCalledWith('Page Viewed', { page: '/one' });
      }),
    ),
  );

  it('should track events',
    fakeAsync(inject([Angulartics2, Angulartics2Pyze],
      (angulartics2: Angulartics2, angulartics2Pyze: Angulartics2Pyze) => {
        fixture = createRoot(RootCmp);
        angulartics2.eventTrack.next({ action: 'read', properties: { category: 'xyz' } });
        advance(fixture);
        expect(PyzeEvents.postCustomEventWithAttributes).toHaveBeenCalledWith('read', { category: 'xyz' });
      }),
    ),
  );

  it('should set user identifier',
  fakeAsync(inject([Angulartics2, Angulartics2Pyze],
    (angulartics2: Angulartics2, angulartics2Pyze: Angulartics2Pyze) => {
      fixture = createRoot(RootCmp);
      angulartics2.setUsername.next('testId');
      advance(fixture);
      expect(PyzeIdentity.setUserIdentifier).toHaveBeenCalledWith('testId');
    }),
  ),
  );

  it('should set user traits',
  fakeAsync(inject([Angulartics2, Angulartics2Pyze],
    (angulartics2: Angulartics2, angulartics2Pyze: Angulartics2Pyze) => {
      fixture = createRoot(RootCmp);
      angulartics2.setUserProperties.next({ userId: 'testId', firstName: 'Jess', lastName: 'Lobo' });
      advance(fixture);
      expect(PyzeIdentity.postTraits).toHaveBeenCalledWith({ userId: 'testId', firstName: 'Jess', lastName: 'Lobo' });
    }),
  ),
  );
});
