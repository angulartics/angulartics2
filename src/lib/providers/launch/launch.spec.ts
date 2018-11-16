import { fakeAsync, inject, ComponentFixture, TestBed } from '@angular/core/testing';

import { Angulartics2 } from 'angulartics2';
import { advance, createRoot, RootCmp, TestModule } from '../../test.mocks';
import { Angulartics2LaunchByAdobe } from './launch';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

describe('Angulartics2LaunchByAdobe', () => {
  let _satellite: any;
  let fixture: ComponentFixture<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [Angulartics2LaunchByAdobe],
    });

    window._satellite = _satellite = {};
    _satellite.track = function(eventID: String, payload: any) {
      _satellite.output = {
        'eventID' : eventID,
        'payload': payload
      };
    };
    _satellite.output = null;
    const provider: Angulartics2LaunchByAdobe = TestBed.get(Angulartics2LaunchByAdobe);
    provider.startTracking();
  });

  it('should track pages',
    fakeAsync(inject([Angulartics2, Angulartics2LaunchByAdobe],
      (angulartics2: Angulartics2, angulartics2LaunchByAdobe: Angulartics2LaunchByAdobe) => {
        fixture = createRoot(RootCmp);
        angulartics2.pageTrack.next({ path: '/abc' });
        advance(fixture);
        expect(_satellite.output).toContain({
          'eventID': 'pageTrack',
          'payload': '/abc'
        });
      }
    )),
  );

  it('should track events',
    fakeAsync(inject([Angulartics2, Angulartics2LaunchByAdobe],
      (angulartics2: Angulartics2, angulartics2LaunchByAdobe: Angulartics2LaunchByAdobe) => {
        fixture = createRoot(RootCmp);
        angulartics2.eventTrack.next({ action: 'do', properties: { category: 'cat' } });
        advance(fixture);
        expect(_satellite.output).toContain({
          'eventID': 'eventTrack',
          'payload': {
            'action': 'do',
            'eventProperties': {
              'category': 'cat'
            }
          }
        });
      }
    )),
  );

  it('should set username',
    fakeAsync(inject([Angulartics2, Angulartics2LaunchByAdobe],
      (angulartics2: Angulartics2, angulartics2LaunchByAdobe: Angulartics2LaunchByAdobe) => {
        fixture = createRoot(RootCmp);
        angulartics2.setUsername.next('testuser');
        advance(fixture);
        expect(angulartics2.settings.gtm.userId).toBe('testuser');
      }
    )),
  );

});
