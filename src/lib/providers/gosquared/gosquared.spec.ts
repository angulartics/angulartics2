import {
  fakeAsync,
  inject,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { Angulartics2 } from 'angulartics2';
import { advance, createRoot, RootCmp, TestModule } from '../../test.mocks';
import { Angulartics2GoSquared } from './gosquared';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

describe('Angulartics2GoSquared', () => {
  let fixture: ComponentFixture<any>;
  let _gs: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [Angulartics2GoSquared]
    });

    window._gs = _gs = jasmine.createSpy('_gs');
    const provider: Angulartics2GoSquared = TestBed.inject(Angulartics2GoSquared);
    provider.startTracking();
  });

  it('should track pages', fakeAsync(
    inject(
      [Angulartics2, Angulartics2GoSquared],
      (
        angulartics2: Angulartics2,
        angulartics2GoSquared: Angulartics2GoSquared
      ) => {
        fixture = createRoot(RootCmp);
        angulartics2.pageTrack.next({ path: '/abc' });
        advance(fixture);
        expect(_gs).toHaveBeenCalledWith('track', '/abc');
      }
    )
  ));

  it('should track events', fakeAsync(
    inject(
      [Angulartics2, Angulartics2GoSquared],
      (
        angulartics2: Angulartics2,
        angulartics2GoSquared: Angulartics2GoSquared
      ) => {
        fixture = createRoot(RootCmp);
        angulartics2.eventTrack.next({
          action: 'do',
          properties: { category: 'cat' }
        });
        advance(fixture);
        expect(_gs).toHaveBeenCalledWith('event', 'do', {
          category: 'cat'
        });
      }
    )
  ));

  it('should set user properties', fakeAsync(
    inject(
      [Angulartics2, Angulartics2GoSquared],
      (
        angulartics2: Angulartics2,
        angulartics2GoSquared: Angulartics2GoSquared
      ) => {
        fixture = createRoot(RootCmp);
        angulartics2.setUserProperties.next({
          id: '1',
          email: '1',
          first_name: 'John',
          last_name: 'Doe'
        });
        advance(fixture);
        expect(_gs).toHaveBeenCalledWith('identify', {
          id: '1',
          email: '1',
          first_name: 'John',
          last_name: 'Doe'
        });
      }
    )
  ));

  it('should set user properties once', fakeAsync(
    inject(
      [Angulartics2, Angulartics2GoSquared],
      (
        angulartics2: Angulartics2,
        angulartics2GoSquared: Angulartics2GoSquared
      ) => {
        fixture = createRoot(RootCmp);
        angulartics2.setUserPropertiesOnce.next({
          id: '1',
          email: '1',
          first_name: 'John',
          last_name: 'Doe'
        });
        advance(fixture);
        expect(_gs).toHaveBeenCalledWith('identify', {
          id: '1',
          email: '1',
          first_name: 'John',
          last_name: 'Doe'
        });
      }
    )
  ));
});
