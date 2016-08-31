"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var angulartics2_1 = require('./angulartics2');
var Angulartics2RouterFix = (function (_super) {
    __extends(Angulartics2RouterFix, _super);
    function Angulartics2RouterFix(location, router) {
        _super.call(this, location);
        this.trackRouter(location, router);
    }
    Angulartics2RouterFix.prototype.trackRouter = function (location, router) {
        var _this = this;
        router.events.subscribe(function (value) {
            if (!(value instanceof router_1.NavigationEnd)) {
                return;
            }
            if (!_this.settings.developerMode) {
                var url = location.path();
                if (_this.settings.pageTracking.autoTrackVirtualPages && !_this.matchesExcludedRouteChild(url)) {
                    _this.pageTrack.next({
                        path: _this.settings.pageTracking.basePath.length ? _this.settings.pageTracking.basePath + url : location.prepareExternalUrl(url),
                        location: location
                    });
                }
            }
        });
    };
    Angulartics2RouterFix.prototype.matchesExcludedRouteChild = function (url) {
        for (var _i = 0, _a = this.settings.pageTracking.excludedRoutes; _i < _a.length; _i++) {
            var excludedRoute = _a[_i];
            if ((excludedRoute instanceof RegExp && excludedRoute.test(url)) || url.indexOf(excludedRoute) > -1) {
                return true;
            }
        }
        return false;
    };
    Angulartics2RouterFix = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [common_1.Location, router_1.Router])
    ], Angulartics2RouterFix);
    return Angulartics2RouterFix;
}(angulartics2_1.Angulartics2));
exports.Angulartics2RouterFix = Angulartics2RouterFix;
