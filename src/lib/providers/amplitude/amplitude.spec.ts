import { fakeAsync, inject, ComponentFixture, TestBed } from '@angular/core/testing';

import { Angulartics2 } from 'angulartics2';
import { advance, createRoot, RootCmp, TestModule } from '../../test.mocks';
import { Angulartics2Amplitude } from './amplitude';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

describe('Angulartics2Amplitude', () => {
  let fixture: ComponentFixture<any>;
  let amplitudeMock: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
      ],
      providers: [
        Angulartics2Amplitude,
      ]
    });

    amplitudeMock = {
      logEvent: jasmine.createSpy('Amplitude.logEvent'),
      setUserProperties: jasmine.createSpy('Amplitude.setUserProperties'),
      setUserId: jasmine.createSpy('Amplitude.setUserId')
    };

    window.amplitude = {
      getInstance() {
        return amplitudeMock;
      }
    };

    const provider: Angulartics2Amplitude = TestBed.inject(Angulartics2Amplitude);
    provider.startTracking();
  });

  it('should track pages',
    fakeAsync(inject([Angulartics2, Angulartics2Amplitude],
      (angulartics2: Angulartics2, angulartics2Amplitude: Angulartics2Amplitude) => {
        fixture = createRoot(RootCmp);
        angulartics2.pageTrack.next({ path: '/abc' });
        advance(fixture);
        expect(amplitudeMock.logEvent).toHaveBeenCalledWith('Pageview', { url: '/abc' });
      }),
    ),
  );

  it('should track events',
    fakeAsync(inject([Angulartics2, Angulartics2Amplitude],
      (angulartics2: Angulartics2, angulartics2Amplitude: Angulartics2Amplitude) => {
        fixture = createRoot(RootCmp);
        angulartics2.eventTrack.next({ action: 'do', properties: { category: 'cat' } });
        advance(fixture);
        expect(amplitudeMock.logEvent).toHaveBeenCalledWith('do', { category: 'cat' });
      }),
    ),
  );

  it('should set user properties',
    fakeAsync(inject([Angulartics2, Angulartics2Amplitude],
      (angulartics2: Angulartics2, angulartics2Amplitude: Angulartics2Amplitude) => {
        fixture = createRoot(RootCmp);
        angulartics2.setUserProperties.next({ userId: '1', firstName: 'John', lastName: 'Doe' });
        advance(fixture);
        expect(amplitudeMock.setUserProperties).toHaveBeenCalledWith({
          userId: '1',
          firstName: 'John',
          lastName: 'Doe',
        });
      }),
    ),
  );

  it('should set user properties once',
    fakeAsync(inject([Angulartics2, Angulartics2Amplitude],
      (angulartics2: Angulartics2, angulartics2Amplitude: Angulartics2Amplitude) => {
        fixture = createRoot(RootCmp);
        angulartics2.setUserPropertiesOnce.next({ userId: '1', firstName: 'John', lastName: 'Doe' });
        advance(fixture);
        expect(amplitudeMock.setUserProperties).toHaveBeenCalledWith({
          userId: '1',
          firstName: 'John',
          lastName: 'Doe',
        });
      }),
    ),
  );

  it('should set user name',
    fakeAsync(inject([Angulartics2, Angulartics2Amplitude],
      (angulartics2: Angulartics2, angulartics2Amplitude: Angulartics2Amplitude) => {
        fixture = createRoot(RootCmp);
        angulartics2.setUsername.next('John');
        advance(fixture);
        expect(amplitudeMock.setUserId).toHaveBeenCalledWith('John');
      }),
    ),
  );
});
