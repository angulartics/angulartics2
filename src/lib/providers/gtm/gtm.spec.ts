import { fakeAsync, inject, ComponentFixture, TestBed } from '@angular/core/testing';

import { Angulartics2 } from 'angulartics2';
import { advance, createRoot, RootCmp, TestModule } from '../../test.mocks';
import { Angulartics2GoogleTagManager } from './gtm';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

describe('Angulartics2GoogleTagManager', () => {
  let dataLayer: any;
  let fixture: ComponentFixture<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [Angulartics2GoogleTagManager],
    });

    window.dataLayer = dataLayer = [];
    const provider: Angulartics2GoogleTagManager = TestBed.inject(Angulartics2GoogleTagManager);
    provider.startTracking();
  });

  it('should track pages',
    fakeAsync(inject([Angulartics2, Angulartics2GoogleTagManager],
      (angulartics2: Angulartics2, angulartics2GoogleTagManager: Angulartics2GoogleTagManager) => {
        fixture = createRoot(RootCmp);
        angulartics2.pageTrack.next({ path: '/abc' });
        advance(fixture);
        expect(dataLayer).toContain({
          event: 'Page View',
          'content-name': '/abc',
          userId: null,
        });
      },
    )),
  );

  it('should track events',
    fakeAsync(inject([Angulartics2, Angulartics2GoogleTagManager],
      (angulartics2: Angulartics2, angulartics2GoogleTagManager: Angulartics2GoogleTagManager) => {
        fixture = createRoot(RootCmp);
        angulartics2.eventTrack.next({ action: 'do', properties: { category: 'cat', gtmCustom: { customKey: 'customValue' } } });
        advance(fixture);
        expect(dataLayer).toContain({
          event: 'interaction',
          target: 'cat',
          action: 'do',
          customKey: 'customValue',
          label: undefined,
          value: undefined,
          interactionType: undefined,
          userId: null,
        });
      }
    )),
  );

  it('should track exceptions',
    fakeAsync(inject([Angulartics2, Angulartics2GoogleTagManager],
      (angulartics2: Angulartics2, angulartics2GoogleTagManager: Angulartics2GoogleTagManager) => {
        fixture = createRoot(RootCmp);
        angulartics2.exceptionTrack.next({ appId: 'app', appName: 'Test App', appVersion: '0.1' });
        advance(fixture);
        expect(dataLayer).toContain({
          event: 'interaction',
          target: 'Exception',
          action: 'Exception thrown for Test App <app@0.1>',
          label: undefined,
          value: undefined,
          interactionType: undefined,
          userId: null,
        });
      }
    )),
  );

  it('should set username',
    fakeAsync(inject([Angulartics2, Angulartics2GoogleTagManager],
      (angulartics2: Angulartics2, angulartics2GoogleTagManager: Angulartics2GoogleTagManager) => {
        fixture = createRoot(RootCmp);
        angulartics2.setUsername.next('testuser');
        advance(fixture);
        expect(angulartics2.settings.gtm.userId).toBe('testuser');
      }
    )),
  );

});
