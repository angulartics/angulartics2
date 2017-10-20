import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { TestBed, ComponentFixture, fakeAsync, inject } from '@angular/core/testing';

import { TestModule, RootCmp, advance, createRoot } from '../../test.mocks';

import { Angulartics2 } from 'angulartics2';
import { Angulartics2Facebook } from './angulartics2-facebook';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

describe('Angulartics2Facebook', () => {
  var fbq: any;
  var fixture: ComponentFixture<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TestModule
      ],
      providers: [
        { provide: Location, useClass: SpyLocation },
        Angulartics2Facebook
      ]
    });

    window.fbq = fbq = jasmine.createSpy('fbq');
  });

  it('should track events',
    fakeAsync(inject([Angulartics2, Angulartics2Facebook],
        (angulartics2: Angulartics2, angulartics2Facebook: Angulartics2Facebook) => {
          fixture = createRoot(RootCmp);
          angulartics2.eventTrack.next({ action: 'ViewContent', properties: { category: 'cat' } });
          advance(fixture);
          expect(fbq).toHaveBeenCalledWith('track', 'ViewContent', { category: 'cat' });
      })));

  it('should track custom events',
    fakeAsync(inject([Angulartics2, Angulartics2Facebook],
        (angulartics2: Angulartics2, angulartics2Facebook: Angulartics2Facebook) => {
          fixture = createRoot(RootCmp);
          angulartics2.eventTrack.next({ action: 'do', properties: { category: 'cat' } });
          advance(fixture);
          expect(fbq).toHaveBeenCalledWith('trackCustom', 'do', { category: 'cat' });
      })));

});
