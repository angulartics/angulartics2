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
    window.console = jasmine.createSpyObj('console', ['warn', 'log']);
  });

  describe('on init', () => {
    beforeEach(() => {
      window.console = jasmine.createSpyObj('console', ['warn', 'log']);
      window._satellite = undefined;
    });

    it('should complain if Launch is not found',
      fakeAsync(inject([Angulartics2LaunchByAdobe],
        (angulartics2Launch: Angulartics2LaunchByAdobe) => {
          angulartics2Launch.startTracking();
          fixture = createRoot(RootCmp);
          advance(fixture);
          expect(console.warn).toHaveBeenCalled();
        }),
      ),
    );
  });

  describe('while active', () => {
    beforeEach(() => {
      window._satellite = _satellite = {};
      _satellite.track = (eventID: string, payload: any) => {
        _satellite.output = {
          eventID,
          payload,
        };
      };
      _satellite.output = null;
      const provider: Angulartics2LaunchByAdobe = TestBed.inject(Angulartics2LaunchByAdobe);
      provider.startTracking();
    });

    it('should track pages',
      fakeAsync(inject([Angulartics2, Angulartics2LaunchByAdobe],
        (angulartics2: Angulartics2) => {
          fixture = createRoot(RootCmp);
          angulartics2.pageTrack.next({ path: '/abc' });
          advance(fixture);
          expect(Object.keys(_satellite.output)).toEqual(['eventID', 'payload']);
          expect(_satellite.output.eventID).toEqual('pageTrack');
          expect(Object.keys(_satellite.output.payload)).toEqual(['path']);
          expect(_satellite.output.payload.path).toEqual('/abc');
        }
      )),
    );

    it('should track events',
      fakeAsync(inject([Angulartics2, Angulartics2LaunchByAdobe],
        (angulartics2: Angulartics2) => {
          fixture = createRoot(RootCmp);
          angulartics2.eventTrack.next({ action: 'do', properties: { category: 'cat' } });
          advance(fixture);
          expect(Object.keys(_satellite.output)).toEqual(['eventID', 'payload']);
          expect(_satellite.output.eventID).toEqual('eventTrack');
          expect(Object.keys(_satellite.output.payload)).toEqual(['action', 'eventProperties']);
          expect(_satellite.output.payload.action).toEqual('do');
          expect(Object.keys(_satellite.output.payload.eventProperties)).toEqual(['category']);
          expect(_satellite.output.payload.eventProperties.category).toEqual('cat');
        }
      )),
    );

  });

});
