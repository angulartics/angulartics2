import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { TestBed, ComponentFixture, fakeAsync, inject } from '@angular/core/testing';
import { TestModule, RootCmp, advance, createRoot } from '../../test.mocks';
import { Angulartics2 } from '../../core/angulartics2';
import { Angulartics2Clicky } from './angulartics2-clicky';
jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
declare var window: any;

fdescribe('Angulartics2Clicky', () => {
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
                Angulartics2Clicky
            ]
        });
        window.clicky = clicky = jasmine.createSpyObj('clicky', ['log', 'goal']);
        window.clicky_custom = clicky_custom = {};
    });

    it('should exist', fakeAsync(inject([Location, Angulartics2, Angulartics2Clicky],
    (location: Location, angulartics2: Angulartics2, angulartics2Clicky: Angulartics2Clicky) => {
        fixture = createRoot(RootCmp);
        expect(angulartics2).not.toBeUndefined();
        expect(clicky).not.toBeUndefined();
        expect(clicky_custom).not.toBeUndefined()
    })))
    
    it('should track pages', fakeAsync(inject([Location, Angulartics2, Angulartics2Clicky],
    (location: Location, angulartics2: Angulartics2, angulartics2Clicky: Angulartics2Clicky) => {
        fixture = createRoot(RootCmp);
        angulartics2.pageTrack.next({path: '/abc', location: location});
        advance(fixture);
        expect(clicky.log).toHaveBeenCalledWith('/abc');
    })))
})