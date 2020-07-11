import {
  fakeAsync,
  inject,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { advance, createRoot, RootCmp, TestModule } from '../../test.mocks';

import { Angulartics2 } from 'angulartics2';
import { Angulartics2BaiduAnalytics } from './baidu';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

describe('Angulartics2BaiduAnalytics', () => {
  let _hmt: Array<any>;
  let fixture: ComponentFixture<any>;

  beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestModule],
        providers: [Angulartics2BaiduAnalytics],
      });

      window._hmt = _hmt = [];

      const provider: Angulartics2BaiduAnalytics = TestBed.inject(Angulartics2BaiduAnalytics);
      provider.startTracking();
    });

  it('should track pages',
    fakeAsync(inject([Angulartics2, Angulartics2BaiduAnalytics],
      (angulartics2: Angulartics2, angulartics2BaiduAnalytics: Angulartics2BaiduAnalytics) => {
        fixture = createRoot(RootCmp);
        angulartics2.pageTrack.next({ path: '/abc' });
        advance(fixture);
        expect(_hmt).toContain(['_trackPageview', '/abc']);
      }),
    ),
  );

  it('should track events',
    fakeAsync(inject([Angulartics2, Angulartics2BaiduAnalytics],
      (angulartics2: Angulartics2, angulartics2BaiduAnalytics: Angulartics2BaiduAnalytics) => {
        fixture = createRoot(RootCmp);
        angulartics2.eventTrack.next({
          action: 'do',
          properties: {
            category: 'cat',
            opt_label: 'label',
            opt_value: 'value',
          },
        });
        advance(fixture);
        expect(_hmt).toContain(['_trackEvent', 'cat', 'do', 'label', 'value']);
      }),
    ),
  );

  it('should set username',
    fakeAsync(inject([Angulartics2, Angulartics2BaiduAnalytics],
      (angulartics2: Angulartics2, angulartics2BaiduAnalytics: Angulartics2BaiduAnalytics) => {
        fixture = createRoot(RootCmp);
        angulartics2.setUsername.next('testUser');
        advance(fixture);
        expect(_hmt).toContain(['_setCustomVar', 1, 'identity', 'testUser']);
      }),
    ),
  );

  it('should set user properties',
    fakeAsync(inject([Angulartics2, Angulartics2BaiduAnalytics],
      (angulartics2: Angulartics2, angulartics2BaiduAnalytics: Angulartics2BaiduAnalytics) => {
        fixture = createRoot(RootCmp);
        angulartics2.setUserProperties.next({
          userId: '1',
          firstName: 'John',
          lastName: 'Doe',
        });
        advance(fixture);
        expect(_hmt).toContain([
          '_setCustomVar',
          2,
          'user',
          '{"userId":"1","firstName":"John","lastName":"Doe"}',
        ]);
      }),
    ),
  );

});
