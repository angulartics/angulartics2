import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { TestBed, ComponentFixture, fakeAsync, inject } from '@angular/core/testing';

import { TestModule, RootCmp, advance, createRoot } from '../../../../test.mocks';

import { Angulartics } from '../../../core/src/angulartics';
import { AngularticsBaiduAnalytics } from '../src/provider';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

describe('AngularticsBaiduAnalytics', () => {
    var hmt: Array<any>;
    var fixture: ComponentFixture<any>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                TestModule
            ],
            providers: [
                { provide: Location, useClass: SpyLocation },
                AngularticsBaiduAnalytics
            ]
        });

        window.hmt = hmt = [];
    });

    it('should track pages',
        fakeAsync(inject([Location, Angulartics, AngularticsBaiduAnalytics],
            (location: Location, angulartics: Angulartics, angularticsBaiduAnalytics: AngularticsBaiduAnalytics) => {
                fixture = createRoot(RootCmp);
                angulartics.pageTrack.next({ path: '/abc', location: location });
                advance(fixture);
                expect(hmt).toContain(['_trackPageview', '/abc']);
            })));

    it('should track events',
        fakeAsync(inject([Location, Angulartics, AngularticsBaiduAnalytics],
            (location: Location, angulartics: Angulartics, angularticsBaiduAnalytics: AngularticsBaiduAnalytics) => {
                fixture = createRoot(RootCmp);
                angulartics.eventTrack.next({ action: 'do', properties: { category: 'cat', opt_label: 'label', opt_value: 'value' } });
                advance(fixture);
                expect(hmt).toContain(['_trackEvent', 'cat', 'do', 'label', 'value']);
            })));

    it('should set username',
        fakeAsync(inject([Location, Angulartics, AngularticsBaiduAnalytics],
            (location: Location, angulartics: Angulartics, angularticsBaiduAnalytics: AngularticsBaiduAnalytics) => {
                fixture = createRoot(RootCmp);
                angulartics.setUsername.next('testUser');
                advance(fixture);
                expect(hmt).toContain(['_setCustomVar', 1, 'identity', 'testUser']);
            })));

    it('should set user properties',
        fakeAsync(inject([Location, Angulartics, AngularticsBaiduAnalytics],
            (location: Location, angulartics: Angulartics, angularticsBaiduAnalytics: AngularticsBaiduAnalytics) => {
                fixture = createRoot(RootCmp);
                angulartics.setUserProperties.next({ userId: '1', firstName: 'John', lastName: 'Doe' });
                advance(fixture);
                expect(hmt).toContain(['_setCustomVar', 2, 'user', '{"userId":"1","firstName":"John","lastName":"Doe"}']);
            })));

});
