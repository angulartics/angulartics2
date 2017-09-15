"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angulartics2_1 = require("./core/angulartics2");
var angulartics2On_1 = require("./core/angulartics2On");
__export(require("./core/angulartics2"));
__export(require("./core/angulartics2On"));
__export(require("./providers/index"));
exports.ANGULARTICS2_FORROOT_GUARD = new core_1.InjectionToken('ANGULARTICS2_FORROOT_GUARD');
function provideForRootGuard(angulartics2) {
    if (angulartics2) {
        throw new Error("Angulartics2Module.forRoot() called twice. Lazy loaded modules should use Angulartics2Module.forChild() instead.");
    }
    return 'guarded';
}
exports.provideForRootGuard = provideForRootGuard;
var Angulartics2Module = /** @class */ (function () {
    function Angulartics2Module(guard) {
    }
    Angulartics2Module.forRoot = function (providers) {
        return {
            ngModule: Angulartics2Module,
            providers: [
                {
                    provide: exports.ANGULARTICS2_FORROOT_GUARD,
                    useFactory: provideForRootGuard,
                    deps: [[angulartics2_1.Angulartics2, new core_1.Optional(), new core_1.SkipSelf()]]
                },
                angulartics2_1.Angulartics2
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
        { type: core_1.NgModule, args: [{
                    declarations: [angulartics2On_1.Angulartics2On],
                    exports: [angulartics2On_1.Angulartics2On]
                },] },
    ];
    /** @nocollapse */
    Angulartics2Module.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [exports.ANGULARTICS2_FORROOT_GUARD,] },] },
    ]; };
    return Angulartics2Module;
}());
exports.Angulartics2Module = Angulartics2Module;
