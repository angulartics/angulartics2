import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { TestBed, ComponentFixture, fakeAsync, inject } from '@angular/core/testing';

import { TestModule, RootCmp, advance, createRoot } from '../../test.mocks';

import { Angulartics2 } from '../../core/angulartics2';
import { Angulartics2BaiduAnalytics } from './angulartics2-baidu-analytics';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

describe('Angulartics2BaiduAnalytics', () => {
    var hmt: Array<any>;
    var fixture: ComponentFixture<any>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                TestModule
            ],
            providers: [
                { provide: Location, useClass: SpyLocation },
                Angulartics2BaiduAnalytics
            ]
        });

        window.hmt = hmt = [];
    });

    it('should track pages',
        fakeAsync(inject([Location, Angulartics2, Angulartics2BaiduAnalytics],
            (location: Location, angulartics2: Angulartics2, angulartics2BaiduAnalytics: Angulartics2BaiduAnalytics) => {
                fixture = createRoot(RootCmp);
                angulartics2.pageTrack.next({ path: '/abc', location: location });
                advance(fixture);
                expect(hmt).toContain(['_trackPageview', '/abc']);
            })));

    it('should track events',
        fakeAsync(inject([Location, Angulartics2, Angulartics2BaiduAnalytics],
            (location: Location, angulartics2: Angulartics2, angulartics2BaiduAnalytics: Angulartics2BaiduAnalytics) => {
                fixture = createRoot(RootCmp);
                angulartics2.eventTrack.next({ action: 'do', properties: { category: 'cat', opt_label: 'label', opt_value: 'value' } });
                advance(fixture);
                expect(hmt).toContain(['_trackEvent', 'cat', 'do', 'label', 'value']);
            })));

    it('should set username',
        fakeAsync(inject([Location, Angulartics2, Angulartics2BaiduAnalytics],
            (location: Location, angulartics2: Angulartics2, angulartics2BaiduAnalytics: Angulartics2BaiduAnalytics) => {
                fixture = createRoot(RootCmp);
                angulartics2.setUsername.next('testUser');
                advance(fixture);
                expect(hmt).toContain(['_setCustomVar', 1, 'identity', 'testUser']);
            })));

    it('should set user properties',
        fakeAsync(inject([Location, Angulartics2, Angulartics2BaiduAnalytics],
            (location: Location, angulartics2: Angulartics2, angulartics2BaiduAnalytics: Angulartics2BaiduAnalytics) => {
                fixture = createRoot(RootCmp);
                angulartics2.setUserProperties.next({ userId: '1', firstName: 'John', lastName: 'Doe' });
                advance(fixture);
                expect(hmt).toContain(['_setCustomVar', 2, 'user', '{"userId":"1","firstName":"John","lastName":"Doe"}']);
            })));

});
