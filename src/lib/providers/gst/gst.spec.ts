import {
  fakeAsync,
  inject,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { Angulartics2 } from 'angulartics2';
import { advance, createRoot, RootCmp, TestModule } from '../../test.mocks';
import { Angulartics2GoogleGlobalSiteTag } from './gst';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

describe('Angulartics2GoogleGlobalSiteTag', () => {
  let gtag: any;
  let ga: any;
  let fixture: ComponentFixture<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [Angulartics2GoogleGlobalSiteTag],
    });

    window.gtag = gtag = jasmine.createSpy('gtag');
    window.ga = ga = (callback) => callback();
    window.ga.getAll = ga.getAll = () => {
      return {
        forEach(callback) {
          const tracker = {
            get(value) {
              return 'UA-111111111-1';
            },
          };
          callback(tracker);
        },
      };
    };
  });

  it('should track pages', fakeAsync(
    inject(
      [Angulartics2, Angulartics2GoogleGlobalSiteTag], (
        angulartics2: Angulartics2,
        angulartics2GoogleGlobalSiteTag: Angulartics2GoogleGlobalSiteTag,
      ) => {
        fixture = createRoot(RootCmp);
        angulartics2GoogleGlobalSiteTag.startTracking();
        angulartics2.pageTrack.next({ path: '/abc' });
        advance(fixture);
        expect(gtag.calls.count()).toEqual(1);
        expect(gtag).toHaveBeenCalledWith('config', 'UA-111111111-1', {
          page_path: '/abc',
          page_location: 'http://localhost:9876/abc'
        });
      },
    ),
  ));

  it('should track events', fakeAsync(
    inject(
      [Angulartics2, Angulartics2GoogleGlobalSiteTag], (
        angulartics2: Angulartics2,
        angulartics2GoogleGlobalSiteTag: Angulartics2GoogleGlobalSiteTag,
      ) => {
        fixture = createRoot(RootCmp);
        angulartics2GoogleGlobalSiteTag.startTracking();
        angulartics2.eventTrack.next({
          action: 'do',
          properties: {
            value: 1,
            label: 'abc',
            gstCustom: {
              customKey: 'customValue',
            },
          },
        });
        advance(fixture);
        expect(gtag).toHaveBeenCalledWith('event', 'do', {
          event_category: 'interaction',
          event_label: 'abc',
          value: 1,
          non_interaction: undefined,
          customKey: 'customValue',
        });
      },
    ),
  ));

  it('should track exceptions', fakeAsync(
    inject([Angulartics2, Angulartics2GoogleGlobalSiteTag], (
      angulartics2: Angulartics2,
      angulartics2GoogleGlobalSiteTag: Angulartics2GoogleGlobalSiteTag,
    ) => {
      fixture = createRoot(RootCmp);
      angulartics2GoogleGlobalSiteTag.startTracking();
      angulartics2.exceptionTrack.next({
        description: 'bugger',
        gstCustom: { appId: 'app', appName: 'Test App', appVersion: '0.1' },
      });
      advance(fixture);
      expect(gtag).toHaveBeenCalledWith('event', 'exception', {
        event_category: 'interaction',
        event_label: undefined,
        value: undefined,
        non_interaction: undefined,
        description: 'bugger',
        fatal: true,
        appId: 'app',
        appName: 'Test App',
        appVersion: '0.1',
      });
    },
    ),
  ));

  it('should track user timings', fakeAsync(
    inject([Angulartics2, Angulartics2GoogleGlobalSiteTag], (
      angulartics2: Angulartics2,
      angulartics2GoogleGlobalSiteTag: Angulartics2GoogleGlobalSiteTag,
    ) => {
      fixture = createRoot(RootCmp);
      angulartics2GoogleGlobalSiteTag.startTracking();
      angulartics2.userTimings.next({
        timingVar: 'load',
        timingValue: 33,
        timingCategory: 'JS Dependencies',
        timingLabel: 'Google CDN'
      });
      advance(fixture);
      expect(gtag).toHaveBeenCalledWith('event', 'timing_complete', {
        name: 'load',
        value: 33,
        event_category: 'JS Dependencies',
        event_label: 'Google CDN'
      });
    },
    ),
  ));

  it('should set properties', fakeAsync(
    inject([Angulartics2, Angulartics2GoogleGlobalSiteTag], (
      angulartics2: Angulartics2,
      angulartics2GoogleGlobalSiteTag: Angulartics2GoogleGlobalSiteTag,
    ) => {
      fixture = createRoot(RootCmp);
      angulartics2GoogleGlobalSiteTag.startTracking();
      angulartics2.setUserProperties.next({
        custom_dimension: 'some value'
      });
      advance(fixture);
      expect(gtag.calls.count()).toEqual(1);
      expect(gtag).toHaveBeenCalledWith('set', {
        custom_dimension: 'some value'
      });
    },
    ),
  ));

  it('userProperties should accumulate', fakeAsync(
    inject([Angulartics2, Angulartics2GoogleGlobalSiteTag], (
      angulartics2: Angulartics2,
      angulartics2GoogleGlobalSiteTag: Angulartics2GoogleGlobalSiteTag,
    ) => {
      fixture = createRoot(RootCmp);
      angulartics2GoogleGlobalSiteTag.startTracking();
      angulartics2.setUserProperties.next({
        custom_dimension: 'some value'
      });
      angulartics2.setUserProperties.next({
        other_dimension: 'other value'
      });
      advance(fixture);
      expect(gtag.calls.count()).toEqual(2);
      expect(gtag).toHaveBeenCalledWith('set', {
        custom_dimension: 'some value',
        other_dimension: 'other value'
      });
    },
    ),
  ));

  it('userProperties should allow item removal', fakeAsync(
    inject([Angulartics2, Angulartics2GoogleGlobalSiteTag], (
      angulartics2: Angulartics2,
      angulartics2GoogleGlobalSiteTag: Angulartics2GoogleGlobalSiteTag,
    ) => {
      fixture = createRoot(RootCmp);
      angulartics2GoogleGlobalSiteTag.startTracking();
      angulartics2.setUserProperties.next({
        custom_dimension: 'some value'
      });
      angulartics2.setUserProperties.next({
        custom_dimension: undefined
      });
      advance(fixture);
      expect(gtag.calls.count()).toEqual(2);
      expect(gtag).toHaveBeenCalledWith('set', {});
    },
    ),
  ));

  it('string value should be transformed into integer', fakeAsync(
    inject([Angulartics2, Angulartics2GoogleGlobalSiteTag], (
      angulartics2: Angulartics2,
      angulartics2GoogleGlobalSiteTag: Angulartics2GoogleGlobalSiteTag,
    ) => {
      fixture = createRoot(RootCmp);
      angulartics2GoogleGlobalSiteTag.startTracking();
      angulartics2.eventTrack.next({
        action: 'loading',
        properties: {
          value: '34.5'
        }
      });
      advance(fixture);
      expect(gtag.calls.count()).toEqual(1);
      expect(gtag).toHaveBeenCalledWith('event', 'loading', {
        event_category: 'interaction',
        value: 34,
        event_label: undefined,
        non_interaction: undefined
      });
    })
  ));

  it('should set user id, by string', fakeAsync(
    inject([Angulartics2, Angulartics2GoogleGlobalSiteTag], (
      angulartics2: Angulartics2,
      angulartics2GoogleGlobalSiteTag: Angulartics2GoogleGlobalSiteTag,
    ) => {
      fixture = createRoot(RootCmp);
      angulartics2GoogleGlobalSiteTag.startTracking();
      angulartics2.setUsername.next('90a72f4f-f0ee-43ac-802e-2e30a1741183');
      advance(fixture);
      expect(gtag.calls.count()).toEqual(1);
      expect(gtag).toHaveBeenCalledWith('set', {
        user_id: '90a72f4f-f0ee-43ac-802e-2e30a1741183'
      });
    },
    ),
  ));

  it('should set user id, by object', fakeAsync(
    inject([Angulartics2, Angulartics2GoogleGlobalSiteTag], (
      angulartics2: Angulartics2,
      angulartics2GoogleGlobalSiteTag: Angulartics2GoogleGlobalSiteTag,
    ) => {
      fixture = createRoot(RootCmp);
      angulartics2GoogleGlobalSiteTag.startTracking();
      angulartics2.setUsername.next({ userId: '90a72f4f-f0ee-43ac-802e-2e30a1741183' });
      advance(fixture);
      expect(gtag.calls.count()).toEqual(1);
      expect(gtag).toHaveBeenCalledWith('set', {
        user_id: '90a72f4f-f0ee-43ac-802e-2e30a1741183'
      });
    },
    ),
  ));

  it('should survive on undefined/null userName', fakeAsync(
    inject([Angulartics2, Angulartics2GoogleGlobalSiteTag], (
      angulartics2: Angulartics2,
      angulartics2GoogleGlobalSiteTag: Angulartics2GoogleGlobalSiteTag,
    ) => {
      fixture = createRoot(RootCmp);
      angulartics2GoogleGlobalSiteTag.startTracking();
      angulartics2.setUsername.next({ userId: null });
      advance(fixture);
      expect(gtag.calls.count()).toEqual(1);
      expect(gtag).toHaveBeenCalledWith('set', {
        user_id: null
      });
    },
    ),
  ));

  it('user properties should be sent with page track', fakeAsync(
    inject([Angulartics2, Angulartics2GoogleGlobalSiteTag], (
      angulartics2: Angulartics2,
      angulartics2GoogleGlobalSiteTag: Angulartics2GoogleGlobalSiteTag,
    ) => {
      fixture = createRoot(RootCmp);
      angulartics2GoogleGlobalSiteTag.startTracking();
      angulartics2.setUserProperties.next({ test: 1234 });
      angulartics2.pageTrack.next({ path: '/abc' });
      advance(fixture);
      expect(gtag.calls.count()).toEqual(2);
      expect(gtag).toHaveBeenCalledWith('config', 'UA-111111111-1', {
        page_path: '/abc',
        page_location: 'http://localhost:9876/abc',
        test: 1234
      });
    },
    ),
  ));

  it('should survive if gtag undefined', fakeAsync(
    inject([Angulartics2, Angulartics2GoogleGlobalSiteTag], (
      angulartics2: Angulartics2,
      angulartics2GoogleGlobalSiteTag: Angulartics2GoogleGlobalSiteTag,
    ) => {
      window.gtag = undefined;
      window.ga = undefined;

      fixture = createRoot(RootCmp);
      angulartics2GoogleGlobalSiteTag.startTracking();
      angulartics2.setUsername.next('90a72f4f-f0ee-43ac-802e-2e30a1741183');
      angulartics2.setUserProperties.next({ test: 1234 });
      angulartics2.userTimings.next({ timingVar: 'load', timingValue: 23, timingCategory: 'performance' });
      angulartics2.eventTrack.next({ action: 'do' });
      angulartics2.pageTrack.next({ path: '/abc' });
      advance(fixture);
    })
  ));
});
