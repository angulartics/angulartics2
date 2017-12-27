import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { fakeAsync, inject, ComponentFixture, TestBed } from '@angular/core/testing';

import { Angulartics2 } from 'angulartics2';
import { advance, createRoot, RootCmp, TestModule } from '../../test.mocks';
import { Angulartics2Segment } from './angulartics2-segment';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

describe('Angulartics2Segment', () => {

  let fixture: ComponentFixture<any>;
  let analytics: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [
        { provide: Location, useClass: SpyLocation },
        Angulartics2Segment,
      ],
    });

    window.analytics = analytics = {
      page: jasmine.createSpy('page'),
      track: jasmine.createSpy('track'),
      identify: jasmine.createSpy('identify'),
      alias: jasmine.createSpy('alias')
    };
  });

  it('should track pages',
    fakeAsync(inject([Location, Angulartics2, Angulartics2Segment],
      (location: Location, angulartics2: Angulartics2, angulartics2Segment: Angulartics2Segment) => {
        fixture = createRoot(RootCmp);
        angulartics2.pageTrack.next({ path: '/abc', location: location });
        advance(fixture);
        expect(analytics.page).toHaveBeenCalledWith('/abc');
      }),
    ),
  );

  it('should track events',
    fakeAsync(inject([Location, Angulartics2, Angulartics2Segment],
      (location: Location, angulartics2: Angulartics2, angulartics2Segment: Angulartics2Segment) => {
        fixture = createRoot(RootCmp);
        angulartics2.eventTrack.next({ action: 'do', properties: { category: 'cat' } });
        advance(fixture);
        expect(analytics.track).toHaveBeenCalledWith('do', { category: 'cat' });
      }),
    ),
  );

  it('should set user properties',
    fakeAsync(inject([Location, Angulartics2, Angulartics2Segment],
      (location: Location, angulartics2: Angulartics2, angulartics2Segment: Angulartics2Segment) => {
        fixture = createRoot(RootCmp);
        angulartics2.setUserProperties.next({ userId: '1', firstName: 'John', lastName: 'Doe' });
        advance(fixture);
        expect(analytics.identify).toHaveBeenCalledWith('1', { userId: '1', firstName: 'John', lastName: 'Doe' });
      }),
    ),
  );

  it('should set user properties once',
    fakeAsync(inject([Location, Angulartics2, Angulartics2Segment],
      (location: Location, angulartics2: Angulartics2, angulartics2Segment: Angulartics2Segment) => {
        fixture = createRoot(RootCmp);
        angulartics2.setUserPropertiesOnce.next({ userId: '1', firstName: 'John', lastName: 'Doe' });
        advance(fixture);
        expect(analytics.identify).toHaveBeenCalledWith('1', { userId: '1', firstName: 'John', lastName: 'Doe' });
      }),
    ),
  );

  it('should set alias',
    fakeAsync(inject([Location, Angulartics2, Angulartics2Segment],
      (location: Location, angulartics2: Angulartics2, angulartics2Segment: Angulartics2Segment) => {
        fixture = createRoot(RootCmp);
        angulartics2.setAlias.next('testAlias');
        advance(fixture);
        expect(analytics.alias).toHaveBeenCalledWith('testAlias');
      }),
    ),
  );

});
