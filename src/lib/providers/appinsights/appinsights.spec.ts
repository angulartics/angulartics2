import { fakeAsync, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { Angulartics2 } from 'angulartics2';
import { advance, createRoot, RootCmp, TestModule } from '../../test.mocks';
import { Angulartics2AppInsights } from './appinsights';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare let window: any;

describe('Angulartics2AppInsights', () => {
  let appInsights: Microsoft.ApplicationInsights.IAppInsights;
  let fixture: ComponentFixture<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
        RouterTestingModule,
      ],
      providers: [
        Title,
        Angulartics2AppInsights,
      ],
    });

    window.appInsights = appInsights = jasmine.createSpyObj(
      'appInsights', [
        'trackPageView',
        'trackEvent',
        'trackException',
        'setAuthenticatedUserContext',
      ]);

    const provider: Angulartics2AppInsights = TestBed.inject(Angulartics2AppInsights);
    provider.startTracking();
  });

  it('should track pages',
    fakeAsync(inject([Angulartics2, Angulartics2AppInsights, Title],
      (angulartics2: Angulartics2, angulartics2AppInsights: Angulartics2AppInsights, title: Title) => {
        fixture = createRoot(RootCmp);
        const metrics = {};
        const dimensions = {};
        const loadTime = 123;
        spyOn(title, 'getTitle').and.returnValue('the title');
        angulartics2AppInsights.metrics = metrics;
        angulartics2AppInsights.dimensions = dimensions;
        angulartics2AppInsights.loadTime = loadTime;
        angulartics2.pageTrack.next({ path: '/abc' });
        advance(fixture);
        expect(appInsights.trackPageView).toHaveBeenCalledWith('the title', '/abc', metrics, dimensions, loadTime);
      }),
    ),
  );

  it('should track events',
    fakeAsync(inject([Angulartics2, Angulartics2AppInsights],
      (angulartics2: Angulartics2, angulartics2AppInsights: Angulartics2AppInsights) => {
        fixture = createRoot(RootCmp);
        const action = 'the action';
        const properties = {};
        const measurements = {};
        angulartics2AppInsights.measurements = measurements;
        angulartics2.eventTrack.next({
          action, properties
        });
        advance(fixture);
        expect(appInsights.trackEvent).toHaveBeenCalledWith(action, properties, measurements);
      }),
    ),
  );

  it('should track exceptions (string)',
    fakeAsync(inject([Angulartics2, Angulartics2AppInsights],
      (angulartics2: Angulartics2, angulartics2AppInsights: Angulartics2AppInsights) => {
        fixture = createRoot(RootCmp);
        const str = 'test string';
        angulartics2.exceptionTrack.next(str);
        advance(fixture);
        // @ts-expect-error
        expect(appInsights.trackException).toHaveBeenCalledWith(str);
      }),
    ),
  );

  it('should track exceptions (event)',
    fakeAsync(inject([Angulartics2, Angulartics2AppInsights],
      (angulartics2: Angulartics2, angulartics2AppInsights: Angulartics2AppInsights) => {
        fixture = createRoot(RootCmp);
        const event = { event: true };
        angulartics2.exceptionTrack.next({ event });
        advance(fixture);
        // @ts-expect-error
        expect(appInsights.trackException).toHaveBeenCalledWith(event);
      }),
    ),
  );

  it('should track exceptions (description)',
    fakeAsync(inject([Angulartics2, Angulartics2AppInsights],
      (angulartics2: Angulartics2, angulartics2AppInsights: Angulartics2AppInsights) => {
        fixture = createRoot(RootCmp);
        const description = 'test description';
        angulartics2.exceptionTrack.next({ description });
        advance(fixture);
        // @ts-expect-error
        expect(appInsights.trackException).toHaveBeenCalledWith(description);
      }),
    ),
  );

  it('should set userId in setAuthenticatedUserContext',
    fakeAsync(inject([Angulartics2, Angulartics2AppInsights],
      (angulartics2: Angulartics2, angulartics2AppInsights: Angulartics2AppInsights) => {
        fixture = createRoot(RootCmp);
        const userId = 'test_userId';
        angulartics2AppInsights.setUsername(userId);
        advance(fixture);
        expect(angulartics2.settings.appInsights.userId).toBe(userId);
        expect(appInsights.setAuthenticatedUserContext).toHaveBeenCalledWith(userId);
      }),
    ),
  );

  it('should set userId and accountId in setAuthenticatedUserContext',
    fakeAsync(inject([Angulartics2, Angulartics2AppInsights],
      (angulartics2: Angulartics2, angulartics2AppInsights: Angulartics2AppInsights) => {
        fixture = createRoot(RootCmp);
        const userId = 'test_userId';
        const accountId = 'test_accountId';
        angulartics2AppInsights.setUserProperties({ userId, accountId });
        advance(fixture);
        expect(angulartics2.settings.appInsights.userId).toBe(userId);
        expect(appInsights.setAuthenticatedUserContext).toHaveBeenCalledWith(userId, accountId);
      }),
    ),
  );


  it('should user existing userId and set accountId in setAuthenticatedUserContext',
    fakeAsync(inject([Angulartics2, Angulartics2AppInsights],
      (angulartics2: Angulartics2, angulartics2AppInsights: Angulartics2AppInsights) => {
        fixture = createRoot(RootCmp);
        const userId = 'test_userId';
        const accountId = 'test_accountId';
        angulartics2AppInsights.setUsername(userId);
        advance(fixture);
        expect(angulartics2.settings.appInsights.userId).toBe(userId);
        angulartics2AppInsights.setUserProperties({ accountId });
        advance(fixture);
        expect(appInsights.setAuthenticatedUserContext).toHaveBeenCalledWith(userId, accountId);
      }),
    ),
  );

  it('should set the start time on start',
    fakeAsync(inject([Angulartics2, Angulartics2AppInsights],
      (angulartics2: Angulartics2, angulartics2AppInsights: Angulartics2AppInsights) => {
        angulartics2AppInsights.startTimer();
        expect(angulartics2AppInsights.loadStartTime).toBeLessThanOrEqual(Date.now());
        expect(angulartics2AppInsights.loadTime).toBe(null);
      }),
    ),
  );

  it('should set the total time on stop',
    fakeAsync(inject([Angulartics2, Angulartics2AppInsights],
      (angulartics2: Angulartics2, angulartics2AppInsights: Angulartics2AppInsights) => {
        angulartics2AppInsights.loadStartTime = Date.now() - 1000;
        angulartics2AppInsights.stopTimer();
        // 50ms time difference for testing to ensure timing is correct
        expect(angulartics2AppInsights.loadTime).toBeLessThanOrEqual(1150);
        expect(angulartics2AppInsights.loadTime).toBeGreaterThanOrEqual(1000);
        expect(angulartics2AppInsights.loadStartTime).toBe(null);
      }),
    ),
  );
});
