import { fakeAsync, inject, ComponentFixture, TestBed } from '@angular/core/testing';
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
    window.ga = ga = function (callback) {
      callback();
    };
    window.ga.getAll = ga.getAll = function () {
      return {
        forEach: function (callback) {
          const tracker = {
            get: function (value) {
              return 'UA-111111111-1';
            },
          };
          callback(tracker);
        },
      };
    };
  });

  it('should track pages',
    fakeAsync(inject([Angulartics2, Angulartics2GoogleGlobalSiteTag],
      (angulartics2: Angulartics2, angulartics2GoogleGlobalSiteTag: Angulartics2GoogleGlobalSiteTag) => {
        fixture = createRoot(RootCmp);
        angulartics2.pageTrack.next({ path: '/abc' });
        advance(fixture);
        expect(gtag.calls.count()).toEqual(1);
        expect(gtag).toHaveBeenCalledWith('config', 'UA-111111111-1', { 'page_path': '/abc' });
      },
    )),
  );

  it('should track events',
    fakeAsync(inject([Angulartics2, Angulartics2GoogleGlobalSiteTag],
      (angulartics2: Angulartics2, angulartics2GoogleGlobalSiteTag: Angulartics2GoogleGlobalSiteTag) => {
        fixture = createRoot(RootCmp);
        angulartics2.eventTrack.next({
          action: 'do',
          properties: {
            value: 1,
            label: 'abc',
            gstCustom: {
              customKey: 'customValue',
            },
          }
        });
        advance(fixture);
        expect(gtag).toHaveBeenCalledWith('event', 'do', {
          event_category: 'interaction',
          event_label: 'abc',
          value: 1,
          non_interaction: undefined,
          customKey: 'customValue',
        });
      }
    )),
  );

  it('should track exceptions',
    fakeAsync(inject([Angulartics2, Angulartics2GoogleGlobalSiteTag],
      (angulartics2: Angulartics2, angulartics2GoogleGlobalSiteTag: Angulartics2GoogleGlobalSiteTag) => {
        fixture = createRoot(RootCmp);
        angulartics2.exceptionTrack.next({ description: 'bugger', gstCustom: { appId: 'app', appName: 'Test App', appVersion: '0.1' } });
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
      }
    )),
  );

});
