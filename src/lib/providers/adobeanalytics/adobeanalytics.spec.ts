import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { fakeAsync, inject, ComponentFixture, TestBed } from '@angular/core/testing';

import { Angulartics2 } from 'angulartics2';
import { advance, createRoot, RootCmp, TestModule } from '../../test.mocks';
import { Angulartics2AdobeAnalytics } from './adobeanalytics';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

@Injectable()
export class MockLocation extends SpyLocation {
  path() {
    return 'http://test.com/test#pagename';
  }
}

describe('Angulartics2AdobeAnalytics', () => {
  let s: any;
  let fixture: ComponentFixture<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [
        { provide: Location, useClass: MockLocation },
        Angulartics2AdobeAnalytics,
      ],
    });

    window.s = s = jasmine.createSpyObj('s', ['clearVars', 't', 'tl']);

    const provider: Angulartics2AdobeAnalytics = TestBed.inject(Angulartics2AdobeAnalytics);
    provider.startTracking();
  });

  it('should track pages',
    fakeAsync(inject([Angulartics2, Angulartics2AdobeAnalytics],
      (angulartics2: Angulartics2, angulartics2AdobeAnalytics: Angulartics2AdobeAnalytics) => {
        fixture = createRoot(RootCmp);
        angulartics2.pageTrack.next({ path: '/abc' });
        advance(fixture);
        expect(s.clearVars).toHaveBeenCalled();
        expect(s.t).toHaveBeenCalledWith({ pageName: '/abc' });
      },
    )),
  );

  it('should track events with no delay',
    fakeAsync(inject([Angulartics2, Angulartics2AdobeAnalytics],
      (angulartics2: Angulartics2, angulartics2AdobeAnalytics: Angulartics2AdobeAnalytics) => {
        fixture = createRoot(RootCmp);

        angulartics2.eventTrack.next({ action: 'do', properties: { disableDelay: true } });
        advance(fixture);
        expect(s.tl).toHaveBeenCalledWith(true, 'o', 'do');
        expect(window.s.pageName).toEqual('pagename');
  })));

  it('should track events with custom properties',
    fakeAsync(inject([Angulartics2, Angulartics2AdobeAnalytics],
      (angulartics2: Angulartics2, angulartics2AdobeAnalytics: Angulartics2AdobeAnalytics) => {
        fixture = createRoot(RootCmp);

        angulartics2.eventTrack.next({ action: 'do', properties: { category: 'cat', prop1: 'user1234' } });
        advance(fixture);
        expect(window.s.prop1).toEqual('user1234');
        expect(window.s.category).toEqual('cat');
        expect(s.tl).toHaveBeenCalledWith(jasmine.any(Object), 'o', 'do');
  })));

  it('should track events',
    fakeAsync(inject([Angulartics2, Angulartics2AdobeAnalytics],
      (angulartics2: Angulartics2, angulartics2AdobeAnalytics: Angulartics2AdobeAnalytics) => {
        fixture = createRoot(RootCmp);
        angulartics2.eventTrack.next({ action: 'do', properties: { category: 'cat' } });
        advance(fixture);
        expect(s.tl).toHaveBeenCalledWith(jasmine.any(Object), 'o', 'do');
        expect(window.s.pageName).toEqual('pagename');
  })));

  it('should set user porperties',
    fakeAsync(inject([Angulartics2, Angulartics2AdobeAnalytics],
      (angulartics2: Angulartics2, angulartics2AdobeAnalytics: Angulartics2AdobeAnalytics) => {
        fixture = createRoot(RootCmp);
        angulartics2.setUserProperties.next({ elet1: 'test' });
        advance(fixture);
        expect(s.elet1).toEqual('test');
        angulartics2.setUserProperties.next({ prop1: 'test' });
        advance(fixture);
        expect(s.prop1).toEqual('test');
      },
    )),
  );
});
