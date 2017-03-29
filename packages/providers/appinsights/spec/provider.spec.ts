import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { TestBed, ComponentFixture, fakeAsync, inject } from '@angular/core/testing';

import { TestModule, RootCmp, advance, createRoot } from '../../../../test.mocks';

import { Angulartics } from '../../../core/src/angulartics';
import { AngularticsAppInsights } from '../src/provider';
import { RouterTestingModule } from '@angular/router/testing';
import { Title } from '@angular/platform-browser';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare let window: any;

describe('AngularticsAppInsights', () => {
    let appInsights: Microsoft.ApplicationInsights.IAppInsights;
    let fixture: ComponentFixture<any>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                TestModule,
                RouterTestingModule,
            ],
            providers: [
                { provide: Location, useClass: SpyLocation },
                Title,
                AngularticsAppInsights
            ]
        });

        window.appInsights = appInsights = jasmine.createSpyObj(
            'appInsights',
            [
                'trackPageView',
                'trackEvent',
                'trackException',
                'setAuthenticatedUserContext'
            ]
        );
    });

    it('should track pages',
        fakeAsync(inject([Location, Angulartics, AngularticsAppInsights, Title],
            (location: Location, angulartics: Angulartics, angularticsAppInsights: AngularticsAppInsights, title: Title) => {
                fixture = createRoot(RootCmp);
                let metrics = {};
                let dimensions = {};
                let loadTime = 123;
                spyOn(title, 'getTitle').and.returnValue('the title');
                angularticsAppInsights.metrics = metrics;
                angularticsAppInsights.dimensions = dimensions;
                angularticsAppInsights.loadTime = loadTime;
                angulartics.pageTrack.next({ path: '/abc', location: location });
                advance(fixture);
                expect(appInsights.trackPageView).toHaveBeenCalledWith('the title', '/abc', metrics, dimensions, loadTime);
            }))
    );

    it('should track events',
        fakeAsync(inject([Location, Angulartics, AngularticsAppInsights],
            (location: Location, angulartics: Angulartics, angularticsAppInsights: AngularticsAppInsights) => {
                fixture = createRoot(RootCmp);
                let action = 'the action';
                let properties = {};
                let measurements = {};
                angularticsAppInsights.measurements = measurements;
                angulartics.eventTrack.next({
                    action, properties
                });
                advance(fixture);
                expect(appInsights.trackEvent).toHaveBeenCalledWith(action, properties, measurements);
            })));

    it('should track exceptions (string)',
        fakeAsync(inject([Location, Angulartics, AngularticsAppInsights],
            (location: Location, angulartics: Angulartics, angularticsAppInsights: AngularticsAppInsights) => {
                fixture = createRoot(RootCmp);
                let str = 'test string';
                angulartics.exceptionTrack.next(str);
                advance(fixture);
                expect(appInsights.trackException).toHaveBeenCalledWith(str);
            })));

    it('should track exceptions (event)',
        fakeAsync(inject([Location, Angulartics, AngularticsAppInsights],
            (location: Location, angulartics: Angulartics, angularticsAppInsights: AngularticsAppInsights) => {
                fixture = createRoot(RootCmp);
                let event = { 'event': true };
                angulartics.exceptionTrack.next({ event });
                advance(fixture);
                expect(appInsights.trackException).toHaveBeenCalledWith(event);
            })));

    it('should track exceptions (description)',
        fakeAsync(inject([Location, Angulartics, AngularticsAppInsights],
            (location: Location, angulartics: Angulartics, angularticsAppInsights: AngularticsAppInsights) => {
                fixture = createRoot(RootCmp);
                let description = 'test description';
                angulartics.exceptionTrack.next({ description });
                advance(fixture);
                expect(appInsights.trackException).toHaveBeenCalledWith(description);
            })));

    it('should set userId in setAuthenticatedUserContext',
        fakeAsync(inject([Location, Angulartics, AngularticsAppInsights],
            (location: Location, angulartics: Angulartics, angularticsAppInsights: AngularticsAppInsights) => {
                fixture = createRoot(RootCmp);
                let userId = 'test_userId';
                angularticsAppInsights.setUsername(userId);
                advance(fixture);
                expect(angulartics.settings.appInsights.userId).toBe(userId);
                expect(appInsights.setAuthenticatedUserContext).toHaveBeenCalledWith(userId);
            })));


    it('should set userId and accountId in setAuthenticatedUserContext',
        fakeAsync(inject([Location, Angulartics, AngularticsAppInsights],
            (location: Location, angulartics: Angulartics, angularticsAppInsights: AngularticsAppInsights) => {
                fixture = createRoot(RootCmp);
                let userId = 'test_userId';
                let accountId = 'test_accountId';
                angularticsAppInsights.setUserProperties({ userId, accountId });
                advance(fixture);
                expect(angulartics.settings.appInsights.userId).toBe(userId);
                expect(appInsights.setAuthenticatedUserContext).toHaveBeenCalledWith(userId, accountId);
            })));


    it('should user existing userId and set accountId in setAuthenticatedUserContext',
        fakeAsync(inject([Location, Angulartics, AngularticsAppInsights],
            (location: Location, angulartics: Angulartics, angularticsAppInsights: AngularticsAppInsights) => {
                fixture = createRoot(RootCmp);
                let userId = 'test_userId';
                let accountId = 'test_accountId';
                angularticsAppInsights.setUsername(userId);
                advance(fixture);
                expect(angulartics.settings.appInsights.userId).toBe(userId);
                angularticsAppInsights.setUserProperties({ accountId });
                advance(fixture);
                expect(appInsights.setAuthenticatedUserContext).toHaveBeenCalledWith(userId, accountId);
            })));

    it('should set the start time on start',
        fakeAsync(inject([Location, Angulartics, AngularticsAppInsights],
            (location: Location, angulartics: Angulartics, angularticsAppInsights: AngularticsAppInsights) => {
                angularticsAppInsights.startTimer();
                expect(angularticsAppInsights.loadStartTime).toBe(Date.now());
                expect(angularticsAppInsights.loadTime).toBe(null);
            })));

    it('should set the total time on stop',
        fakeAsync(inject([Location, Angulartics, AngularticsAppInsights],
            (location: Location, angulartics: Angulartics, angularticsAppInsights: AngularticsAppInsights) => {
                angularticsAppInsights.loadStartTime = Date.now() - 1000;
                angularticsAppInsights.stopTimer();
                // 50ms time difference for testing to ensure timing is correct
                expect(angularticsAppInsights.loadTime).toBeLessThanOrEqual(1150);
                expect(angularticsAppInsights.loadTime).toBeGreaterThanOrEqual(1000);
                expect(angularticsAppInsights.loadStartTime).toBe(null);
            })));
});