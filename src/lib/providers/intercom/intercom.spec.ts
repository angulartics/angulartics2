import {
  fakeAsync,
  inject,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { Angulartics2 } from 'angulartics2';
import { advance, createRoot, RootCmp, TestModule } from '../../test.mocks';
import { Angulartics2Intercom } from './intercom';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

describe('Angulartics2Intercom', () => {
  let fixture: ComponentFixture<any>;
  let Intercom: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
      ],
      providers: [
        Angulartics2Intercom,
      ]
    });

    window.Intercom = Intercom = jasmine.createSpy('Intercom');
    const provider: Angulartics2Intercom = TestBed.inject(Angulartics2Intercom);
    provider.startTracking();
  });

  it('should track pages',
    fakeAsync(inject([Angulartics2, Angulartics2Intercom],
      (angulartics2: Angulartics2, angulartics2Intercom: Angulartics2Intercom) => {
        fixture = createRoot(RootCmp);
        angulartics2.pageTrack.next({ path: '/abc' });
        advance(fixture);
        expect(Intercom).toHaveBeenCalledWith('trackEvent', 'Pageview', { url: '/abc' });
      }),
    ),
  );

  it('should track events',
    fakeAsync(inject([Angulartics2, Angulartics2Intercom],
      (angulartics2: Angulartics2, angulartics2Intercom: Angulartics2Intercom) => {
        fixture = createRoot(RootCmp);
        angulartics2.eventTrack.next({ action: 'do', properties: { category: 'cat' } });
        advance(fixture);
        expect(Intercom).toHaveBeenCalledWith('trackEvent', 'do', { category: 'cat' });
      }),
    ),
  );

  it('should set user properties',
    fakeAsync(inject([Angulartics2, Angulartics2Intercom],
      (angulartics2: Angulartics2, angulartics2Intercom: Angulartics2Intercom) => {
        fixture = createRoot(RootCmp);
        angulartics2.setUserProperties.next({ userId: '1', firstName: 'John', lastName: 'Doe' });
        advance(fixture);
        expect(Intercom).toHaveBeenCalledWith('boot', {
          userId: '1',
          user_id: '1',
          firstName: 'John',
          lastName: 'Doe',
        });
      }),
    ),
  );

  it('should set user properties if no userId present',
    fakeAsync(inject([Angulartics2, Angulartics2Intercom],
      (angulartics2: Angulartics2, angulartics2Intercom: Angulartics2Intercom) => {
        fixture = createRoot(RootCmp);
        angulartics2.setUserProperties.next({ firstName: 'John', lastName: 'Doe' });
        advance(fixture);
        expect(Intercom).toHaveBeenCalledWith('boot', {
          firstName: 'John',
          lastName: 'Doe',
        });
      }),
    ),
  );

  it('should set user properties once',
    fakeAsync(inject([Angulartics2, Angulartics2Intercom],
      (angulartics2: Angulartics2, angulartics2Intercom: Angulartics2Intercom) => {
        fixture = createRoot(RootCmp);
        angulartics2.setUserPropertiesOnce.next({
          userId: '1',
          firstName: 'John',
          lastName: 'Doe',
        });
        advance(fixture);
        expect(Intercom).toHaveBeenCalledWith('boot', {
          userId: '1',
          user_id: '1',
          firstName: 'John',
          lastName: 'Doe',
        });
      }),
    ),
  );

  it('should set user properties once if no userId present',
    fakeAsync(inject([Angulartics2, Angulartics2Intercom],
      (angulartics2: Angulartics2, angulartics2Intercom: Angulartics2Intercom) => {
        fixture = createRoot(RootCmp);
        angulartics2.setUserPropertiesOnce.next({
          firstName: 'John',
          lastName: 'Doe',
        });
        advance(fixture);
        expect(Intercom).toHaveBeenCalledWith('boot', {
          firstName: 'John',
          lastName: 'Doe',
        });
      }),
    ),
  );
});
