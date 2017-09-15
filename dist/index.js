import { NgModule, Inject, Optional, InjectionToken, SkipSelf } from '@angular/core';
import { Angulartics2 } from './core/angulartics2';
import { Angulartics2On } from './core/angulartics2On';
export * from './core/angulartics2';
export * from './core/angulartics2On';
export * from './providers/index';
export var ANGULARTICS2_FORROOT_GUARD = new InjectionToken('ANGULARTICS2_FORROOT_GUARD');
export function provideForRootGuard(angulartics2) {
    if (angulartics2) {
        throw new Error("Angulartics2Module.forRoot() called twice. Lazy loaded modules should use Angulartics2Module.forChild() instead.");
    }
    return 'guarded';
}
var Angulartics2Module = /** @class */ (function () {
    function Angulartics2Module(guard) {
    }
    Angulartics2Module.forRoot = function (providers) {
        return {
            ngModule: Angulartics2Module,
            providers: [
                {
                    provide: ANGULARTICS2_FORROOT_GUARD,
                    useFactory: provideForRootGuard,
                    deps: [[Angulartics2, new Optional(), new SkipSelf()]]
                },
                Angulartics2
            ].concat(providers)
        };
    };
    Angulartics2Module.forChild = function () {
        return {
            ngModule: Angulartics2Module,
            providers: []
        };
    };
    Angulartics2Module.decorators = [
        { type: NgModule, args: [{
                    declarations: [Angulartics2On],
                    exports: [Angulartics2On]
                },] },
    ];
    /** @nocollapse */
    Angulartics2Module.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [ANGULARTICS2_FORROOT_GUARD,] },] },
    ]; };
    return Angulartics2Module;
}());
export { Angulartics2Module };
