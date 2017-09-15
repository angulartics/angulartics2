import { Injectable } from '@angular/core';
import { Angulartics2 } from '../../core/angulartics2';
var Angulartics2Facebook = /** @class */ (function () {
    function Angulartics2Facebook(angulartics2) {
        var _this = this;
        this.angulartics2 = angulartics2;
        this.angulartics2.settings.pageTracking.trackRelativePath = true;
        this.angulartics2.eventTrack.subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
    }
    /**
     * Send interactions to the Pixel, i.e. for event tracking in Pixel
     * @name eventTrack
     *
     * @param {string} action Required 'action' (string) associated with the event
     * @param {object} properties
     */
    Angulartics2Facebook.prototype.eventTrack = function (action, properties) {
        properties = properties || {};
        var eventList = [
            'ViewContent',
            'Search',
            'AddToCart',
            'AddToWishlist',
            'InitiateCheckout',
            'AddPaymentInfo',
            'Purchase',
            'Lead',
            'CompleteRegistration'
        ];
        if (typeof fbq !== 'undefined' && fbq) {
            eventList.indexOf(action) === -1 ?
                fbq('trackCustom', action, properties) :
                fbq('track', action, properties);
        }
    };
    Angulartics2Facebook.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    Angulartics2Facebook.ctorParameters = function () { return [
        { type: Angulartics2, },
    ]; };
    return Angulartics2Facebook;
}());
export { Angulartics2Facebook };
