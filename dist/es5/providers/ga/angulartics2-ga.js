"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angulartics2_1 = require("../../core/angulartics2");
var Angulartics2GoogleAnalytics = /** @class */ (function () {
    function Angulartics2GoogleAnalytics(angulartics2) {
        var _this = this;
        this.angulartics2 = angulartics2;
        this.angulartics2.settings.pageTracking.trackRelativePath = true;
        // Set the default settings for this module
        this.angulartics2.settings.ga = {
            // array of additional account names (only works for analyticsjs)
            additionalAccountNames: [],
            userId: null
        };
        this.angulartics2.pageTrack.subscribe(function (x) { return _this.pageTrack(x.path); });
        this.angulartics2.eventTrack.subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        this.angulartics2.exceptionTrack.subscribe(function (x) { return _this.exceptionTrack(x); });
        this.angulartics2.setUsername.subscribe(function (x) { return _this.setUsername(x); });
        this.angulartics2.setUserProperties.subscribe(function (x) { return _this.setUserProperties(x); });
        this.angulartics2.userTimings.subscribe(function (x) { return _this.userTimings(x); });
    }
    Angulartics2GoogleAnalytics.prototype.pageTrack = function (path) {
        if (typeof _gaq !== 'undefined' && _gaq) {
            _gaq.push(['_trackPageview', path]);
            for (var _i = 0, _a = this.angulartics2.settings.ga.additionalAccountNames; _i < _a.length; _i++) {
                var accountName = _a[_i];
                _gaq.push([accountName + '._trackPageview', path]);
            }
            ;
        }
        if (typeof ga !== 'undefined' && ga) {
            if (this.angulartics2.settings.ga.userId) {
                ga('set', '&uid', this.angulartics2.settings.ga.userId);
            }
            ga('send', 'pageview', path);
            for (var _b = 0, _c = this.angulartics2.settings.ga.additionalAccountNames; _b < _c.length; _b++) {
                var accountName = _c[_b];
                ga(accountName + '.send', 'pageview', path);
            }
            ;
        }
    };
    /**
     * Track Event in GA
     * @name eventTrack
     *
     * @param {string} action Required 'action' (string) associated with the event
     * @param {object} properties Comprised of the mandatory field 'category' (string) and optional  fields 'label' (string), 'value' (integer) and 'noninteraction' (boolean)
     *
     * @link https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide#SettingUpEventTracking
     *
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/events
     */
    Angulartics2GoogleAnalytics.prototype.eventTrack = function (action, properties) {
        // Google Analytics requires an Event Category
        if (!properties || !properties.category) {
            properties = properties || {};
            properties.category = 'Event';
        }
        // GA requires that eventValue be an integer, see:
        // https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#eventValue
        // https://github.com/luisfarzati/angulartics/issues/81
        if (properties.value) {
            var parsed = parseInt(properties.value, 10);
            properties.value = isNaN(parsed) ? 0 : parsed;
        }
        if (typeof ga !== 'undefined') {
            var eventOptions = {
                eventCategory: properties.category,
                eventAction: action,
                eventLabel: properties.label,
                eventValue: properties.value,
                nonInteraction: properties.noninteraction,
                page: properties.page || location.hash.substring(1) || location.pathname,
                userId: this.angulartics2.settings.ga.userId,
                hitCallback: properties.hitCallback
            };
            // add custom dimensions and metrics
            this.setDimensionsAndMetrics(properties);
            if (this.angulartics2.settings.ga.transport) {
                ga('send', 'event', eventOptions, { transport: this.angulartics2.settings.ga.transport });
            }
            else {
                ga('send', 'event', eventOptions);
            }
            for (var _i = 0, _a = this.angulartics2.settings.ga.additionalAccountNames; _i < _a.length; _i++) {
                var accountName = _a[_i];
                ga(accountName + '.send', 'event', eventOptions);
            }
        }
        else if (typeof _gaq !== 'undefined') {
            _gaq.push(['_trackEvent', properties.category, action, properties.label, properties.value, properties.noninteraction]);
        }
    };
    /**
     * Exception Track Event in GA
     * @name exceptionTrack
     *
     * @param {object} properties Comprised of the optional fields:
     *     'fatal' (string),
     *     'description' (string)
     *
     * @https://developers.google.com/analytics/devguides/collection/analyticsjs/exceptions
     *
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/events
     */
    Angulartics2GoogleAnalytics.prototype.exceptionTrack = function (properties) {
        if (properties.fatal === undefined) {
            console.log('No "fatal" provided, sending with fatal=true');
            properties.fatal = true;
        }
        properties.exDescription = properties.description;
        var eventOptions = {
            exFatal: properties.fatal,
            exDescription: properties.description
        };
        ga('send', 'exception', eventOptions);
    };
    Angulartics2GoogleAnalytics.prototype.setUsername = function (userId) {
        this.angulartics2.settings.ga.userId = userId;
    };
    Angulartics2GoogleAnalytics.prototype.setUserProperties = function (properties) {
        this.setDimensionsAndMetrics(properties);
    };
    /**
     * User Timings Event in GA
     * @name userTimings
     *
     * @param {object} properties Comprised of the mandatory fields:
     *     'timingCategory' (string),
     *     'timingVar' (string),
     *     'timingValue' (number)
     * Properties can also have the optional fields:
     *     'timingLabel' (string)
     *
     * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/user-timings
     */
    Angulartics2GoogleAnalytics.prototype.userTimings = function (properties) {
        if (!properties || !properties.timingCategory || !properties.timingVar || !properties.timingValue) {
            console.error('Properties timingCategory, timingVar, and timingValue are required to be set.');
            return;
        }
        if (ga) {
            ga('send', 'timing', properties);
        }
    };
    Angulartics2GoogleAnalytics.prototype.setDimensionsAndMetrics = function (properties) {
        if (ga) {
            // add custom dimensions and metrics
            for (var idx = 1; idx <= 200; idx++) {
                if (properties['dimension' + idx.toString()]) {
                    ga('set', 'dimension' + idx.toString(), properties['dimension' + idx.toString()]);
                }
                else {
                    ga('set', 'dimension' + idx.toString(), undefined);
                }
                if (properties['metric' + idx.toString()]) {
                    ga('set', 'metric' + idx.toString(), properties['metric' + idx.toString()]);
                }
                else {
                    ga('set', 'metric' + idx.toString(), undefined);
                }
            }
        }
    };
    Angulartics2GoogleAnalytics.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    Angulartics2GoogleAnalytics.ctorParameters = function () { return [
        { type: angulartics2_1.Angulartics2, },
    ]; };
    return Angulartics2GoogleAnalytics;
}());
exports.Angulartics2GoogleAnalytics = Angulartics2GoogleAnalytics;
