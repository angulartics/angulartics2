import { fakeAsync, inject, ComponentFixture, TestBed } from '@angular/core/testing';

import { Angulartics2 } from 'angulartics2';
import { advance, createRoot, RootCmp, TestModule } from '../../test.mocks';
import { Angulartics2Kissmetrics } from './kissmetrics';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

describe('Angulartics2Kissmetrics', () => {
  let _kmq: Array<any>;
  let fixture: ComponentFixture<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [Angulartics2Kissmetrics],
    });

    window._kmq = _kmq = [];
    const provider: Angulartics2Kissmetrics = TestBed.inject(Angulartics2Kissmetrics);
    provider.startTracking();
  });

  it('should track pages',
    fakeAsync(inject([Angulartics2, Angulartics2Kissmetrics],
      (angulartics2: Angulartics2, angulartics2Kissmetrics: Angulartics2Kissmetrics) => {
        fixture = createRoot(RootCmp);
        angulartics2.pageTrack.next({ path: '/abc' });
        advance(fixture);
        expect(_kmq).toContain(['record', 'Pageview', { Page: '/abc' }]);
      }),
    ),
  );

  it('should track events',
    fakeAsync(inject([Angulartics2, Angulartics2Kissmetrics],
      (angulartics2: Angulartics2, angulartics2Kissmetrics: Angulartics2Kissmetrics) => {
        fixture = createRoot(RootCmp);
        angulartics2.eventTrack.next({ action: 'do', properties: { category: 'cat' } });
        advance(fixture);
        expect(_kmq).toContain(['record', 'do', { category: 'cat' }]);
      }),
    ),
  );

  it('should set username',
    fakeAsync(inject([Angulartics2, Angulartics2Kissmetrics],
      (angulartics2: Angulartics2, angulartics2Kissmetrics: Angulartics2Kissmetrics) => {
        fixture = createRoot(RootCmp);
        angulartics2.setUsername.next('testUser');
        advance(fixture);
        expect(_kmq).toContain(['identify', 'testUser']);
      }),
    ),
  );

  it('should set user properties',
    fakeAsync(inject([Angulartics2, Angulartics2Kissmetrics],
      (angulartics2: Angulartics2, angulartics2Kissmetrics: Angulartics2Kissmetrics) => {
        fixture = createRoot(RootCmp);
        angulartics2.setUserProperties.next({ userId: '1', firstName: 'John', lastName: 'Doe' });
        advance(fixture);
        expect(_kmq).toContain(['set', { userId: '1', firstName: 'John', lastName: 'Doe' }]);
      }),
    ),
  );

});
