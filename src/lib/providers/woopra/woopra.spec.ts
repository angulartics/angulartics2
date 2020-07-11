import {
  fakeAsync,
  inject,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { Angulartics2 } from 'angulartics2';
import { advance, createRoot, RootCmp, TestModule } from '../../test.mocks';
import { Angulartics2Woopra } from './woopra';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

describe('Angulartics2Woopra', () => {
  let fixture: ComponentFixture<any>;
  let woopra: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [Angulartics2Woopra],
    });

    window.woopra = woopra = {
      track: jasmine.createSpy('track'),
      identify: jasmine.createSpy('identify'),
    };

    const provider: Angulartics2Woopra = TestBed.inject(Angulartics2Woopra);
    provider.startTracking();
  });

  it('should track pages',
    fakeAsync(inject([Angulartics2, Angulartics2Woopra],
      (angulartics2: Angulartics2, angulartics2Woopra: Angulartics2Woopra) => {
        fixture = createRoot(RootCmp);
        angulartics2.pageTrack.next({path: '/abc' });
        advance(fixture);
        expect(woopra.track).toHaveBeenCalledWith('pv', {url: '/abc'});
      }),
    ),
  );

  it('should track events',
    fakeAsync(inject([Angulartics2, Angulartics2Woopra],
      (angulartics2: Angulartics2, angulartics2Woopra: Angulartics2Woopra) => {
        fixture = createRoot(RootCmp);
        angulartics2.eventTrack.next({
          action: 'payment',
          properties: {
            amount: '49.95',
            currency: 'USD',
          },
        });
        advance(fixture);
        expect(woopra.track).toHaveBeenCalledWith('payment', {
          amount: '49.95',
          currency: 'USD',
        });
      }),
    ),
  );

  it('should set user properties',
    fakeAsync(inject([Angulartics2, Angulartics2Woopra],
      (angulartics2: Angulartics2, angulartics2Woopra: Angulartics2Woopra) => {
        fixture = createRoot(RootCmp);
        angulartics2.setUserProperties.next({email: 'test@test.com', name: 'John Doe', company: 'Test Co'});
        advance(fixture);
        expect(woopra.identify).toHaveBeenCalledWith({
          email: 'test@test.com',
          name: 'John Doe',
          company: 'Test Co'
        });
      }),
    ),
  );
});
