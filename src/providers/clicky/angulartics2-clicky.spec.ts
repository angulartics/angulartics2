import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { TestBed, ComponentFixture, fakeAsync, inject } from '@angular/core/testing';
import { TestModule, RootCmp, advance, createRoot } from '../../test.mocks';
import { Angulartics2 } from '../../core/angulartics2';
import { Angulartics2Clicky } from './angulartics2-clicky';
import { Title } from '@angular/platform-browser';
jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

describe('Angulartics2Clicky', () => {
    var clicky: any;
    var clicky_custom: any;
    var fixture: ComponentFixture<any>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                TestModule
            ],
            providers: [
                { provide: Location, useClass: SpyLocation },
                Angulartics2Clicky,
                Title
            ]
        });
        window.console = jasmine.createSpyObj('console', ['warn', 'log'])
    });

    describe('on init', () => {
        beforeEach(() => {
            window.console = jasmine.createSpyObj('console', ['warn', 'log'])
        });

        it('should complain if clicky is not found', fakeAsync(inject([Location, Angulartics2, Angulartics2Clicky],
            (location: Location, angulartics2: Angulartics2, angulartics2Clicky: Angulartics2Clicky) => {
                window.clicky = undefined;
                fixture = createRoot(RootCmp);
                advance(fixture);
                expect(console.warn).toHaveBeenCalled();
            })))
    })

    describe('while active', () => {

        beforeEach(() => {
            window.clicky = clicky = jasmine.createSpyObj('clicky', ['log', 'goal']);
        });

        it('should track pages', fakeAsync(inject([Location, Angulartics2, Angulartics2Clicky, Title],
            (location: Location, angulartics2: Angulartics2, angulartics2Clicky: Angulartics2Clicky, titleService: Title) => {
                fixture = createRoot(RootCmp);
                let title: string = 'clicky';
                titleService.setTitle(title);
                angulartics2.pageTrack.next({ path: '/abc' });
                advance(fixture);
                expect(clicky.log).toHaveBeenCalledWith('/abc', title, 'pageview');
            })))

        it('should track events', fakeAsync(inject([Location, Angulartics2, Angulartics2Clicky],
            (location: Location, angulartics2: Angulartics2, angulartics2Clicky: Angulartics2Clicky) => {
                fixture = createRoot(RootCmp);
                angulartics2.eventTrack.next({ action: 'do', properties: { title: 'thing', type: 'click' } });
                advance(fixture);
                expect(clicky.log).toHaveBeenCalledWith('do', 'thing', 'click');
            })))

        it('should track goals', fakeAsync(inject([Location, Angulartics2, Angulartics2Clicky],
            (location: Location, angulartics2: Angulartics2, angulartics2Clicky: Angulartics2Clicky) => {
                fixture = createRoot(RootCmp);
                angulartics2.eventTrack.next({ action: 'do', properties: { goal: 1, revenue: 50, noQueue: true } });
                advance(fixture);
                expect(clicky.goal).toHaveBeenCalledWith(1, 50, true);
            })))
    })



})