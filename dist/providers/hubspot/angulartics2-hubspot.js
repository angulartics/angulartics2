import { Injectable } from '@angular/core';
import { Angulartics2 } from '../../core/angulartics2';
var Angulartics2Hubspot = /** @class */ (function () {
    function Angulartics2Hubspot(angulartics2) {
        var _this = this;
        this.angulartics2 = angulartics2;
        if (typeof _hsq === 'undefined') {
            _hsq = [];
        }
        this.angulartics2.pageTrack.subscribe(function (x) { return _this.pageTrack(x.path, x.location); });
        this.angulartics2.eventTrack.subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        this.angulartics2.setUserProperties.subscribe(function (x) { return _this.setUserProperties(x); });
    }
    Angulartics2Hubspot.prototype.pageTrack = function (path, location) {
        if (typeof _hsq !== 'undefined') {
            _hsq.push(['setPath', path]);
            _hsq.push(['trackPageView']);
        }
    };
    Angulartics2Hubspot.prototype.eventTrack = function (action, properties) {
        if (typeof _hsq !== 'undefined') {
            _hsq.push(['trackEvent', properties]);
        }
    };
    Angulartics2Hubspot.prototype.setUserProperties = function (properties) {
        if (typeof _hsq !== 'undefined') {
            _hsq.push(['identify', properties]);
        }
    };
    Angulartics2Hubspot.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Angulartics2Hubspot.ctorParameters = function () { return [
        { type: Angulartics2, },
    ]; };
    return Angulartics2Hubspot;
}());
export { Angulartics2Hubspot };
