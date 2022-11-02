import { fakeAsync, inject, ComponentFixture, TestBed } from '@angular/core/testing';

import { Angulartics2 } from '../../angulartics2-core';
import { advance, createRoot, RootCmp, TestModule } from '../../test.mocks';
import { Angulartics2Incendium, IncendiumEventNames } from './incendium';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

describe('Angulartics2Incendium', () => {
  let inc: any;
  let fixture: ComponentFixture<any>;
  let service: Angulartics2Incendium;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      providers: [Angulartics2Incendium],
    });
    window.inc = inc = jasmine.createSpy('inc').and.returnValue('test');

    service = TestBed.inject(Angulartics2Incendium);
    service.startTracking();
  });

  it('should track pages', fakeAsync(
    inject(
      [Angulartics2, Angulartics2Incendium],
      (angulartics2: Angulartics2, Angulartics2Incendium: Angulartics2Incendium) => {
        fixture = createRoot(RootCmp);
        angulartics2.pageTrack.next({ path: '/abc' });
        advance(fixture);
        expect(inc).toHaveBeenCalledWith('run', false, true);
      },
    ),
  ));

  it('should track conversions', fakeAsync(
    inject(
      [Angulartics2, Angulartics2Incendium],
      (angulartics2: Angulartics2, Angulartics2Incendium: Angulartics2Incendium) => {
        fixture = createRoot(RootCmp);
        angulartics2.eventTrack.next({
          action: IncendiumEventNames.ADD_CONVERION,
          properties: { key: 'test' },
        });
        advance(fixture);
        expect(inc).toHaveBeenCalledTimes(2);
        expect(inc).toHaveBeenCalledWith(IncendiumEventNames.ADD_CONVERION, 'test');
        expect(inc).toHaveBeenCalledWith('go');
      },
    ),
  ));

  it('should track conversion and emit conversion key', fakeAsync(
    inject(
      [Angulartics2, Angulartics2Incendium],
      (angulartics2: Angulartics2, Angulartics2Incendium: Angulartics2Incendium) => {
        service.incendiumResponse.subscribe(message => {
          expect(message).toEqual({
            type: IncendiumEventNames.ADD_CONVERION,
            value: 'test',
          });
        });
        fixture = createRoot(RootCmp);
        angulartics2.eventTrack.next({
          action: IncendiumEventNames.ADD_CONVERION,
          properties: { key: 'test' },
        });
        advance(fixture);
      },
    ),
  ));
});
