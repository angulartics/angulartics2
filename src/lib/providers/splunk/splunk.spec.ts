import {
  fakeAsync,
  inject,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { Angulartics2 } from 'angulartics2';
import { advance, createRoot, RootCmp, TestModule } from '../../test.mocks';
import { Angulartics2Splunk } from './splunk';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

describe('Angulartics2Splunk', () => {

  let fixture: ComponentFixture<any>;
  let sp: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [Angulartics2Splunk],
    });

    window.sp = sp = {
      pageview: jasmine.createSpy('pageview'),
      track: jasmine.createSpy('track')
    };

    const provider: Angulartics2Splunk = TestBed.inject(Angulartics2Splunk);
    provider.startTracking();
  });

  it('should track pages',
    fakeAsync(inject([Angulartics2, Angulartics2Splunk],
      (angulartics2: Angulartics2, angulartics2Splunk: Angulartics2Splunk) => {
        fixture = createRoot(RootCmp);
        angulartics2.pageTrack.next({ path: '/abc' });
        advance(fixture);
        expect(sp.pageview).toHaveBeenCalledWith('/abc');
      }),
    ),
  );

  it('should track events',
    fakeAsync(inject([Angulartics2, Angulartics2Splunk],
      (angulartics2: Angulartics2, angulartics2Splunk: Angulartics2Splunk) => {
        fixture = createRoot(RootCmp);
        angulartics2.eventTrack.next({ action: 'do', properties: { category: 'cat' } });
        advance(fixture);
        expect(sp.track).toHaveBeenCalledWith('do', {
          category: 'cat',
        });
      }),
    ),
  );
});
