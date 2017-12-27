import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { fakeAsync, inject, ComponentFixture, TestBed } from '@angular/core/testing';

import { Angulartics2 } from 'angulartics2';
import { advance, createRoot, RootCmp, TestModule } from '../../test.mocks';
import { Angulartics2Hubspot } from './angulartics2-hubspot';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

describe('Angulartics2Hubspot', () => {
  let _hsq: Array<any>;
  let fixture: ComponentFixture<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule,
      ],
      providers: [
        { provide: Location, useClass: SpyLocation },
        Angulartics2Hubspot,
      ],
    });

    window._hsq = _hsq = [];
  });

  it('should track pages',
    fakeAsync(inject([Location, Angulartics2, Angulartics2Hubspot],
      (location: Location, angulartics2: Angulartics2, angulartics2Hubspot: Angulartics2Hubspot) => {
        fixture = createRoot(RootCmp);
        angulartics2.pageTrack.next({ path: '/abc', location: location });
        advance(fixture);
        expect(_hsq).toContain([ 'setPath', '/abc' ], [ 'trackPageView' ]);
      }),
    ),
  );

  it('should track events',
    fakeAsync(inject([Location, Angulartics2, Angulartics2Hubspot],
      (location: Location, angulartics2: Angulartics2, angulartics2Hubspot: Angulartics2Hubspot) => {
        fixture = createRoot(RootCmp);
        angulartics2.eventTrack.next({
          action: 'unused',
          properties: { id: 'Clicked Buy Now button', value: 20.5 },
        });
        advance(fixture);
        expect(_hsq).toContain(['trackEvent', { id: 'Clicked Buy Now button', value: 20.5 }]);
      }),
    ),
  );

  it('should set user properties',
    fakeAsync(inject([Location, Angulartics2, Angulartics2Hubspot],
      (location: Location, angulartics2: Angulartics2, angulartics2Hubspot: Angulartics2Hubspot) => {
        fixture = createRoot(RootCmp);
        angulartics2.setUserProperties.next({ email: 'george@jungle.com', id: '1234' });
        advance(fixture);
        expect(_hsq).toContain(['identify', { email: 'george@jungle.com', id: '1234' }]);
      }),
    ),
  );

});
