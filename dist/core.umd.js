(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("@angular/platform-browser"), require("@angular/common"), require("@angular/router"), require("rxjs/ReplaySubject"), require("rxjs/add/operator/filter"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/core", "@angular/platform-browser", "@angular/common", "@angular/router", "rxjs/ReplaySubject", "rxjs/add/operator/filter"], factory);
	else if(typeof exports === 'object')
		exports["ngx-translate-core"] = factory(require("@angular/core"), require("@angular/platform-browser"), require("@angular/common"), require("@angular/router"), require("rxjs/ReplaySubject"), require("rxjs/add/operator/filter"));
	else
		root["ngx-translate-core"] = factory(root["@angular/core"], root["@angular/platform-browser"], root["@angular/common"], root["@angular/router"], root["rxjs/ReplaySubject"], root["rxjs/add/operator/filter"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var ReplaySubject_1 = __webpack_require__(7);
var common_1 = __webpack_require__(3);
var router_1 = __webpack_require__(4);
__webpack_require__(8);
var Angulartics2 = /** @class */ (function () {
    function Angulartics2(location, router) {
        this.settings = {
            pageTracking: {
                autoTrackVirtualPages: true,
                basePath: '',
                excludedRoutes: []
            },
            eventTracking: {},
            developerMode: false
        };
        /*
          @Param: ({url: string, location: Location})
         */
        this.pageTrack = new ReplaySubject_1.ReplaySubject(10);
        /*
          @Param: ({action: any, properties: any})
         */
        this.eventTrack = new ReplaySubject_1.ReplaySubject(10);
        /*
          @Param: (properties: any)
         */
        this.exceptionTrack = new ReplaySubject_1.ReplaySubject(10);
        /*
          @Param: (alias: string)
         */
        this.setAlias = new ReplaySubject_1.ReplaySubject(10);
        /*
          @Param: (userId: string)
         */
        this.setUsername = new ReplaySubject_1.ReplaySubject(10);
        /*
          @Param: ({action: any, properties: any})
         */
        this.setUserProperties = new ReplaySubject_1.ReplaySubject(10);
        /*
          @Param: (properties: any)
         */
        this.setUserPropertiesOnce = new ReplaySubject_1.ReplaySubject(10);
        /*
          @Param: (properties: any)
         */
        this.setSuperProperties = new ReplaySubject_1.ReplaySubject(10);
        /*
          @Param: (properties: any)
         */
        this.setSuperPropertiesOnce = new ReplaySubject_1.ReplaySubject(10);
        /*
          @Param: (properties: any)
         */
        this.userTimings = new ReplaySubject_1.ReplaySubject(10);
        this.trackLocation(location, router);
    }
    Angulartics2.prototype.trackLocation = function (location, router) {
        var _this = this;
        router.events
            .filter(function (event) { return event instanceof router_1.NavigationEnd; })
            .subscribe(function (event) {
            if (!_this.settings.developerMode) {
                _this.trackUrlChange(event.urlAfterRedirects, location);
            }
        });
    };
    Angulartics2.prototype.virtualPageviews = function (value) {
        this.settings.pageTracking.autoTrackVirtualPages = value;
    };
    Angulartics2.prototype.excludeRoutes = function (routes) {
        this.settings.pageTracking.excludedRoutes = routes;
    };
    Angulartics2.prototype.firstPageview = function (value) {
        this.settings.pageTracking.autoTrackFirstPage = value;
    };
    Angulartics2.prototype.withBase = function (value) {
        this.settings.pageTracking.basePath = (value);
    };
    Angulartics2.prototype.developerMode = function (value) {
        this.settings.developerMode = value;
    };
    Angulartics2.prototype.trackUrlChange = function (url, location) {
        if (!this.settings.developerMode) {
            if (this.settings.pageTracking.autoTrackVirtualPages && !this.matchesExcludedRoute(url)) {
                this.pageTrack.next({
                    path: this.settings.pageTracking.basePath.length ? this.settings.pageTracking.basePath + url : location.prepareExternalUrl(url),
                    location: location
                });
            }
        }
    };
    Angulartics2.prototype.matchesExcludedRoute = function (url) {
        for (var _i = 0, _a = this.settings.pageTracking.excludedRoutes; _i < _a.length; _i++) {
            var excludedRoute = _a[_i];
            if ((excludedRoute instanceof RegExp && excludedRoute.test(url)) || url.indexOf(excludedRoute) > -1) {
                return true;
            }
        }
        return false;
    };
    Angulartics2 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [common_1.Location, router_1.Router])
    ], Angulartics2);
    return Angulartics2;
}());
exports.Angulartics2 = Angulartics2;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var platform_browser_1 = __webpack_require__(2);
// import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';
var angulartics2_1 = __webpack_require__(1);
var Angulartics2On = /** @class */ (function () {
    function Angulartics2On(elRef, angulartics2, eventManager) {
        this.elRef = elRef;
        this.angulartics2 = angulartics2;
        this.eventManager = eventManager;
        this.el = this.elRef.nativeElement;
    }
    Angulartics2On.prototype.ngAfterContentInit = function () {
        var _this = this;
        // Don't listen in server-side
        if (this.isBrowser()) {
            this.eventManager.addEventListener(this.el, this.angulartics2On || 'click', function (event) { return _this.eventTrack(event); });
        }
    };
    Angulartics2On.prototype.isBrowser = function () {
        return typeof (window) !== 'undefined';
    };
    Angulartics2On.prototype.eventTrack = function (event) {
        var action = this.angularticsEvent; // || this.inferEventName();
        var properties = {
            eventType: event.type
        };
        if (this.angularticsCategory) {
            properties.category = this.angularticsCategory;
        }
        // Allow components to pass through an expression that gets merged on to the event properties
        // eg. angulartics-properites='myComponentScope.someConfigExpression.$angularticsProperties'
        if (this.angularticsProperties) {
            Object.assign(properties, this.angularticsProperties);
        }
        this.angulartics2.eventTrack.next({
            action: action,
            properties: properties
        });
    };
    __decorate([
        core_1.Input('angulartics2On'),
        __metadata("design:type", String)
    ], Angulartics2On.prototype, "angulartics2On", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Angulartics2On.prototype, "angularticsEvent", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Angulartics2On.prototype, "angularticsCategory", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], Angulartics2On.prototype, "angularticsProperties", void 0);
    Angulartics2On = __decorate([
        core_1.Injectable(),
        core_1.Directive({
            selector: '[angulartics2On]'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            angulartics2_1.Angulartics2,
            platform_browser_1.EventManager])
    ], Angulartics2On);
    return Angulartics2On;
}());
exports.Angulartics2On = Angulartics2On;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var angulartics2_1 = __webpack_require__(1);
var angulartics2On_1 = __webpack_require__(5);
__export(__webpack_require__(1));
__export(__webpack_require__(5));
__export(__webpack_require__(9));
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
    Angulartics2Module_1 = Angulartics2Module;
    Angulartics2Module.forRoot = function (providers) {
        return {
            ngModule: Angulartics2Module_1,
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
            ngModule: Angulartics2Module_1,
            providers: []
        };
    };
    Angulartics2Module = Angulartics2Module_1 = __decorate([
        core_1.NgModule({
            declarations: [angulartics2On_1.Angulartics2On],
            exports: [angulartics2On_1.Angulartics2On]
        }),
        __param(0, core_1.Optional()), __param(0, core_1.Inject(exports.ANGULARTICS2_FORROOT_GUARD)),
        __metadata("design:paramtypes", [Object])
    ], Angulartics2Module);
    return Angulartics2Module;
    var Angulartics2Module_1;
}());
exports.Angulartics2Module = Angulartics2Module;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(10));
__export(__webpack_require__(11));
__export(__webpack_require__(12));
__export(__webpack_require__(13));
__export(__webpack_require__(14));
__export(__webpack_require__(15));
__export(__webpack_require__(16));
__export(__webpack_require__(17));
__export(__webpack_require__(18));
__export(__webpack_require__(19));
__export(__webpack_require__(20));
__export(__webpack_require__(21));


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var angulartics2_1 = __webpack_require__(1);
var Angulartics2BaiduAnalytics = /** @class */ (function () {
    function Angulartics2BaiduAnalytics(angulartics2) {
        var _this = this;
        this.angulartics2 = angulartics2;
        if (typeof (hmt) === 'undefined') {
            hmt = [];
        }
        else {
            hmt.push(['_ setAutoPageview', false]);
        }
        this.angulartics2.pageTrack.subscribe(function (x) { return _this.pageTrack(x.path); });
        this.angulartics2.eventTrack.subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        this.angulartics2.setUsername.subscribe(function (x) { return _this.setUsername(x); });
        this.angulartics2.setUserProperties.subscribe(function (x) { return _this.setUserProperties(x); });
    }
    /**
     * Page Track in Baidu Analytics
     * @name pageTrack
     *
     * @param {string} path Required 'path' (string)
     *
     * @link http://tongji.baidu.com/open/api/more?p=ref_trackPageview
     *
     */
    Angulartics2BaiduAnalytics.prototype.pageTrack = function (path) {
        if (typeof hmt !== 'undefined' && hmt) {
            hmt.push(['_trackPageview', path]);
        }
    };
    /**
     * Track Event in Baidu Analytics
     * @name eventTrack
     *
     * @param {string} action Required 'action' (string) associated with the event
     * @param {object} properties Comprised of the mandatory field 'category' (string), 'opt_label'(string) and 'opt_value' (string)
     *
     * @link http://tongji.baidu.com/open/api/more?p=ref_trackEvent
     *
     */
    Angulartics2BaiduAnalytics.prototype.eventTrack = function (action, properties) {
        //baidu analytics requires category
        if (!properties || !properties.category) {
            properties = properties || {};
            properties.category = 'Event';
            properties.opt_label = 'default';
            properties.opt_value = 'default';
        }
        if (typeof hmt !== 'undefined' && hmt) {
            hmt.push(['_trackEvent', properties.category, action, properties.opt_label, properties.opt_value]);
        }
    };
    Angulartics2BaiduAnalytics.prototype.setUsername = function (userId) {
        // set default custom variables name to 'identity' and 'value'
        hmt.push(['_setCustomVar', 1, 'identity', userId]);
    };
    Angulartics2BaiduAnalytics.prototype.setUserProperties = function (properties) {
        hmt.push(['_setCustomVar', 2, 'user', JSON.stringify(properties)]);
    };
    Angulartics2BaiduAnalytics = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [angulartics2_1.Angulartics2])
    ], Angulartics2BaiduAnalytics);
    return Angulartics2BaiduAnalytics;
}());
exports.Angulartics2BaiduAnalytics = Angulartics2BaiduAnalytics;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var angulartics2_1 = __webpack_require__(1);
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
    Angulartics2GoogleAnalytics = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [angulartics2_1.Angulartics2])
    ], Angulartics2GoogleAnalytics);
    return Angulartics2GoogleAnalytics;
}());
exports.Angulartics2GoogleAnalytics = Angulartics2GoogleAnalytics;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var angulartics2_1 = __webpack_require__(1);
var Angulartics2GoogleTagManager = /** @class */ (function () {
    function Angulartics2GoogleTagManager(angulartics2) {
        var _this = this;
        this.angulartics2 = angulartics2;
        // The dataLayer needs to be initialized
        if (typeof dataLayer !== 'undefined' && dataLayer) {
            dataLayer = window.dataLayer = window.dataLayer || [];
        }
        this.angulartics2.settings.pageTracking.trackRelativePath = true;
        // Set the default settings for this module
        this.angulartics2.settings.gtm = {
            userId: null
        };
        this.angulartics2.pageTrack.subscribe(function (x) { return _this.pageTrack(x.path); });
        this.angulartics2.eventTrack.subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        this.angulartics2.exceptionTrack.subscribe(function (x) { return _this.exceptionTrack(x); });
        this.angulartics2.setUsername.subscribe(function (x) { return _this.setUsername(x); });
    }
    Angulartics2GoogleTagManager.prototype.pageTrack = function (path) {
        if (typeof dataLayer !== 'undefined' && dataLayer) {
            dataLayer.push({
                'event': 'Page View',
                'content-name': path,
                'userId': this.angulartics2.settings.gtm.userId
            });
        }
    };
    /**
     * Send interactions to the dataLayer, i.e. for event tracking in Google Analytics
     * @name eventTrack
     *
     * @param {string} action Required 'action' (string) associated with the event
     * @param {object} properties Comprised of the mandatory field 'category' (string) and optional  fields 'label' (string), 'value' (integer) and 'noninteraction' (boolean)
     */
    Angulartics2GoogleTagManager.prototype.eventTrack = function (action, properties) {
        // Set a default GTM category
        properties = properties || {};
        if (typeof dataLayer !== 'undefined' && dataLayer) {
            dataLayer.push({
                event: properties.event || 'interaction',
                target: properties.category || 'Event',
                action: action,
                label: properties.label,
                value: properties.value,
                interactionType: properties.noninteraction,
                userId: this.angulartics2.settings.gtm.userId
            });
        }
    };
    /**
     * Exception Track Event in GTM
     * @name exceptionTrack
     *
     * @param {object} properties Comprised of the mandatory fields 'appId' (string), 'appName' (string) and 'appVersion' (string) and
     * optional  fields 'fatal' (boolean) and 'description' (string)
     */
    Angulartics2GoogleTagManager.prototype.exceptionTrack = function (properties) {
        if (!properties || !properties.appId || !properties.appName || !properties.appVersion) {
            console.error('Must be setted appId, appName and appVersion.');
            return;
        }
        if (properties.fatal === undefined) {
            console.log('No "fatal" provided, sending with fatal=true');
            properties.exFatal = true;
        }
        properties.exDescription = properties.event ? properties.event.stack : properties.description;
        this.eventTrack("Exception thrown for " + properties.appName + " <" + properties.appId + "@" + properties.appVersion + ">", {
            'category': 'Exception',
            'label': properties.exDescription
        });
    };
    /**
     * Set userId for use with Universal Analytics User ID feature
     * @name setUsername
     *
     * @param {string} userId Required 'userId' value (string) used to identify user cross-device in Google Analytics
     */
    Angulartics2GoogleTagManager.prototype.setUsername = function (userId) {
        this.angulartics2.settings.gtm.userId = userId;
    };
    Angulartics2GoogleTagManager = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [angulartics2_1.Angulartics2])
    ], Angulartics2GoogleTagManager);
    return Angulartics2GoogleTagManager;
}());
exports.Angulartics2GoogleTagManager = Angulartics2GoogleTagManager;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var angulartics2_1 = __webpack_require__(1);
var Angulartics2Kissmetrics = /** @class */ (function () {
    function Angulartics2Kissmetrics(angulartics2) {
        var _this = this;
        this.angulartics2 = angulartics2;
        if (typeof (_kmq) === 'undefined') {
            _kmq = [];
        }
        this.angulartics2.pageTrack.subscribe(function (x) { return _this.pageTrack(x.path, x.location); });
        this.angulartics2.eventTrack.subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        this.angulartics2.setUsername.subscribe(function (x) { return _this.setUsername(x); });
        this.angulartics2.setUserProperties.subscribe(function (x) { return _this.setUserProperties(x); });
    }
    Angulartics2Kissmetrics.prototype.pageTrack = function (path, location) {
        _kmq.push(['record', 'Pageview', { 'Page': path }]);
    };
    Angulartics2Kissmetrics.prototype.eventTrack = function (action, properties) {
        _kmq.push(['record', action, properties]);
    };
    Angulartics2Kissmetrics.prototype.setUsername = function (userId) {
        _kmq.push(['identify', userId]);
    };
    Angulartics2Kissmetrics.prototype.setUserProperties = function (properties) {
        _kmq.push(['set', properties]);
    };
    Angulartics2Kissmetrics = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [angulartics2_1.Angulartics2])
    ], Angulartics2Kissmetrics);
    return Angulartics2Kissmetrics;
}());
exports.Angulartics2Kissmetrics = Angulartics2Kissmetrics;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var angulartics2_1 = __webpack_require__(1);
var Angulartics2Mixpanel = /** @class */ (function () {
    function Angulartics2Mixpanel(angulartics2) {
        var _this = this;
        this.angulartics2 = angulartics2;
        this.angulartics2.pageTrack.subscribe(function (x) { return _this.pageTrack(x.path, x.location); });
        this.angulartics2.eventTrack.subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        this.angulartics2.setUsername.subscribe(function (x) { return _this.setUsername(x); });
        this.angulartics2.setUserProperties.subscribe(function (x) { return _this.setUserProperties(x); });
        this.angulartics2.setUserPropertiesOnce.subscribe(function (x) { return _this.setUserPropertiesOnce(x); });
        this.angulartics2.setSuperProperties.subscribe(function (x) { return _this.setSuperProperties(x); });
        this.angulartics2.setSuperPropertiesOnce.subscribe(function (x) { return _this.setSuperPropertiesOnce(x); });
        this.angulartics2.setAlias.subscribe(function (x) { return _this.setAlias(x); });
    }
    Angulartics2Mixpanel.prototype.pageTrack = function (path, location) {
        try {
            mixpanel.track('Page Viewed', { page: path });
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Mixpanel.prototype.eventTrack = function (action, properties) {
        try {
            mixpanel.track(action, properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Mixpanel.prototype.setUsername = function (userId) {
        try {
            mixpanel.identify(userId);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Mixpanel.prototype.setUserProperties = function (properties) {
        try {
            mixpanel.people.set(properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Mixpanel.prototype.setUserPropertiesOnce = function (properties) {
        try {
            mixpanel.people.set_once(properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Mixpanel.prototype.setSuperProperties = function (properties) {
        try {
            mixpanel.register(properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Mixpanel.prototype.setSuperPropertiesOnce = function (properties) {
        try {
            mixpanel.register_once(properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Mixpanel.prototype.setAlias = function (alias) {
        try {
            mixpanel.alias(alias);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Mixpanel = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [angulartics2_1.Angulartics2])
    ], Angulartics2Mixpanel);
    return Angulartics2Mixpanel;
}());
exports.Angulartics2Mixpanel = Angulartics2Mixpanel;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var angulartics2_1 = __webpack_require__(1);
var Angulartics2Piwik = /** @class */ (function () {
    function Angulartics2Piwik(angulartics2) {
        var _this = this;
        this.angulartics2 = angulartics2;
        if (typeof (_paq) === 'undefined') {
            console.warn('Piwik not found');
        }
        this.angulartics2.pageTrack.subscribe(function (x) { return _this.pageTrack(x.path, x.location); });
        this.angulartics2.eventTrack.subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        this.angulartics2.setUsername.subscribe(function (x) { return _this.setUsername(x); });
        this.angulartics2.setUserProperties.subscribe(function (x) { return _this.setUserProperties(x); });
    }
    Angulartics2Piwik.prototype.pageTrack = function (path, location) {
        try {
            _paq.push(['setDocumentTitle', window.document.title]);
            _paq.push(['setCustomUrl', path]);
            _paq.push(['trackPageView']);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Piwik.prototype.eventTrack = function (action, properties) {
        try {
            if (properties.value) {
                var parsed = parseInt(properties.value, 10);
                properties.value = isNaN(parsed) ? 0 : parsed;
            }
            _paq.push(['trackEvent', properties.category, action, properties.label, properties.value]);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Piwik.prototype.setUsername = function (userId) {
        try {
            _paq.push(['setUserId', userId]);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    /**
     * Sets custom dimensions if at least one property has the key "dimension<n>",
     * e.g. dimension10. If there are custom dimensions, any other property is ignored.
     *
     * If there are no custom dimensions in the given properties object, the properties
     * object is saved as a custom variable.
     *
     * If in doubt, prefer custom dimensions.
     * @see https://piwik.org/docs/custom-variables/
     */
    Angulartics2Piwik.prototype.setUserProperties = function (properties) {
        try {
            var dimensions = this.setCustomDimensions(properties);
            if (dimensions.length === 0) {
                _paq.push(['setCustomVariable', properties]);
            }
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Piwik.prototype.setCustomDimensions = function (properties) {
        var dimensionRegex = /dimension[1-9]\d*/;
        var dimensions = Object.keys(properties).filter(function (key) { return dimensionRegex.exec(key); });
        dimensions.forEach(function (dimension) {
            var number = Number(dimension.substr(9));
            _paq.push(['setCustomDimension', number, properties[dimension]]);
        });
        return dimensions;
    };
    Angulartics2Piwik = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [angulartics2_1.Angulartics2])
    ], Angulartics2Piwik);
    return Angulartics2Piwik;
}());
exports.Angulartics2Piwik = Angulartics2Piwik;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var angulartics2_1 = __webpack_require__(1);
var Angulartics2Segment = /** @class */ (function () {
    function Angulartics2Segment(angulartics2) {
        var _this = this;
        this.angulartics2 = angulartics2;
        this.angulartics2.pageTrack.subscribe(function (x) { return _this.pageTrack(x.path, x.location); });
        this.angulartics2.eventTrack.subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        this.angulartics2.setUserProperties.subscribe(function (x) { return _this.setUserProperties(x); });
        this.angulartics2.setUserPropertiesOnce.subscribe(function (x) { return _this.setUserProperties(x); });
        this.angulartics2.setAlias.subscribe(function (x) { return _this.setAlias(x); });
    }
    // https://segment.com/docs/libraries/analytics.js/#page
    // analytics.page([category], [name], [properties], [options], [callback]);
    // TODO : Support optional parameters where the parameter order and type changes their meaning
    // e.g.
    // (string) is (name)
    // (string, string) is (category, name)
    // (string, object) is (name, properties)
    Angulartics2Segment.prototype.pageTrack = function (path, location) {
        try {
            analytics.page(path);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    // https://segment.com/docs/libraries/analytics.js/#track
    // analytics.track(event, [properties], [options], [callback]);
    Angulartics2Segment.prototype.eventTrack = function (action, properties) {
        try {
            analytics.track(action, properties);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    // https://segment.com/docs/libraries/analytics.js/#identify
    // analytics.identify([userId], [traits], [options], [callback]);
    Angulartics2Segment.prototype.setUserProperties = function (properties) {
        try {
            if (properties.userId) {
                analytics.identify(properties.userId, properties);
            }
            else {
                analytics.identify(properties);
            }
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    // https://segment.com/docs/libraries/analytics.js/#alias
    // analytics.alias(userId, previousId, options, callback);
    Angulartics2Segment.prototype.setAlias = function (alias) {
        try {
            analytics.alias(alias);
        }
        catch (e) {
            if (!(e instanceof ReferenceError)) {
                throw e;
            }
        }
    };
    Angulartics2Segment = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [angulartics2_1.Angulartics2])
    ], Angulartics2Segment);
    return Angulartics2Segment;
}());
exports.Angulartics2Segment = Angulartics2Segment;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var angulartics2_1 = __webpack_require__(1);
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
    Angulartics2Facebook = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [angulartics2_1.Angulartics2])
    ], Angulartics2Facebook);
    return Angulartics2Facebook;
}());
exports.Angulartics2Facebook = Angulartics2Facebook;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var angulartics2_1 = __webpack_require__(1);
var platform_browser_1 = __webpack_require__(2);
var router_1 = __webpack_require__(4);
var Angulartics2AppInsights = /** @class */ (function () {
    function Angulartics2AppInsights(angulartics2, title, router) {
        var _this = this;
        this.angulartics2 = angulartics2;
        this.title = title;
        this.router = router;
        this.loadStartTime = null;
        this.loadTime = null;
        this.metrics = null;
        this.dimensions = null;
        this.measurements = null;
        if (typeof (appInsights) === 'undefined') {
            console.warn('appInsights not found');
        }
        this.angulartics2.settings.appInsights = {
            userId: null
        };
        this.angulartics2.pageTrack.subscribe(function (x) { return _this.pageTrack(x.path); });
        this.angulartics2.eventTrack.subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        this.angulartics2.exceptionTrack.subscribe(function (x) { return _this.exceptionTrack(x); });
        this.angulartics2.setUsername.subscribe(function (x) { return _this.setUsername(x); });
        this.angulartics2.setUserProperties.subscribe(function (x) { return _this.setUserProperties(x); });
        this.router.events
            .filter(function (event) { return event instanceof router_1.NavigationStart; })
            .subscribe(function (event) { return _this.startTimer(); });
        this.router.events
            .filter(function (event) {
            return (event instanceof router_1.NavigationError) ||
                (event instanceof router_1.NavigationEnd);
        })
            .subscribe(function (error) { return _this.stopTimer(); });
    }
    Angulartics2AppInsights.prototype.startTimer = function () {
        this.loadStartTime = Date.now();
        this.loadTime = null;
    };
    Angulartics2AppInsights.prototype.stopTimer = function () {
        this.loadTime = Date.now() - this.loadStartTime;
        this.loadStartTime = null;
    };
    /**
     * Page Track in Baidu Analytics
     * @name pageTrack
     *
     * @param {string} path Required 'path' (string)
     *
     * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackpageview
     *
     */
    Angulartics2AppInsights.prototype.pageTrack = function (path) {
        appInsights.trackPageView(this.title.getTitle(), path, this.dimensions, this.metrics, this.loadTime);
    };
    /**
     * Log a user action or other occurrence.
     * @param   name    A string to identify this event in the portal.
     *
     * @param   properties  map[string, string] - additional data used to filter events and metrics in the portal. Defaults to empty.
     *
     * @https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackevent
     */
    Angulartics2AppInsights.prototype.eventTrack = function (name, properties) {
        appInsights.trackEvent(name, properties, this.measurements);
    };
    /**
     * Exception Track Event in GA
     * @name exceptionTrack
     *
     * @param {any} properties Comprised of the mandatory fields 'appId' (string), 'appName' (string) and 'appVersion' (string) and
     * optional  fields 'fatal' (boolean) and 'description' (string), error
     *
     * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackexception
     */
    Angulartics2AppInsights.prototype.exceptionTrack = function (properties) {
        var description = properties.event || properties.description || properties;
        appInsights.trackException(description);
    };
    /**
     *
     * @param userId
     *
     * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#setauthenticatedusercontext
     */
    Angulartics2AppInsights.prototype.setUsername = function (userId) {
        this.angulartics2.settings.appInsights.userId = userId;
        appInsights.setAuthenticatedUserContext(userId);
    };
    Angulartics2AppInsights.prototype.setUserProperties = function (properties) {
        if (properties.userId) {
            this.angulartics2.settings.appInsights.userId = properties.userId;
        }
        if (properties.accountId) {
            appInsights.setAuthenticatedUserContext(this.angulartics2.settings.appInsights.userId, properties.accountId);
        }
    };
    Angulartics2AppInsights = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [angulartics2_1.Angulartics2,
            platform_browser_1.Title,
            router_1.Router])
    ], Angulartics2AppInsights);
    return Angulartics2AppInsights;
}());
exports.Angulartics2AppInsights = Angulartics2AppInsights;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var angulartics2_1 = __webpack_require__(1);
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
    Angulartics2Hubspot = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [angulartics2_1.Angulartics2])
    ], Angulartics2Hubspot);
    return Angulartics2Hubspot;
}());
exports.Angulartics2Hubspot = Angulartics2Hubspot;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var common_1 = __webpack_require__(3);
var angulartics2_1 = __webpack_require__(1);
var Angulartics2AdobeAnalytics = /** @class */ (function () {
    function Angulartics2AdobeAnalytics(angulartics2, location) {
        var _this = this;
        this.angulartics2 = angulartics2;
        this.location = location;
        this.angulartics2.settings.pageTracking.trackRelativePath = true;
        this.angulartics2.pageTrack.subscribe(function (x) { return _this.pageTrack(x.path); });
        this.angulartics2.eventTrack.subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
        this.angulartics2.setUserProperties.subscribe(function (x) { return _this.setUserProperties(x); });
    }
    Angulartics2AdobeAnalytics.prototype.pageTrack = function (path) {
        if (typeof s !== 'undefined' && s) {
            s.clearVars();
            s.t({ pageName: path });
        }
    };
    /**
     * Track Event in Adobe Analytics
     * @name eventTrack
     *
     * @param {string} action Required 'action' (string) associated with the event
     * @param {object} properties Comprised of the mandatory field 'category' (string) and optional  fields 'label' (string), 'value' (integer) and 'noninteraction' (boolean)
     *
     * @link https://marketing.adobe.com/resources/help/en_US/sc/implement/js_implementation.html
     */
    Angulartics2AdobeAnalytics.prototype.eventTrack = function (action, properties) {
        if (!properties) {
            properties = properties || {};
        }
        if (typeof s !== 'undefined' && s) {
            if (typeof properties === 'object') {
                this.setUserProperties(properties);
            }
            if (action) {
                // if linkName property is passed, use that; otherwise, the action is the linkName
                var linkName = (properties['linkName']) ? properties['linkName'] : action;
                // note that 'this' should refer the link element, but we can't get that in this function. example:
                // <a href="http://anothersite.com" onclick="s.tl(this,'e','AnotherSite',null)">
                // if disableDelay property is passed, use that to turn off/on the 500ms delay; otherwise, it uses this
                var disableDelay = !!properties['disableDelay'] ? true : this;
                // if action property is passed, use that; otherwise, the action remains unchanged
                if (properties['action']) {
                    action = properties['action'];
                }
                this.setPageName();
                if (action.toUpperCase() === "DOWNLOAD") {
                    s.tl(disableDelay, 'd', linkName);
                }
                else if (action.toUpperCase() === "EXIT") {
                    s.tl(disableDelay, 'e', linkName);
                }
                else {
                    s.tl(disableDelay, 'o', linkName);
                }
            }
        }
    };
    Angulartics2AdobeAnalytics.prototype.setPageName = function () {
        var path = this.location.path(true);
        var hashNdx = path.indexOf('#');
        if (hashNdx > 0 && hashNdx < path.length) {
            s.pageName = path.substring(hashNdx + 1);
        }
        else {
            s.pageName = path;
        }
    };
    Angulartics2AdobeAnalytics.prototype.setUserProperties = function (properties) {
        if (typeof s !== 'undefined' && s) {
            if (typeof properties === 'object') {
                for (var key in properties) {
                    if (properties.hasOwnProperty(key)) {
                        s[key] = properties[key];
                    }
                }
            }
        }
    };
    Angulartics2AdobeAnalytics = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [angulartics2_1.Angulartics2,
            common_1.Location])
    ], Angulartics2AdobeAnalytics);
    return Angulartics2AdobeAnalytics;
}());
exports.Angulartics2AdobeAnalytics = Angulartics2AdobeAnalytics;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(0);
var platform_browser_1 = __webpack_require__(2);
var angulartics2_1 = __webpack_require__(1);
var Angulartics2Clicky = /** @class */ (function () {
    function Angulartics2Clicky(angulartics2, titleService) {
        var _this = this;
        this.angulartics2 = angulartics2;
        this.titleService = titleService;
        if (typeof (clicky) === 'undefined') {
            console.warn('Angulartics 2 Clicky Plugin: clicky global not found');
        }
        this.angulartics2.pageTrack.subscribe(function (x) { return _this.pageTrack(x.path); });
        this.angulartics2.eventTrack.subscribe(function (x) { return _this.eventTrack(x.action, x.properties); });
    }
    Angulartics2Clicky.prototype.pageTrack = function (path) {
        var title = this.titleService.getTitle();
        clicky.log(path, title, 'pageview');
    };
    Angulartics2Clicky.prototype.eventTrack = function (action, properties) {
        if (typeof (properties.goal) === 'undefined') {
            var title = properties.title || null;
            var type = (properties.eventType != null) ? this.validateType(properties.eventType) : null;
            clicky.log(action, title, type);
        }
        else {
            var goalId = properties.goal;
            var revenue = this.validateNumber(properties.revenue) ? properties.revenue : null;
            var noQueue = !!properties.noQueue;
            clicky.goal(goalId, revenue, noQueue);
        }
    };
    Angulartics2Clicky.prototype.validateType = function (type) {
        var TYPE_ENUM = ['click', 'download', 'outbound', 'pageview'];
        return (TYPE_ENUM.indexOf(type) >= 0) ? type : 'pageview';
    };
    Angulartics2Clicky.prototype.validateNumber = function (number) {
        return typeof number === 'number' && isFinite(number);
    };
    Angulartics2Clicky = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [angulartics2_1.Angulartics2,
            platform_browser_1.Title])
    ], Angulartics2Clicky);
    return Angulartics2Clicky;
}());
exports.Angulartics2Clicky = Angulartics2Clicky;


/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAxNGM3YzIzODE3MDZlODEwM2E3ZiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAYW5ndWxhci9jb3JlXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvcmUvYW5ndWxhcnRpY3MyLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcIkBhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXJcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAYW5ndWxhci9jb21tb25cIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAYW5ndWxhci9yb3V0ZXJcIiIsIndlYnBhY2s6Ly8vLi9zcmMvY29yZS9hbmd1bGFydGljczJPbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicnhqcy9SZXBsYXlTdWJqZWN0XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicnhqcy9hZGQvb3BlcmF0b3IvZmlsdGVyXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb3ZpZGVycy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvdmlkZXJzL2JhaWR1L2FuZ3VsYXJ0aWNzMi1iYWlkdS1hbmFseXRpY3MudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb3ZpZGVycy9nYS9hbmd1bGFydGljczItZ2EudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb3ZpZGVycy9ndG0vYW5ndWxhcnRpY3MyLWd0bS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvdmlkZXJzL2tpc3NtZXRyaWNzL2FuZ3VsYXJ0aWNzMi1raXNzbWV0cmljcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvdmlkZXJzL21peHBhbmVsL2FuZ3VsYXJ0aWNzMi1taXhwYW5lbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvdmlkZXJzL3Bpd2lrL2FuZ3VsYXJ0aWNzMi1waXdpay50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHJvdmlkZXJzL3NlZ21lbnQvYW5ndWxhcnRpY3MyLXNlZ21lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb3ZpZGVycy9mYWNlYm9vay9hbmd1bGFydGljczItZmFjZWJvb2sudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb3ZpZGVycy9hcHBpbnNpZ2h0cy9hbmd1bGFydGljczItYXBwaW5zaWdodHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb3ZpZGVycy9odWJzcG90L2FuZ3VsYXJ0aWNzMi1odWJzcG90LnRzIiwid2VicGFjazovLy8uL3NyYy9wcm92aWRlcnMvYWRvYmVhbmFseXRpY3MvYW5ndWxhcnRpY3MyLWFkb2JlYW5hbHl0aWNzLnRzIiwid2VicGFjazovLy8uL3NyYy9wcm92aWRlcnMvY2xpY2t5L2FuZ3VsYXJ0aWNzMi1jbGlja3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQzdEQSwrQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUEsb0NBQTJDO0FBQzNDLDZDQUFtRDtBQUNuRCxzQ0FBMkM7QUFDM0Msc0NBQXdEO0FBQ3hELHVCQUFrQztBQUdsQztJQTZERSxzQkFB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SztPQUp0QixrQkFBa0IsQ0F3QzlCO0lBQUQseUJBQUM7Q0FBQTtBQXhDWSxnREFBa0IiLCJmaWxlIjoiY29yZS51bWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJAYW5ndWxhci9jb3JlXCIpLCByZXF1aXJlKFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3NlclwiKSwgcmVxdWlyZShcIkBhbmd1bGFyL2NvbW1vblwiKSwgcmVxdWlyZShcIkBhbmd1bGFyL3JvdXRlclwiKSwgcmVxdWlyZShcInJ4anMvUmVwbGF5U3ViamVjdFwiKSwgcmVxdWlyZShcInJ4anMvYWRkL29wZXJhdG9yL2ZpbHRlclwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJAYW5ndWxhci9jb3JlXCIsIFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3NlclwiLCBcIkBhbmd1bGFyL2NvbW1vblwiLCBcIkBhbmd1bGFyL3JvdXRlclwiLCBcInJ4anMvUmVwbGF5U3ViamVjdFwiLCBcInJ4anMvYWRkL29wZXJhdG9yL2ZpbHRlclwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJuZ3gtdHJhbnNsYXRlLWNvcmVcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJAYW5ndWxhci9jb3JlXCIpLCByZXF1aXJlKFwiQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3NlclwiKSwgcmVxdWlyZShcIkBhbmd1bGFyL2NvbW1vblwiKSwgcmVxdWlyZShcIkBhbmd1bGFyL3JvdXRlclwiKSwgcmVxdWlyZShcInJ4anMvUmVwbGF5U3ViamVjdFwiKSwgcmVxdWlyZShcInJ4anMvYWRkL29wZXJhdG9yL2ZpbHRlclwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wibmd4LXRyYW5zbGF0ZS1jb3JlXCJdID0gZmFjdG9yeShyb290W1wiQGFuZ3VsYXIvY29yZVwiXSwgcm9vdFtcIkBhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXJcIl0sIHJvb3RbXCJAYW5ndWxhci9jb21tb25cIl0sIHJvb3RbXCJAYW5ndWxhci9yb3V0ZXJcIl0sIHJvb3RbXCJyeGpzL1JlcGxheVN1YmplY3RcIl0sIHJvb3RbXCJyeGpzL2FkZC9vcGVyYXRvci9maWx0ZXJcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8wX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzNfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV80X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfN19fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzhfXykge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMTRjN2MyMzgxNzA2ZTgxMDNhN2YiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMF9fO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiQGFuZ3VsYXIvY29yZVwiXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUmVwbGF5U3ViamVjdCB9IGZyb20gJ3J4anMvUmVwbGF5U3ViamVjdCc7XHJcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRW5kIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9maWx0ZXInO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQW5ndWxhcnRpY3MyIHtcclxuICBwdWJsaWMgc2V0dGluZ3M6IGFueSA9IHtcclxuICAgIHBhZ2VUcmFja2luZzoge1xyXG4gICAgICBhdXRvVHJhY2tWaXJ0dWFsUGFnZXM6IHRydWUsXHJcbiAgICAgIGJhc2VQYXRoOiAnJyxcclxuICAgICAgZXhjbHVkZWRSb3V0ZXM6IFtdXHJcbiAgICB9LFxyXG4gICAgZXZlbnRUcmFja2luZzoge30sXHJcbiAgICBkZXZlbG9wZXJNb2RlOiBmYWxzZVxyXG4gIH07XHJcblxyXG4gIC8qXHJcbiAgICBAUGFyYW06ICh7dXJsOiBzdHJpbmcsIGxvY2F0aW9uOiBMb2NhdGlvbn0pXHJcbiAgICovXHJcbiAgcHVibGljIHBhZ2VUcmFjazogUmVwbGF5U3ViamVjdDxhbnk+ID0gbmV3IFJlcGxheVN1YmplY3QoMTApO1xyXG5cclxuICAvKlxyXG4gICAgQFBhcmFtOiAoe2FjdGlvbjogYW55LCBwcm9wZXJ0aWVzOiBhbnl9KVxyXG4gICAqL1xyXG4gIHB1YmxpYyBldmVudFRyYWNrOiBSZXBsYXlTdWJqZWN0PGFueT4gPSBuZXcgUmVwbGF5U3ViamVjdCgxMCk7XHJcblxyXG4gIC8qXHJcbiAgICBAUGFyYW06IChwcm9wZXJ0aWVzOiBhbnkpXHJcbiAgICovXHJcbiAgcHVibGljIGV4Y2VwdGlvblRyYWNrOiBSZXBsYXlTdWJqZWN0PGFueT4gPSBuZXcgUmVwbGF5U3ViamVjdCgxMCk7XHJcblxyXG4gIC8qXHJcbiAgICBAUGFyYW06IChhbGlhczogc3RyaW5nKVxyXG4gICAqL1xyXG4gIHB1YmxpYyBzZXRBbGlhczogUmVwbGF5U3ViamVjdDxhbnk+ID0gbmV3IFJlcGxheVN1YmplY3QoMTApO1xyXG5cclxuICAvKlxyXG4gICAgQFBhcmFtOiAodXNlcklkOiBzdHJpbmcpXHJcbiAgICovXHJcbiAgcHVibGljIHNldFVzZXJuYW1lOiBSZXBsYXlTdWJqZWN0PGFueT4gPSBuZXcgUmVwbGF5U3ViamVjdCgxMCk7XHJcblxyXG4gIC8qXHJcbiAgICBAUGFyYW06ICh7YWN0aW9uOiBhbnksIHByb3BlcnRpZXM6IGFueX0pXHJcbiAgICovXHJcbiAgcHVibGljIHNldFVzZXJQcm9wZXJ0aWVzOiBSZXBsYXlTdWJqZWN0PGFueT4gPSBuZXcgUmVwbGF5U3ViamVjdCgxMCk7XHJcblxyXG4gIC8qXHJcbiAgICBAUGFyYW06IChwcm9wZXJ0aWVzOiBhbnkpXHJcbiAgICovXHJcbiAgcHVibGljIHNldFVzZXJQcm9wZXJ0aWVzT25jZTogUmVwbGF5U3ViamVjdDxhbnk+ID0gbmV3IFJlcGxheVN1YmplY3QoMTApO1xyXG5cclxuICAvKlxyXG4gICAgQFBhcmFtOiAocHJvcGVydGllczogYW55KVxyXG4gICAqL1xyXG4gIHB1YmxpYyBzZXRTdXBlclByb3BlcnRpZXM6IFJlcGxheVN1YmplY3Q8YW55PiA9IG5ldyBSZXBsYXlTdWJqZWN0KDEwKTtcclxuXHJcbiAgLypcclxuICAgIEBQYXJhbTogKHByb3BlcnRpZXM6IGFueSlcclxuICAgKi9cclxuICBwdWJsaWMgc2V0U3VwZXJQcm9wZXJ0aWVzT25jZTogUmVwbGF5U3ViamVjdDxhbnk+ID0gbmV3IFJlcGxheVN1YmplY3QoMTApO1xyXG5cclxuICAvKlxyXG4gICAgQFBhcmFtOiAocHJvcGVydGllczogYW55KVxyXG4gICAqL1xyXG4gIHB1YmxpYyB1c2VyVGltaW5nczogUmVwbGF5U3ViamVjdDxhbnk+ID0gbmV3IFJlcGxheVN1YmplY3QoMTApO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihsb2NhdGlvbjogTG9jYXRpb24sIHJvdXRlcjogUm91dGVyKSB7XHJcbiAgICB0aGlzLnRyYWNrTG9jYXRpb24obG9jYXRpb24sIHJvdXRlcik7XHJcbiAgfVxyXG5cclxuICB0cmFja0xvY2F0aW9uKGxvY2F0aW9uOiBMb2NhdGlvbiwgcm91dGVyOiBSb3V0ZXIpIHtcclxuICAgIHJvdXRlci5ldmVudHNcclxuICAgICAgLmZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpXHJcbiAgICAgIC5zdWJzY3JpYmUoKGV2ZW50OiBOYXZpZ2F0aW9uRW5kKSA9PiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLmRldmVsb3Blck1vZGUpIHtcclxuICAgICAgICAgIHRoaXMudHJhY2tVcmxDaGFuZ2UoZXZlbnQudXJsQWZ0ZXJSZWRpcmVjdHMsIGxvY2F0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdmlydHVhbFBhZ2V2aWV3cyh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5zZXR0aW5ncy5wYWdlVHJhY2tpbmcuYXV0b1RyYWNrVmlydHVhbFBhZ2VzID0gdmFsdWU7XHJcbiAgfVxyXG4gIGV4Y2x1ZGVSb3V0ZXMocm91dGVzOiBBcnJheTxzdHJpbmd8UmVnRXhwPikge1xyXG4gICAgdGhpcy5zZXR0aW5ncy5wYWdlVHJhY2tpbmcuZXhjbHVkZWRSb3V0ZXMgPSByb3V0ZXM7XHJcbiAgfVxyXG4gIGZpcnN0UGFnZXZpZXcodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuc2V0dGluZ3MucGFnZVRyYWNraW5nLmF1dG9UcmFja0ZpcnN0UGFnZSA9IHZhbHVlO1xyXG4gIH1cclxuICB3aXRoQmFzZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnNldHRpbmdzLnBhZ2VUcmFja2luZy5iYXNlUGF0aCA9ICh2YWx1ZSk7XHJcbiAgfVxyXG4gIGRldmVsb3Blck1vZGUodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuc2V0dGluZ3MuZGV2ZWxvcGVyTW9kZSA9IHZhbHVlO1xyXG4gIH1cclxuICBcclxuICBwcm90ZWN0ZWQgdHJhY2tVcmxDaGFuZ2UodXJsOiBzdHJpbmcsIGxvY2F0aW9uOiBMb2NhdGlvbikge1xyXG4gICAgaWYgKCF0aGlzLnNldHRpbmdzLmRldmVsb3Blck1vZGUpIHtcclxuICAgICAgaWYgKHRoaXMuc2V0dGluZ3MucGFnZVRyYWNraW5nLmF1dG9UcmFja1ZpcnR1YWxQYWdlcyAmJiAhdGhpcy5tYXRjaGVzRXhjbHVkZWRSb3V0ZSh1cmwpKSB7XHJcbiAgICAgICAgdGhpcy5wYWdlVHJhY2submV4dCh7XHJcbiAgICAgICAgICBwYXRoOiB0aGlzLnNldHRpbmdzLnBhZ2VUcmFja2luZy5iYXNlUGF0aC5sZW5ndGggPyB0aGlzLnNldHRpbmdzLnBhZ2VUcmFja2luZy5iYXNlUGF0aCArIHVybCA6IGxvY2F0aW9uLnByZXBhcmVFeHRlcm5hbFVybCh1cmwpLFxyXG4gICAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBtYXRjaGVzRXhjbHVkZWRSb3V0ZSh1cmw6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgZm9yIChsZXQgZXhjbHVkZWRSb3V0ZSBvZiB0aGlzLnNldHRpbmdzLnBhZ2VUcmFja2luZy5leGNsdWRlZFJvdXRlcykge1xyXG4gICAgICBpZiAoKGV4Y2x1ZGVkUm91dGUgaW5zdGFuY2VvZiBSZWdFeHAgJiYgZXhjbHVkZWRSb3V0ZS50ZXN0KHVybCkpIHx8IHVybC5pbmRleE9mKGV4Y2x1ZGVkUm91dGUpID4gLTEpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9jb3JlL2FuZ3VsYXJ0aWNzMi50cyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX187XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyXCJcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzNfXztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIkBhbmd1bGFyL2NvbW1vblwiXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV80X187XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJAYW5ndWxhci9yb3V0ZXJcIlxuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBEaXJlY3RpdmUsIEluamVjdGFibGUsIElucHV0LCBFbGVtZW50UmVmLCBBZnRlckNvbnRlbnRJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEV2ZW50TWFuYWdlciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG4vLyBpbXBvcnQgeyBnZXRET00gfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL3NyYy9kb20vZG9tX2FkYXB0ZXInO1xyXG5cclxuaW1wb3J0IHsgQW5ndWxhcnRpY3MyIH0gZnJvbSAnLi9hbmd1bGFydGljczInO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1thbmd1bGFydGljczJPbl0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBbmd1bGFydGljczJPbiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xyXG4gIEBJbnB1dCgnYW5ndWxhcnRpY3MyT24nKSBhbmd1bGFydGljczJPbjogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGFuZ3VsYXJ0aWNzRXZlbnQ6IHN0cmluZztcclxuICBASW5wdXQoKSBhbmd1bGFydGljc0NhdGVnb3J5OiBzdHJpbmc7XHJcbiAgQElucHV0KCkgYW5ndWxhcnRpY3NQcm9wZXJ0aWVzOiBhbnk7XHJcblxyXG4gIHByaXZhdGUgZWw6IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGVsUmVmOiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSBhbmd1bGFydGljczI6IEFuZ3VsYXJ0aWNzMixcclxuICAgIHByaXZhdGUgZXZlbnRNYW5hZ2VyOiBFdmVudE1hbmFnZXJcclxuICApIHtcclxuICAgIHRoaXMuZWwgPSB0aGlzLmVsUmVmLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICAvLyBEb24ndCBsaXN0ZW4gaW4gc2VydmVyLXNpZGVcclxuICAgIGlmICh0aGlzLmlzQnJvd3NlcigpKSB7XHJcbiAgICAgIHRoaXMuZXZlbnRNYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIodGhpcy5lbCwgdGhpcy5hbmd1bGFydGljczJPbiB8fCAnY2xpY2snLCAoZXZlbnQ6IGFueSkgPT4gdGhpcy5ldmVudFRyYWNrKGV2ZW50KSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaXNCcm93c2VyKCkge1xyXG4gICAgcmV0dXJuIHR5cGVvZih3aW5kb3cpICE9PSAndW5kZWZpbmVkJztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBldmVudFRyYWNrKGV2ZW50OiBhbnkpIHtcclxuICAgIGNvbnN0IGFjdGlvbiA9IHRoaXMuYW5ndWxhcnRpY3NFdmVudDsgLy8gfHwgdGhpcy5pbmZlckV2ZW50TmFtZSgpO1xyXG4gICAgbGV0IHByb3BlcnRpZXM6IGFueSA9IHtcclxuICAgICAgZXZlbnRUeXBlOiBldmVudC50eXBlXHJcbiAgICB9O1xyXG5cclxuICAgIGlmICh0aGlzLmFuZ3VsYXJ0aWNzQ2F0ZWdvcnkpIHtcclxuICAgICAgcHJvcGVydGllcy5jYXRlZ29yeSA9IHRoaXMuYW5ndWxhcnRpY3NDYXRlZ29yeTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBbGxvdyBjb21wb25lbnRzIHRvIHBhc3MgdGhyb3VnaCBhbiBleHByZXNzaW9uIHRoYXQgZ2V0cyBtZXJnZWQgb24gdG8gdGhlIGV2ZW50IHByb3BlcnRpZXNcclxuICAgIC8vIGVnLiBhbmd1bGFydGljcy1wcm9wZXJpdGVzPSdteUNvbXBvbmVudFNjb3BlLnNvbWVDb25maWdFeHByZXNzaW9uLiRhbmd1bGFydGljc1Byb3BlcnRpZXMnXHJcbiAgICBpZiAodGhpcy5hbmd1bGFydGljc1Byb3BlcnRpZXMpIHtcclxuICAgICAgT2JqZWN0LmFzc2lnbihwcm9wZXJ0aWVzLCB0aGlzLmFuZ3VsYXJ0aWNzUHJvcGVydGllcyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hbmd1bGFydGljczIuZXZlbnRUcmFjay5uZXh0KHtcclxuICAgICAgYWN0aW9uLFxyXG4gICAgICBwcm9wZXJ0aWVzXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qcHJpdmF0ZSBpc0NvbW1hbmQoKSB7XHJcbiAgICByZXR1cm4gWydhOicsICdidXR0b246JywgJ2J1dHRvbjpidXR0b24nLCAnYnV0dG9uOnN1Ym1pdCcsICdpbnB1dDpidXR0b24nLCAnaW5wdXQ6c3VibWl0J10uaW5kZXhPZihcclxuICAgICAgZ2V0RE9NKCkudGFnTmFtZSh0aGlzLmVsKS50b0xvd2VyQ2FzZSgpICsgJzonICsgKGdldERPTSgpLnR5cGUodGhpcy5lbCkgfHwgJycpKSA+PSAwO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbmZlckV2ZW50TmFtZSgpIHtcclxuICAgIGlmICh0aGlzLmlzQ29tbWFuZCgpKSByZXR1cm4gZ2V0RE9NKCkuZ2V0VGV4dCh0aGlzLmVsKSB8fCBnZXRET00oKS5nZXRWYWx1ZSh0aGlzLmVsKTtcclxuICAgIHJldHVybiBnZXRET00oKS5nZXRQcm9wZXJ0eSh0aGlzLmVsLCAnaWQnKSB8fCBnZXRET00oKS5nZXRQcm9wZXJ0eSh0aGlzLmVsLCAnbmFtZScpIHx8IGdldERPTSgpLnRhZ05hbWUodGhpcy5lbCk7XHJcbiAgfSovXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvY29yZS9hbmd1bGFydGljczJPbi50cyIsImltcG9ydCB7XHJcbiAgTmdNb2R1bGUsXHJcbiAgTW9kdWxlV2l0aFByb3ZpZGVycyxcclxuICBJbmplY3QsXHJcbiAgT3B0aW9uYWwsXHJcbiAgSW5qZWN0aW9uVG9rZW4sXHJcbiAgU2tpcFNlbGZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEFuZ3VsYXJ0aWNzMiB9IGZyb20gJy4vY29yZS9hbmd1bGFydGljczInO1xyXG5pbXBvcnQgeyBBbmd1bGFydGljczJPbiB9IGZyb20gJy4vY29yZS9hbmd1bGFydGljczJPbic7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL2NvcmUvYW5ndWxhcnRpY3MyJztcclxuZXhwb3J0ICogZnJvbSAnLi9jb3JlL2FuZ3VsYXJ0aWNzMk9uJztcclxuZXhwb3J0ICogZnJvbSAnLi9wcm92aWRlcnMvaW5kZXgnO1xyXG5cclxuZXhwb3J0IGNvbnN0IEFOR1VMQVJUSUNTMl9GT1JST09UX0dVQVJEID0gbmV3IEluamVjdGlvblRva2VuKCdBTkdVTEFSVElDUzJfRk9SUk9PVF9HVUFSRCcpO1xyXG5leHBvcnQgZnVuY3Rpb24gcHJvdmlkZUZvclJvb3RHdWFyZChhbmd1bGFydGljczI6IEFuZ3VsYXJ0aWNzMik6IGFueSB7XHJcbiAgaWYgKGFuZ3VsYXJ0aWNzMikge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICBgQW5ndWxhcnRpY3MyTW9kdWxlLmZvclJvb3QoKSBjYWxsZWQgdHdpY2UuIExhenkgbG9hZGVkIG1vZHVsZXMgc2hvdWxkIHVzZSBBbmd1bGFydGljczJNb2R1bGUuZm9yQ2hpbGQoKSBpbnN0ZWFkLmApO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuICdndWFyZGVkJztcclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICBkZWNsYXJhdGlvbnM6IFsgQW5ndWxhcnRpY3MyT24gXSxcclxuICBleHBvcnRzOiBbIEFuZ3VsYXJ0aWNzMk9uIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJ0aWNzMk1vZHVsZSB7XHJcbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQEluamVjdChBTkdVTEFSVElDUzJfRk9SUk9PVF9HVUFSRCkgZ3VhcmQ6IGFueSkge31cclxuXHJcbiAgc3RhdGljIGZvclJvb3QocHJvdmlkZXJzOiBBcnJheTxhbnk+KTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogQW5ndWxhcnRpY3MyTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwcm92aWRlOiBBTkdVTEFSVElDUzJfRk9SUk9PVF9HVUFSRCxcclxuICAgICAgICAgIHVzZUZhY3Rvcnk6IHByb3ZpZGVGb3JSb290R3VhcmQsXHJcbiAgICAgICAgICBkZXBzOiBbW0FuZ3VsYXJ0aWNzMiwgbmV3IE9wdGlvbmFsKCksIG5ldyBTa2lwU2VsZigpXV1cclxuICAgICAgICB9LFxyXG4gICAgICAgIEFuZ3VsYXJ0aWNzMixcclxuICAgICAgICAuLi5wcm92aWRlcnNcclxuICAgICAgXVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBmb3JDaGlsZCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBBbmd1bGFydGljczJNb2R1bGUsXHJcbiAgICAgIHByb3ZpZGVyczogW11cclxuICAgIH07XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL2luZGV4LnRzIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzdfXztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJ4anMvUmVwbGF5U3ViamVjdFwiXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV84X187XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyeGpzL2FkZC9vcGVyYXRvci9maWx0ZXJcIlxuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgKiBmcm9tICcuL2JhaWR1L2FuZ3VsYXJ0aWNzMi1iYWlkdS1hbmFseXRpY3MnO1xyXG5leHBvcnQgKiBmcm9tICcuL2dhL2FuZ3VsYXJ0aWNzMi1nYSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vZ3RtL2FuZ3VsYXJ0aWNzMi1ndG0nO1xyXG5leHBvcnQgKiBmcm9tICcuL2tpc3NtZXRyaWNzL2FuZ3VsYXJ0aWNzMi1raXNzbWV0cmljcyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vbWl4cGFuZWwvYW5ndWxhcnRpY3MyLW1peHBhbmVsJztcclxuZXhwb3J0ICogZnJvbSAnLi9waXdpay9hbmd1bGFydGljczItcGl3aWsnO1xyXG5leHBvcnQgKiBmcm9tICcuL3NlZ21lbnQvYW5ndWxhcnRpY3MyLXNlZ21lbnQnO1xyXG5leHBvcnQgKiBmcm9tICcuL2ZhY2Vib29rL2FuZ3VsYXJ0aWNzMi1mYWNlYm9vayc7XHJcbmV4cG9ydCAqIGZyb20gJy4vYXBwaW5zaWdodHMvYW5ndWxhcnRpY3MyLWFwcGluc2lnaHRzJztcclxuZXhwb3J0ICogZnJvbSAnLi9odWJzcG90L2FuZ3VsYXJ0aWNzMi1odWJzcG90JztcclxuZXhwb3J0ICogZnJvbSAnLi9hZG9iZWFuYWx5dGljcy9hbmd1bGFydGljczItYWRvYmVhbmFseXRpY3MnO1xyXG5leHBvcnQgKiBmcm9tICcuL2NsaWNreS9hbmd1bGFydGljczItY2xpY2t5JztcclxuXHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL3Byb3ZpZGVycy9pbmRleC50cyIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEFuZ3VsYXJ0aWNzMiB9IGZyb20gJy4uLy4uL2NvcmUvYW5ndWxhcnRpY3MyJztcclxuXHJcbmRlY2xhcmUgdmFyIGhtdDogYW55O1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQW5ndWxhcnRpY3MyQmFpZHVBbmFseXRpY3Mge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgYW5ndWxhcnRpY3MyOiBBbmd1bGFydGljczJcclxuICAgICkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgKGhtdCkgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGhtdCA9IFtdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGhtdC5wdXNoKFsnXyBzZXRBdXRvUGFnZXZpZXcnLCBmYWxzZV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hbmd1bGFydGljczIucGFnZVRyYWNrLnN1YnNjcmliZSgoeDogYW55KSA9PiB0aGlzLnBhZ2VUcmFjayh4LnBhdGgpKTtcclxuXHJcbiAgICAgICAgdGhpcy5hbmd1bGFydGljczIuZXZlbnRUcmFjay5zdWJzY3JpYmUoKHg6IGFueSkgPT4gdGhpcy5ldmVudFRyYWNrKHguYWN0aW9uLCB4LnByb3BlcnRpZXMpKTtcclxuXHJcbiAgICAgICAgdGhpcy5hbmd1bGFydGljczIuc2V0VXNlcm5hbWUuc3Vic2NyaWJlKCh4OiBzdHJpbmcpID0+IHRoaXMuc2V0VXNlcm5hbWUoeCkpO1xyXG5cclxuICAgICAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXRVc2VyUHJvcGVydGllcy5zdWJzY3JpYmUoKHg6IGFueSkgPT4gdGhpcy5zZXRVc2VyUHJvcGVydGllcyh4KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQYWdlIFRyYWNrIGluIEJhaWR1IEFuYWx5dGljc1xyXG4gICAgICogQG5hbWUgcGFnZVRyYWNrXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBhdGggUmVxdWlyZWQgJ3BhdGgnIChzdHJpbmcpXHJcbiAgICAgKlxyXG4gICAgICogQGxpbmsgaHR0cDovL3RvbmdqaS5iYWlkdS5jb20vb3Blbi9hcGkvbW9yZT9wPXJlZl90cmFja1BhZ2V2aWV3XHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICBwYWdlVHJhY2socGF0aDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBobXQgIT09ICd1bmRlZmluZWQnICYmIGhtdCkge1xyXG4gICAgICAgICAgICBobXQucHVzaChbJ190cmFja1BhZ2V2aWV3JywgcGF0aF0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyYWNrIEV2ZW50IGluIEJhaWR1IEFuYWx5dGljc1xyXG4gICAgICogQG5hbWUgZXZlbnRUcmFja1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhY3Rpb24gUmVxdWlyZWQgJ2FjdGlvbicgKHN0cmluZykgYXNzb2NpYXRlZCB3aXRoIHRoZSBldmVudFxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHByb3BlcnRpZXMgQ29tcHJpc2VkIG9mIHRoZSBtYW5kYXRvcnkgZmllbGQgJ2NhdGVnb3J5JyAoc3RyaW5nKSwgJ29wdF9sYWJlbCcoc3RyaW5nKSBhbmQgJ29wdF92YWx1ZScgKHN0cmluZylcclxuICAgICAqXHJcbiAgICAgKiBAbGluayBodHRwOi8vdG9uZ2ppLmJhaWR1LmNvbS9vcGVuL2FwaS9tb3JlP3A9cmVmX3RyYWNrRXZlbnRcclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIGV2ZW50VHJhY2soYWN0aW9uOiBzdHJpbmcsIHByb3BlcnRpZXM6IGFueSkge1xyXG4gICAgICAgIC8vYmFpZHUgYW5hbHl0aWNzIHJlcXVpcmVzIGNhdGVnb3J5XHJcbiAgICAgICAgaWYgKCFwcm9wZXJ0aWVzIHx8ICFwcm9wZXJ0aWVzLmNhdGVnb3J5KSB7XHJcbiAgICAgICAgICAgIHByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzIHx8IHt9O1xyXG4gICAgICAgICAgICBwcm9wZXJ0aWVzLmNhdGVnb3J5ID0gJ0V2ZW50JztcclxuICAgICAgICAgICAgcHJvcGVydGllcy5vcHRfbGFiZWwgPSAnZGVmYXVsdCc7XHJcbiAgICAgICAgICAgIHByb3BlcnRpZXMub3B0X3ZhbHVlID0gJ2RlZmF1bHQnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBobXQgIT09ICd1bmRlZmluZWQnICYmIGhtdCkge1xyXG4gICAgICAgICAgICBobXQucHVzaChbJ190cmFja0V2ZW50JywgcHJvcGVydGllcy5jYXRlZ29yeSwgYWN0aW9uLCBwcm9wZXJ0aWVzLm9wdF9sYWJlbCwgcHJvcGVydGllcy5vcHRfdmFsdWVdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VXNlcm5hbWUodXNlcklkOiBzdHJpbmcpIHtcclxuICAgICAgICAvLyBzZXQgZGVmYXVsdCBjdXN0b20gdmFyaWFibGVzIG5hbWUgdG8gJ2lkZW50aXR5JyBhbmQgJ3ZhbHVlJ1xyXG4gICAgICAgIGhtdC5wdXNoKFsnX3NldEN1c3RvbVZhcicsIDEsICdpZGVudGl0eScsIHVzZXJJZF0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFVzZXJQcm9wZXJ0aWVzKHByb3BlcnRpZXM6IGFueSkge1xyXG4gICAgICAgIGhtdC5wdXNoKFsnX3NldEN1c3RvbVZhcicsIDIsICd1c2VyJywgSlNPTi5zdHJpbmdpZnkocHJvcGVydGllcyldKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9wcm92aWRlcnMvYmFpZHUvYW5ndWxhcnRpY3MyLWJhaWR1LWFuYWx5dGljcy50cyIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEFuZ3VsYXJ0aWNzMiB9IGZyb20gJy4uLy4uL2NvcmUvYW5ndWxhcnRpY3MyJztcclxuXHJcbmRlY2xhcmUgdmFyIF9nYXE6IGFueTtcclxuZGVjbGFyZSB2YXIgZ2E6IGFueTtcclxuZGVjbGFyZSB2YXIgbG9jYXRpb246IGFueTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJ0aWNzMkdvb2dsZUFuYWx5dGljcyB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBhbmd1bGFydGljczI6IEFuZ3VsYXJ0aWNzMlxyXG4gICkge1xyXG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MucGFnZVRyYWNraW5nLnRyYWNrUmVsYXRpdmVQYXRoID0gdHJ1ZTtcclxuXHJcbiAgICAvLyBTZXQgdGhlIGRlZmF1bHQgc2V0dGluZ3MgZm9yIHRoaXMgbW9kdWxlXHJcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nYSA9IHtcclxuICAgICAgLy8gYXJyYXkgb2YgYWRkaXRpb25hbCBhY2NvdW50IG5hbWVzIChvbmx5IHdvcmtzIGZvciBhbmFseXRpY3NqcylcclxuICAgICAgYWRkaXRpb25hbEFjY291bnROYW1lczogW10sXHJcbiAgICAgIHVzZXJJZDogbnVsbFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5wYWdlVHJhY2suc3Vic2NyaWJlKCh4OiBhbnkpID0+IHRoaXMucGFnZVRyYWNrKHgucGF0aCkpO1xyXG5cclxuICAgIHRoaXMuYW5ndWxhcnRpY3MyLmV2ZW50VHJhY2suc3Vic2NyaWJlKCh4OiBhbnkpID0+IHRoaXMuZXZlbnRUcmFjayh4LmFjdGlvbiwgeC5wcm9wZXJ0aWVzKSk7XHJcblxyXG4gICAgdGhpcy5hbmd1bGFydGljczIuZXhjZXB0aW9uVHJhY2suc3Vic2NyaWJlKCh4OiBhbnkpID0+IHRoaXMuZXhjZXB0aW9uVHJhY2soeCkpO1xyXG5cclxuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnNldFVzZXJuYW1lLnN1YnNjcmliZSgoeDogc3RyaW5nKSA9PiB0aGlzLnNldFVzZXJuYW1lKHgpKTtcclxuXHJcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXRVc2VyUHJvcGVydGllcy5zdWJzY3JpYmUoKHg6IGFueSkgPT4gdGhpcy5zZXRVc2VyUHJvcGVydGllcyh4KSk7XHJcblxyXG4gICAgdGhpcy5hbmd1bGFydGljczIudXNlclRpbWluZ3Muc3Vic2NyaWJlKCh4OiBhbnkpID0+IHRoaXMudXNlclRpbWluZ3MoeCkpO1xyXG4gIH1cclxuXHJcbiAgcGFnZVRyYWNrKHBhdGg6IHN0cmluZykge1xyXG4gICAgaWYgKHR5cGVvZiBfZ2FxICE9PSAndW5kZWZpbmVkJyAmJiBfZ2FxKSB7XHJcbiAgICAgIF9nYXEucHVzaChbJ190cmFja1BhZ2V2aWV3JywgcGF0aF0pO1xyXG4gICAgICBmb3IgKGxldCBhY2NvdW50TmFtZSBvZiB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nYS5hZGRpdGlvbmFsQWNjb3VudE5hbWVzKSB7XHJcbiAgICAgICAgX2dhcS5wdXNoKFthY2NvdW50TmFtZSArICcuX3RyYWNrUGFnZXZpZXcnLCBwYXRoXSk7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIGdhICE9PSAndW5kZWZpbmVkJyAmJiBnYSkge1xyXG4gICAgICBpZiAodGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ2EudXNlcklkKSB7XHJcbiAgICAgICAgZ2EoJ3NldCcsICcmdWlkJywgdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ2EudXNlcklkKTtcclxuICAgICAgfVxyXG4gICAgICBnYSgnc2VuZCcsICdwYWdldmlldycsIHBhdGgpO1xyXG4gICAgICBmb3IgKGxldCBhY2NvdW50TmFtZSBvZiB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nYS5hZGRpdGlvbmFsQWNjb3VudE5hbWVzKSB7XHJcbiAgICAgICAgZ2EoYWNjb3VudE5hbWUgKyAnLnNlbmQnLCAncGFnZXZpZXcnLCBwYXRoKTtcclxuICAgICAgfTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyYWNrIEV2ZW50IGluIEdBXHJcbiAgICogQG5hbWUgZXZlbnRUcmFja1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGFjdGlvbiBSZXF1aXJlZCAnYWN0aW9uJyAoc3RyaW5nKSBhc3NvY2lhdGVkIHdpdGggdGhlIGV2ZW50XHJcbiAgICogQHBhcmFtIHtvYmplY3R9IHByb3BlcnRpZXMgQ29tcHJpc2VkIG9mIHRoZSBtYW5kYXRvcnkgZmllbGQgJ2NhdGVnb3J5JyAoc3RyaW5nKSBhbmQgb3B0aW9uYWwgIGZpZWxkcyAnbGFiZWwnIChzdHJpbmcpLCAndmFsdWUnIChpbnRlZ2VyKSBhbmQgJ25vbmludGVyYWN0aW9uJyAoYm9vbGVhbilcclxuICAgKlxyXG4gICAqIEBsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2FuYWx5dGljcy9kZXZndWlkZXMvY29sbGVjdGlvbi9nYWpzL2V2ZW50VHJhY2tlckd1aWRlI1NldHRpbmdVcEV2ZW50VHJhY2tpbmdcclxuICAgKlxyXG4gICAqIEBsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2FuYWx5dGljcy9kZXZndWlkZXMvY29sbGVjdGlvbi9hbmFseXRpY3Nqcy9ldmVudHNcclxuICAgKi9cclxuICBldmVudFRyYWNrKGFjdGlvbjogc3RyaW5nLCBwcm9wZXJ0aWVzOiBhbnkpIHtcclxuICAgIC8vIEdvb2dsZSBBbmFseXRpY3MgcmVxdWlyZXMgYW4gRXZlbnQgQ2F0ZWdvcnlcclxuICAgIGlmICghcHJvcGVydGllcyB8fCAhcHJvcGVydGllcy5jYXRlZ29yeSkge1xyXG4gICAgICBwcm9wZXJ0aWVzID0gcHJvcGVydGllcyB8fCB7fTtcclxuICAgICAgcHJvcGVydGllcy5jYXRlZ29yeSA9ICdFdmVudCc7XHJcbiAgICB9XHJcbiAgICAvLyBHQSByZXF1aXJlcyB0aGF0IGV2ZW50VmFsdWUgYmUgYW4gaW50ZWdlciwgc2VlOlxyXG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2FuYWx5dGljc2pzL2ZpZWxkLXJlZmVyZW5jZSNldmVudFZhbHVlXHJcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbHVpc2ZhcnphdGkvYW5ndWxhcnRpY3MvaXNzdWVzLzgxXHJcbiAgICBpZiAocHJvcGVydGllcy52YWx1ZSkge1xyXG4gICAgICB2YXIgcGFyc2VkID0gcGFyc2VJbnQocHJvcGVydGllcy52YWx1ZSwgMTApO1xyXG4gICAgICBwcm9wZXJ0aWVzLnZhbHVlID0gaXNOYU4ocGFyc2VkKSA/IDAgOiBwYXJzZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiBnYSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgdmFyIGV2ZW50T3B0aW9ucyA9IHtcclxuICAgICAgICBldmVudENhdGVnb3J5OiBwcm9wZXJ0aWVzLmNhdGVnb3J5LFxyXG4gICAgICAgIGV2ZW50QWN0aW9uOiBhY3Rpb24sXHJcbiAgICAgICAgZXZlbnRMYWJlbDogcHJvcGVydGllcy5sYWJlbCxcclxuICAgICAgICBldmVudFZhbHVlOiBwcm9wZXJ0aWVzLnZhbHVlLFxyXG4gICAgICAgIG5vbkludGVyYWN0aW9uOiBwcm9wZXJ0aWVzLm5vbmludGVyYWN0aW9uLFxyXG4gICAgICAgIHBhZ2U6IHByb3BlcnRpZXMucGFnZSB8fCBsb2NhdGlvbi5oYXNoLnN1YnN0cmluZygxKSB8fCBsb2NhdGlvbi5wYXRobmFtZSxcclxuICAgICAgICB1c2VySWQ6IHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmdhLnVzZXJJZCxcclxuICAgICAgICBoaXRDYWxsYmFjazogcHJvcGVydGllcy5oaXRDYWxsYmFja1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gYWRkIGN1c3RvbSBkaW1lbnNpb25zIGFuZCBtZXRyaWNzXHJcbiAgICAgIHRoaXMuc2V0RGltZW5zaW9uc0FuZE1ldHJpY3MocHJvcGVydGllcyk7XHJcblxyXG4gICAgICBpZiAodGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ2EudHJhbnNwb3J0KSB7XHJcbiAgICAgICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCBldmVudE9wdGlvbnMsIHsgdHJhbnNwb3J0OiB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nYS50cmFuc3BvcnQgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZ2EoJ3NlbmQnLCAnZXZlbnQnLCBldmVudE9wdGlvbnMpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBmb3IgKGxldCBhY2NvdW50TmFtZSBvZiB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5nYS5hZGRpdGlvbmFsQWNjb3VudE5hbWVzKSB7XHJcbiAgICAgICAgZ2EoYWNjb3VudE5hbWUgKyAnLnNlbmQnLCAnZXZlbnQnLCBldmVudE9wdGlvbnMpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBfZ2FxICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICBfZ2FxLnB1c2goWydfdHJhY2tFdmVudCcsIHByb3BlcnRpZXMuY2F0ZWdvcnksIGFjdGlvbiwgcHJvcGVydGllcy5sYWJlbCwgcHJvcGVydGllcy52YWx1ZSwgcHJvcGVydGllcy5ub25pbnRlcmFjdGlvbl0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRXhjZXB0aW9uIFRyYWNrIEV2ZW50IGluIEdBXHJcbiAgICogQG5hbWUgZXhjZXB0aW9uVHJhY2tcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wZXJ0aWVzIENvbXByaXNlZCBvZiB0aGUgb3B0aW9uYWwgZmllbGRzOlxyXG4gICAqICAgICAnZmF0YWwnIChzdHJpbmcpLFxyXG4gICAqICAgICAnZGVzY3JpcHRpb24nIChzdHJpbmcpXHJcbiAgICpcclxuICAgKiBAaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2FuYWx5dGljc2pzL2V4Y2VwdGlvbnNcclxuICAgKlxyXG4gICAqIEBsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2FuYWx5dGljcy9kZXZndWlkZXMvY29sbGVjdGlvbi9hbmFseXRpY3Nqcy9ldmVudHNcclxuICAgKi9cclxuICBleGNlcHRpb25UcmFjayhwcm9wZXJ0aWVzOiBhbnkpIHtcclxuICAgIGlmIChwcm9wZXJ0aWVzLmZhdGFsID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgY29uc29sZS5sb2coJ05vIFwiZmF0YWxcIiBwcm92aWRlZCwgc2VuZGluZyB3aXRoIGZhdGFsPXRydWUnKTtcclxuICAgICAgcHJvcGVydGllcy5mYXRhbCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvcGVydGllcy5leERlc2NyaXB0aW9uID0gcHJvcGVydGllcy5kZXNjcmlwdGlvbjtcclxuXHJcbiAgICB2YXIgZXZlbnRPcHRpb25zID0ge1xyXG4gICAgICBleEZhdGFsOiBwcm9wZXJ0aWVzLmZhdGFsLFxyXG4gICAgICBleERlc2NyaXB0aW9uOiBwcm9wZXJ0aWVzLmRlc2NyaXB0aW9uXHJcbiAgICB9O1xyXG5cclxuICAgIGdhKCdzZW5kJywgJ2V4Y2VwdGlvbicsIGV2ZW50T3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBzZXRVc2VybmFtZSh1c2VySWQ6IHN0cmluZykge1xyXG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ2EudXNlcklkID0gdXNlcklkO1xyXG4gIH1cclxuXHJcbiAgc2V0VXNlclByb3BlcnRpZXMocHJvcGVydGllczogYW55KSB7XHJcbiAgICB0aGlzLnNldERpbWVuc2lvbnNBbmRNZXRyaWNzKHByb3BlcnRpZXMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXNlciBUaW1pbmdzIEV2ZW50IGluIEdBXHJcbiAgICogQG5hbWUgdXNlclRpbWluZ3NcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wZXJ0aWVzIENvbXByaXNlZCBvZiB0aGUgbWFuZGF0b3J5IGZpZWxkczpcclxuICAgKiAgICAgJ3RpbWluZ0NhdGVnb3J5JyAoc3RyaW5nKSxcclxuICAgKiAgICAgJ3RpbWluZ1ZhcicgKHN0cmluZyksXHJcbiAgICogICAgICd0aW1pbmdWYWx1ZScgKG51bWJlcilcclxuICAgKiBQcm9wZXJ0aWVzIGNhbiBhbHNvIGhhdmUgdGhlIG9wdGlvbmFsIGZpZWxkczpcclxuICAgKiAgICAgJ3RpbWluZ0xhYmVsJyAoc3RyaW5nKVxyXG4gICAqXHJcbiAgICogQGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vYW5hbHl0aWNzL2Rldmd1aWRlcy9jb2xsZWN0aW9uL2FuYWx5dGljc2pzL3VzZXItdGltaW5nc1xyXG4gICAqL1xyXG4gIHVzZXJUaW1pbmdzKHByb3BlcnRpZXM6IGFueSkge1xyXG4gICAgaWYgKCFwcm9wZXJ0aWVzIHx8ICFwcm9wZXJ0aWVzLnRpbWluZ0NhdGVnb3J5IHx8ICFwcm9wZXJ0aWVzLnRpbWluZ1ZhciB8fCAhcHJvcGVydGllcy50aW1pbmdWYWx1ZSkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdQcm9wZXJ0aWVzIHRpbWluZ0NhdGVnb3J5LCB0aW1pbmdWYXIsIGFuZCB0aW1pbmdWYWx1ZSBhcmUgcmVxdWlyZWQgdG8gYmUgc2V0LicpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGdhKSB7XHJcbiAgICAgIGdhKCdzZW5kJywgJ3RpbWluZycsIHByb3BlcnRpZXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXREaW1lbnNpb25zQW5kTWV0cmljcyhwcm9wZXJ0aWVzOiBhbnkpIHtcclxuICAgIGlmIChnYSkge1xyXG4gICAgICAvLyBhZGQgY3VzdG9tIGRpbWVuc2lvbnMgYW5kIG1ldHJpY3NcclxuICAgICAgZm9yICh2YXIgaWR4ID0gMTsgaWR4IDw9IDIwMDsgaWR4KyspIHtcclxuICAgICAgICBpZiAocHJvcGVydGllc1snZGltZW5zaW9uJyArIGlkeC50b1N0cmluZygpXSkge1xyXG4gICAgICAgICAgZ2EoJ3NldCcsICdkaW1lbnNpb24nICsgaWR4LnRvU3RyaW5nKCksIHByb3BlcnRpZXNbJ2RpbWVuc2lvbicgKyBpZHgudG9TdHJpbmcoKV0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBnYSgnc2V0JywgJ2RpbWVuc2lvbicgKyBpZHgudG9TdHJpbmcoKSwgdW5kZWZpbmVkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHByb3BlcnRpZXNbJ21ldHJpYycgKyBpZHgudG9TdHJpbmcoKV0pIHtcclxuICAgICAgICAgIGdhKCdzZXQnLCAnbWV0cmljJyArIGlkeC50b1N0cmluZygpLCBwcm9wZXJ0aWVzWydtZXRyaWMnICsgaWR4LnRvU3RyaW5nKCldKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZ2EoJ3NldCcsICdtZXRyaWMnICsgaWR4LnRvU3RyaW5nKCksIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL3Byb3ZpZGVycy9nYS9hbmd1bGFydGljczItZ2EudHMiLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBBbmd1bGFydGljczIgfSBmcm9tICcuLi8uLi9jb3JlL2FuZ3VsYXJ0aWNzMic7XHJcblxyXG5kZWNsYXJlIHZhciBkYXRhTGF5ZXI6IGFueTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJ0aWNzMkdvb2dsZVRhZ01hbmFnZXIge1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgYW5ndWxhcnRpY3MyOiBBbmd1bGFydGljczJcclxuICApIHtcclxuXHJcbiAgICAvLyBUaGUgZGF0YUxheWVyIG5lZWRzIHRvIGJlIGluaXRpYWxpemVkXHJcbiAgICBpZiAodHlwZW9mIGRhdGFMYXllciAhPT0gJ3VuZGVmaW5lZCcgJiYgZGF0YUxheWVyKSB7XHJcbiAgICAgIGRhdGFMYXllciA9ICg8YW55PndpbmRvdykuZGF0YUxheWVyID0gKDxhbnk+d2luZG93KS5kYXRhTGF5ZXIgfHwgW107XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MucGFnZVRyYWNraW5nLnRyYWNrUmVsYXRpdmVQYXRoID0gdHJ1ZTtcclxuXHJcbiAgICAvLyBTZXQgdGhlIGRlZmF1bHQgc2V0dGluZ3MgZm9yIHRoaXMgbW9kdWxlXHJcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5ndG0gPSB7XHJcbiAgICAgIHVzZXJJZDogbnVsbFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5wYWdlVHJhY2suc3Vic2NyaWJlKCh4OiBhbnkpID0+IHRoaXMucGFnZVRyYWNrKHgucGF0aCkpO1xyXG5cclxuICAgIHRoaXMuYW5ndWxhcnRpY3MyLmV2ZW50VHJhY2suc3Vic2NyaWJlKCh4OiBhbnkpID0+IHRoaXMuZXZlbnRUcmFjayh4LmFjdGlvbiwgeC5wcm9wZXJ0aWVzKSk7XHJcblxyXG4gICAgdGhpcy5hbmd1bGFydGljczIuZXhjZXB0aW9uVHJhY2suc3Vic2NyaWJlKCh4OiBhbnkpID0+IHRoaXMuZXhjZXB0aW9uVHJhY2soeCkpO1xyXG5cclxuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnNldFVzZXJuYW1lLnN1YnNjcmliZSgoeDogc3RyaW5nKSA9PiB0aGlzLnNldFVzZXJuYW1lKHgpKTtcclxuICB9XHJcblxyXG4gIHBhZ2VUcmFjayhwYXRoOiBzdHJpbmcpIHtcclxuICAgIGlmICh0eXBlb2YgZGF0YUxheWVyICE9PSAndW5kZWZpbmVkJyAmJiBkYXRhTGF5ZXIpIHtcclxuICAgICAgZGF0YUxheWVyLnB1c2goe1xyXG4gICAgICAgICdldmVudCc6ICdQYWdlIFZpZXcnLFxyXG4gICAgICAgICdjb250ZW50LW5hbWUnOiBwYXRoLFxyXG4gICAgICAgICd1c2VySWQnOiB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5ndG0udXNlcklkXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VuZCBpbnRlcmFjdGlvbnMgdG8gdGhlIGRhdGFMYXllciwgaS5lLiBmb3IgZXZlbnQgdHJhY2tpbmcgaW4gR29vZ2xlIEFuYWx5dGljc1xyXG4gICAqIEBuYW1lIGV2ZW50VHJhY2tcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhY3Rpb24gUmVxdWlyZWQgJ2FjdGlvbicgKHN0cmluZykgYXNzb2NpYXRlZCB3aXRoIHRoZSBldmVudFxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wZXJ0aWVzIENvbXByaXNlZCBvZiB0aGUgbWFuZGF0b3J5IGZpZWxkICdjYXRlZ29yeScgKHN0cmluZykgYW5kIG9wdGlvbmFsICBmaWVsZHMgJ2xhYmVsJyAoc3RyaW5nKSwgJ3ZhbHVlJyAoaW50ZWdlcikgYW5kICdub25pbnRlcmFjdGlvbicgKGJvb2xlYW4pXHJcbiAgICovXHJcbiAgZXZlbnRUcmFjayhhY3Rpb246IHN0cmluZywgcHJvcGVydGllczogYW55KSB7XHJcblxyXG4gICAgLy8gU2V0IGEgZGVmYXVsdCBHVE0gY2F0ZWdvcnlcclxuICAgIHByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzIHx8IHt9O1xyXG5cclxuICAgIGlmICh0eXBlb2YgZGF0YUxheWVyICE9PSAndW5kZWZpbmVkJyAmJiBkYXRhTGF5ZXIpIHtcclxuICAgICAgZGF0YUxheWVyLnB1c2goe1xyXG4gICAgICAgIGV2ZW50OiBwcm9wZXJ0aWVzLmV2ZW50IHx8ICdpbnRlcmFjdGlvbicsXHJcbiAgICAgICAgdGFyZ2V0OiBwcm9wZXJ0aWVzLmNhdGVnb3J5IHx8ICdFdmVudCcsXHJcbiAgICAgICAgYWN0aW9uOiBhY3Rpb24sXHJcbiAgICAgICAgbGFiZWw6IHByb3BlcnRpZXMubGFiZWwsXHJcbiAgICAgICAgdmFsdWU6IHByb3BlcnRpZXMudmFsdWUsXHJcbiAgICAgICAgaW50ZXJhY3Rpb25UeXBlOiBwcm9wZXJ0aWVzLm5vbmludGVyYWN0aW9uLFxyXG4gICAgICAgIHVzZXJJZDogdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuZ3RtLnVzZXJJZFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEV4Y2VwdGlvbiBUcmFjayBFdmVudCBpbiBHVE1cclxuICAgKiBAbmFtZSBleGNlcHRpb25UcmFja1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IHByb3BlcnRpZXMgQ29tcHJpc2VkIG9mIHRoZSBtYW5kYXRvcnkgZmllbGRzICdhcHBJZCcgKHN0cmluZyksICdhcHBOYW1lJyAoc3RyaW5nKSBhbmQgJ2FwcFZlcnNpb24nIChzdHJpbmcpIGFuZFxyXG4gICAqIG9wdGlvbmFsICBmaWVsZHMgJ2ZhdGFsJyAoYm9vbGVhbikgYW5kICdkZXNjcmlwdGlvbicgKHN0cmluZylcclxuICAgKi9cclxuICBleGNlcHRpb25UcmFjayhwcm9wZXJ0aWVzOiBhbnkpIHtcclxuICAgIGlmICghIHByb3BlcnRpZXMgfHwgISBwcm9wZXJ0aWVzLmFwcElkIHx8ICEgcHJvcGVydGllcy5hcHBOYW1lIHx8ICEgcHJvcGVydGllcy5hcHBWZXJzaW9uKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ011c3QgYmUgc2V0dGVkIGFwcElkLCBhcHBOYW1lIGFuZCBhcHBWZXJzaW9uLicpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHByb3BlcnRpZXMuZmF0YWwgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBjb25zb2xlLmxvZygnTm8gXCJmYXRhbFwiIHByb3ZpZGVkLCBzZW5kaW5nIHdpdGggZmF0YWw9dHJ1ZScpO1xyXG4gICAgICBwcm9wZXJ0aWVzLmV4RmF0YWwgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3BlcnRpZXMuZXhEZXNjcmlwdGlvbiA9IHByb3BlcnRpZXMuZXZlbnQgPyBwcm9wZXJ0aWVzLmV2ZW50LnN0YWNrIDogcHJvcGVydGllcy5kZXNjcmlwdGlvbjtcclxuXHJcbiAgICB0aGlzLmV2ZW50VHJhY2soYEV4Y2VwdGlvbiB0aHJvd24gZm9yICR7cHJvcGVydGllcy5hcHBOYW1lfSA8JHtwcm9wZXJ0aWVzLmFwcElkfUAke3Byb3BlcnRpZXMuYXBwVmVyc2lvbn0+YCwge1xyXG4gICAgICAnY2F0ZWdvcnknOiAnRXhjZXB0aW9uJyxcclxuICAgICAgJ2xhYmVsJzogcHJvcGVydGllcy5leERlc2NyaXB0aW9uXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB1c2VySWQgZm9yIHVzZSB3aXRoIFVuaXZlcnNhbCBBbmFseXRpY3MgVXNlciBJRCBmZWF0dXJlXHJcbiAgICogQG5hbWUgc2V0VXNlcm5hbWVcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VySWQgUmVxdWlyZWQgJ3VzZXJJZCcgdmFsdWUgKHN0cmluZykgdXNlZCB0byBpZGVudGlmeSB1c2VyIGNyb3NzLWRldmljZSBpbiBHb29nbGUgQW5hbHl0aWNzXHJcbiAgICovXHJcbiAgc2V0VXNlcm5hbWUodXNlcklkOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmd0bS51c2VySWQgPSB1c2VySWQ7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL3Byb3ZpZGVycy9ndG0vYW5ndWxhcnRpY3MyLWd0bS50cyIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEFuZ3VsYXJ0aWNzMiB9IGZyb20gJy4uLy4uL2NvcmUvYW5ndWxhcnRpY3MyJztcclxuXHJcbmRlY2xhcmUgdmFyIF9rbXE6IGFueTtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJ0aWNzMktpc3NtZXRyaWNzIHtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGFuZ3VsYXJ0aWNzMjogQW5ndWxhcnRpY3MyXHJcbiAgKSB7XHJcbiAgICBpZiAodHlwZW9mIChfa21xKSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgX2ttcSA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnBhZ2VUcmFjay5zdWJzY3JpYmUoKHg6IGFueSkgPT4gdGhpcy5wYWdlVHJhY2soeC5wYXRoLCB4LmxvY2F0aW9uKSk7XHJcblxyXG4gICAgdGhpcy5hbmd1bGFydGljczIuZXZlbnRUcmFjay5zdWJzY3JpYmUoKHg6IGFueSkgPT4gdGhpcy5ldmVudFRyYWNrKHguYWN0aW9uLCB4LnByb3BlcnRpZXMpKTtcclxuXHJcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXRVc2VybmFtZS5zdWJzY3JpYmUoKHg6IHN0cmluZykgPT4gdGhpcy5zZXRVc2VybmFtZSh4KSk7XHJcblxyXG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0VXNlclByb3BlcnRpZXMuc3Vic2NyaWJlKCh4OiBhbnkpID0+IHRoaXMuc2V0VXNlclByb3BlcnRpZXMoeCkpO1xyXG4gIH1cclxuXHJcbiAgcGFnZVRyYWNrKHBhdGg6IHN0cmluZywgbG9jYXRpb246IGFueSkge1xyXG4gICAgX2ttcS5wdXNoKFsncmVjb3JkJywgJ1BhZ2V2aWV3JywgeyAnUGFnZSc6IHBhdGggfV0pO1xyXG4gIH1cclxuXHJcbiAgZXZlbnRUcmFjayhhY3Rpb246IHN0cmluZywgcHJvcGVydGllczogYW55KSB7XHJcbiAgICBfa21xLnB1c2goWydyZWNvcmQnLCBhY3Rpb24sIHByb3BlcnRpZXNdKTtcclxuICB9XHJcblxyXG4gIHNldFVzZXJuYW1lKHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICBfa21xLnB1c2goWydpZGVudGlmeScsIHVzZXJJZF0pO1xyXG4gIH1cclxuXHJcbiAgc2V0VXNlclByb3BlcnRpZXMocHJvcGVydGllczogYW55KSB7XHJcbiAgICBfa21xLnB1c2goWydzZXQnLCBwcm9wZXJ0aWVzXSk7XHJcbiAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL3Byb3ZpZGVycy9raXNzbWV0cmljcy9hbmd1bGFydGljczIta2lzc21ldHJpY3MudHMiLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBBbmd1bGFydGljczIgfSBmcm9tICcuLi8uLi9jb3JlL2FuZ3VsYXJ0aWNzMic7XHJcblxyXG5kZWNsYXJlIHZhciBtaXhwYW5lbDogYW55O1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQW5ndWxhcnRpY3MyTWl4cGFuZWwge1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgYW5ndWxhcnRpY3MyOiBBbmd1bGFydGljczJcclxuICApIHtcclxuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnBhZ2VUcmFjay5zdWJzY3JpYmUoKHg6IGFueSkgPT4gdGhpcy5wYWdlVHJhY2soeC5wYXRoLCB4LmxvY2F0aW9uKSk7XHJcblxyXG4gICAgdGhpcy5hbmd1bGFydGljczIuZXZlbnRUcmFjay5zdWJzY3JpYmUoKHg6IGFueSkgPT4gdGhpcy5ldmVudFRyYWNrKHguYWN0aW9uLCB4LnByb3BlcnRpZXMpKTtcclxuXHJcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXRVc2VybmFtZS5zdWJzY3JpYmUoKHg6IHN0cmluZykgPT4gdGhpcy5zZXRVc2VybmFtZSh4KSk7XHJcblxyXG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0VXNlclByb3BlcnRpZXMuc3Vic2NyaWJlKCh4OiBhbnkpID0+IHRoaXMuc2V0VXNlclByb3BlcnRpZXMoeCkpO1xyXG5cclxuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnNldFVzZXJQcm9wZXJ0aWVzT25jZS5zdWJzY3JpYmUoKHg6IGFueSkgPT4gdGhpcy5zZXRVc2VyUHJvcGVydGllc09uY2UoeCkpO1xyXG5cclxuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnNldFN1cGVyUHJvcGVydGllcy5zdWJzY3JpYmUoKHg6IGFueSkgPT4gdGhpcy5zZXRTdXBlclByb3BlcnRpZXMoeCkpO1xyXG5cclxuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnNldFN1cGVyUHJvcGVydGllc09uY2Uuc3Vic2NyaWJlKCh4OiBhbnkpID0+IHRoaXMuc2V0U3VwZXJQcm9wZXJ0aWVzT25jZSh4KSk7XHJcblxyXG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0QWxpYXMuc3Vic2NyaWJlKCh4OiBzdHJpbmcpID0+IHRoaXMuc2V0QWxpYXMoeCkpO1xyXG4gIH1cclxuXHJcbiAgcGFnZVRyYWNrKHBhdGg6IHN0cmluZywgbG9jYXRpb246IGFueSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbWl4cGFuZWwudHJhY2soJ1BhZ2UgVmlld2VkJywgeyBwYWdlOiBwYXRoIH0pO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBpZiAoIShlIGluc3RhbmNlb2YgUmVmZXJlbmNlRXJyb3IpKSB7XHJcbiAgICAgICAgdGhyb3cgZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZXZlbnRUcmFjayhhY3Rpb246IHN0cmluZywgcHJvcGVydGllczogYW55KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBtaXhwYW5lbC50cmFjayhhY3Rpb24sIHByb3BlcnRpZXMpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBpZiAoIShlIGluc3RhbmNlb2YgUmVmZXJlbmNlRXJyb3IpKSB7XHJcbiAgICAgICAgdGhyb3cgZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0VXNlcm5hbWUodXNlcklkOiBzdHJpbmcpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG1peHBhbmVsLmlkZW50aWZ5KHVzZXJJZCk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGlmICghKGUgaW5zdGFuY2VvZiBSZWZlcmVuY2VFcnJvcikpIHtcclxuICAgICAgICB0aHJvdyBlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRVc2VyUHJvcGVydGllcyhwcm9wZXJ0aWVzOiBhbnkpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIG1peHBhbmVsLnBlb3BsZS5zZXQocHJvcGVydGllcyk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGlmICghKGUgaW5zdGFuY2VvZiBSZWZlcmVuY2VFcnJvcikpIHtcclxuICAgICAgICB0aHJvdyBlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRVc2VyUHJvcGVydGllc09uY2UocHJvcGVydGllczogYW55KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBtaXhwYW5lbC5wZW9wbGUuc2V0X29uY2UocHJvcGVydGllcyk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGlmICghKGUgaW5zdGFuY2VvZiBSZWZlcmVuY2VFcnJvcikpIHtcclxuICAgICAgICB0aHJvdyBlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRTdXBlclByb3BlcnRpZXMocHJvcGVydGllczogYW55KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBtaXhwYW5lbC5yZWdpc3Rlcihwcm9wZXJ0aWVzKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgaWYgKCEoZSBpbnN0YW5jZW9mIFJlZmVyZW5jZUVycm9yKSkge1xyXG4gICAgICAgIHRocm93IGU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldFN1cGVyUHJvcGVydGllc09uY2UocHJvcGVydGllczogYW55KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBtaXhwYW5lbC5yZWdpc3Rlcl9vbmNlKHByb3BlcnRpZXMpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBpZiAoIShlIGluc3RhbmNlb2YgUmVmZXJlbmNlRXJyb3IpKSB7XHJcbiAgICAgICAgdGhyb3cgZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0QWxpYXMoYWxpYXM6IGFueSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgbWl4cGFuZWwuYWxpYXMoYWxpYXMpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBpZiAoIShlIGluc3RhbmNlb2YgUmVmZXJlbmNlRXJyb3IpKSB7XHJcbiAgICAgICAgdGhyb3cgZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9wcm92aWRlcnMvbWl4cGFuZWwvYW5ndWxhcnRpY3MyLW1peHBhbmVsLnRzIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQW5ndWxhcnRpY3MyIH0gZnJvbSAnLi4vLi4vY29yZS9hbmd1bGFydGljczInO1xyXG5cclxuZGVjbGFyZSB2YXIgX3BhcTogYW55O1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQW5ndWxhcnRpY3MyUGl3aWsge1xyXG4gIFxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBhbmd1bGFydGljczI6IEFuZ3VsYXJ0aWNzMlxyXG4gICkge1xyXG4gICAgaWYgKHR5cGVvZiAoX3BhcSkgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybignUGl3aWsgbm90IGZvdW5kJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hbmd1bGFydGljczIucGFnZVRyYWNrLnN1YnNjcmliZSgoeDogYW55KSA9PiB0aGlzLnBhZ2VUcmFjayh4LnBhdGgsIHgubG9jYXRpb24pKTtcclxuXHJcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5ldmVudFRyYWNrLnN1YnNjcmliZSgoeDogYW55KSA9PiB0aGlzLmV2ZW50VHJhY2soeC5hY3Rpb24sIHgucHJvcGVydGllcykpO1xyXG5cclxuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnNldFVzZXJuYW1lLnN1YnNjcmliZSgoeDogc3RyaW5nKSA9PiB0aGlzLnNldFVzZXJuYW1lKHgpKTtcclxuXHJcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXRVc2VyUHJvcGVydGllcy5zdWJzY3JpYmUoKHg6IGFueSkgPT4gdGhpcy5zZXRVc2VyUHJvcGVydGllcyh4KSk7XHJcblxyXG4gIH1cclxuXHJcbiAgcGFnZVRyYWNrKHBhdGg6IHN0cmluZywgbG9jYXRpb246IGFueSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgX3BhcS5wdXNoKFsnc2V0RG9jdW1lbnRUaXRsZScsIHdpbmRvdy5kb2N1bWVudC50aXRsZV0pO1xyXG4gICAgICBfcGFxLnB1c2goWydzZXRDdXN0b21VcmwnLCBwYXRoXSk7XHJcbiAgICAgIF9wYXEucHVzaChbJ3RyYWNrUGFnZVZpZXcnXSk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGlmICghKGUgaW5zdGFuY2VvZiBSZWZlcmVuY2VFcnJvcikpIHtcclxuICAgICAgICB0aHJvdyBlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBldmVudFRyYWNrKGFjdGlvbjogc3RyaW5nLCBwcm9wZXJ0aWVzOiBhbnkpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGlmIChwcm9wZXJ0aWVzLnZhbHVlKSB7XHJcbiAgICAgICAgdmFyIHBhcnNlZCA9IHBhcnNlSW50KHByb3BlcnRpZXMudmFsdWUsIDEwKTtcclxuICAgICAgICBwcm9wZXJ0aWVzLnZhbHVlID0gaXNOYU4ocGFyc2VkKSA/IDAgOiBwYXJzZWQ7XHJcbiAgICAgIH1cclxuICAgICAgX3BhcS5wdXNoKFsndHJhY2tFdmVudCcsIHByb3BlcnRpZXMuY2F0ZWdvcnksIGFjdGlvbiwgcHJvcGVydGllcy5sYWJlbCwgcHJvcGVydGllcy52YWx1ZV0pO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBpZiAoIShlIGluc3RhbmNlb2YgUmVmZXJlbmNlRXJyb3IpKSB7XHJcbiAgICAgICAgdGhyb3cgZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0VXNlcm5hbWUodXNlcklkOiBzdHJpbmcpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIF9wYXEucHVzaChbJ3NldFVzZXJJZCcsIHVzZXJJZF0pO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBpZiAoIShlIGluc3RhbmNlb2YgUmVmZXJlbmNlRXJyb3IpKSB7XHJcbiAgICAgICAgdGhyb3cgZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyBjdXN0b20gZGltZW5zaW9ucyBpZiBhdCBsZWFzdCBvbmUgcHJvcGVydHkgaGFzIHRoZSBrZXkgXCJkaW1lbnNpb248bj5cIixcclxuICAgKiBlLmcuIGRpbWVuc2lvbjEwLiBJZiB0aGVyZSBhcmUgY3VzdG9tIGRpbWVuc2lvbnMsIGFueSBvdGhlciBwcm9wZXJ0eSBpcyBpZ25vcmVkLlxyXG4gICAqXHJcbiAgICogSWYgdGhlcmUgYXJlIG5vIGN1c3RvbSBkaW1lbnNpb25zIGluIHRoZSBnaXZlbiBwcm9wZXJ0aWVzIG9iamVjdCwgdGhlIHByb3BlcnRpZXNcclxuICAgKiBvYmplY3QgaXMgc2F2ZWQgYXMgYSBjdXN0b20gdmFyaWFibGUuXHJcbiAgICpcclxuICAgKiBJZiBpbiBkb3VidCwgcHJlZmVyIGN1c3RvbSBkaW1lbnNpb25zLlxyXG4gICAqIEBzZWUgaHR0cHM6Ly9waXdpay5vcmcvZG9jcy9jdXN0b20tdmFyaWFibGVzL1xyXG4gICAqL1xyXG4gIHNldFVzZXJQcm9wZXJ0aWVzKHByb3BlcnRpZXM6IGFueSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgZGltZW5zaW9ucyA9IHRoaXMuc2V0Q3VzdG9tRGltZW5zaW9ucyhwcm9wZXJ0aWVzKTtcclxuICAgICAgaWYgKGRpbWVuc2lvbnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgX3BhcS5wdXNoKFsnc2V0Q3VzdG9tVmFyaWFibGUnLCBwcm9wZXJ0aWVzXSk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgaWYgKCEoZSBpbnN0YW5jZW9mIFJlZmVyZW5jZUVycm9yKSkge1xyXG4gICAgICAgIHRocm93IGU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0Q3VzdG9tRGltZW5zaW9ucyhwcm9wZXJ0aWVzOiBhbnkpOiBzdHJpbmdbXSB7XHJcbiAgICBjb25zdCBkaW1lbnNpb25SZWdleDogUmVnRXhwID0gL2RpbWVuc2lvblsxLTldXFxkKi87XHJcbiAgICBjb25zdCBkaW1lbnNpb25zID0gT2JqZWN0LmtleXMocHJvcGVydGllcykuZmlsdGVyKGtleSA9PiBkaW1lbnNpb25SZWdleC5leGVjKGtleSkpO1xyXG4gICAgZGltZW5zaW9ucy5mb3JFYWNoKGRpbWVuc2lvbiA9PiB7XHJcbiAgICAgIGNvbnN0IG51bWJlciA9IE51bWJlcihkaW1lbnNpb24uc3Vic3RyKDkpKTtcclxuICAgICAgX3BhcS5wdXNoKFsnc2V0Q3VzdG9tRGltZW5zaW9uJywgbnVtYmVyLCBwcm9wZXJ0aWVzW2RpbWVuc2lvbl1dKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGRpbWVuc2lvbnM7XHJcbiAgfVxyXG5cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9wcm92aWRlcnMvcGl3aWsvYW5ndWxhcnRpY3MyLXBpd2lrLnRzIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQW5ndWxhcnRpY3MyIH0gZnJvbSAnLi4vLi4vY29yZS9hbmd1bGFydGljczInO1xyXG5cclxuZGVjbGFyZSB2YXIgYW5hbHl0aWNzOiBhbnk7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBbmd1bGFydGljczJTZWdtZW50IHtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGFuZ3VsYXJ0aWNzMjogQW5ndWxhcnRpY3MyXHJcbiAgKSB7XHJcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5wYWdlVHJhY2suc3Vic2NyaWJlKCh4OiBhbnkpID0+IHRoaXMucGFnZVRyYWNrKHgucGF0aCwgeC5sb2NhdGlvbikpO1xyXG5cclxuICAgIHRoaXMuYW5ndWxhcnRpY3MyLmV2ZW50VHJhY2suc3Vic2NyaWJlKCh4OiBhbnkpID0+IHRoaXMuZXZlbnRUcmFjayh4LmFjdGlvbiwgeC5wcm9wZXJ0aWVzKSk7XHJcblxyXG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0VXNlclByb3BlcnRpZXMuc3Vic2NyaWJlKCh4OiBhbnkpID0+IHRoaXMuc2V0VXNlclByb3BlcnRpZXMoeCkpO1xyXG5cclxuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnNldFVzZXJQcm9wZXJ0aWVzT25jZS5zdWJzY3JpYmUoKHg6IGFueSkgPT4gdGhpcy5zZXRVc2VyUHJvcGVydGllcyh4KSk7XHJcblxyXG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0QWxpYXMuc3Vic2NyaWJlKCh4OiBzdHJpbmcpID0+IHRoaXMuc2V0QWxpYXMoeCkpO1xyXG4gIH1cclxuXHJcbiAgLy8gaHR0cHM6Ly9zZWdtZW50LmNvbS9kb2NzL2xpYnJhcmllcy9hbmFseXRpY3MuanMvI3BhZ2VcclxuICAvLyBhbmFseXRpY3MucGFnZShbY2F0ZWdvcnldLCBbbmFtZV0sIFtwcm9wZXJ0aWVzXSwgW29wdGlvbnNdLCBbY2FsbGJhY2tdKTtcclxuICAvLyBUT0RPIDogU3VwcG9ydCBvcHRpb25hbCBwYXJhbWV0ZXJzIHdoZXJlIHRoZSBwYXJhbWV0ZXIgb3JkZXIgYW5kIHR5cGUgY2hhbmdlcyB0aGVpciBtZWFuaW5nXHJcbiAgLy8gZS5nLlxyXG4gIC8vIChzdHJpbmcpIGlzIChuYW1lKVxyXG4gIC8vIChzdHJpbmcsIHN0cmluZykgaXMgKGNhdGVnb3J5LCBuYW1lKVxyXG4gIC8vIChzdHJpbmcsIG9iamVjdCkgaXMgKG5hbWUsIHByb3BlcnRpZXMpXHJcbiAgcGFnZVRyYWNrKHBhdGg6IHN0cmluZywgbG9jYXRpb246IGFueSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgYW5hbHl0aWNzLnBhZ2UocGF0aCk7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGlmICghKGUgaW5zdGFuY2VvZiBSZWZlcmVuY2VFcnJvcikpIHtcclxuICAgICAgICB0aHJvdyBlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBodHRwczovL3NlZ21lbnQuY29tL2RvY3MvbGlicmFyaWVzL2FuYWx5dGljcy5qcy8jdHJhY2tcclxuICAvLyBhbmFseXRpY3MudHJhY2soZXZlbnQsIFtwcm9wZXJ0aWVzXSwgW29wdGlvbnNdLCBbY2FsbGJhY2tdKTtcclxuICBldmVudFRyYWNrKGFjdGlvbjogc3RyaW5nLCBwcm9wZXJ0aWVzOiBhbnkpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGFuYWx5dGljcy50cmFjayhhY3Rpb24sIHByb3BlcnRpZXMpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBpZiAoIShlIGluc3RhbmNlb2YgUmVmZXJlbmNlRXJyb3IpKSB7XHJcbiAgICAgICAgdGhyb3cgZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gaHR0cHM6Ly9zZWdtZW50LmNvbS9kb2NzL2xpYnJhcmllcy9hbmFseXRpY3MuanMvI2lkZW50aWZ5XHJcbiAgLy8gYW5hbHl0aWNzLmlkZW50aWZ5KFt1c2VySWRdLCBbdHJhaXRzXSwgW29wdGlvbnNdLCBbY2FsbGJhY2tdKTtcclxuICBzZXRVc2VyUHJvcGVydGllcyhwcm9wZXJ0aWVzOiBhbnkpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGlmIChwcm9wZXJ0aWVzLnVzZXJJZCkge1xyXG4gICAgICAgIGFuYWx5dGljcy5pZGVudGlmeShwcm9wZXJ0aWVzLnVzZXJJZCwgcHJvcGVydGllcyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYW5hbHl0aWNzLmlkZW50aWZ5KHByb3BlcnRpZXMpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGlmICghKGUgaW5zdGFuY2VvZiBSZWZlcmVuY2VFcnJvcikpIHtcclxuICAgICAgICB0aHJvdyBlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBodHRwczovL3NlZ21lbnQuY29tL2RvY3MvbGlicmFyaWVzL2FuYWx5dGljcy5qcy8jYWxpYXNcclxuICAvLyBhbmFseXRpY3MuYWxpYXModXNlcklkLCBwcmV2aW91c0lkLCBvcHRpb25zLCBjYWxsYmFjayk7XHJcbiAgc2V0QWxpYXMoYWxpYXM6IGFueSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgYW5hbHl0aWNzLmFsaWFzKGFsaWFzKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgaWYgKCEoZSBpbnN0YW5jZW9mIFJlZmVyZW5jZUVycm9yKSkge1xyXG4gICAgICAgIHRocm93IGU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbm9kZV9tb2R1bGVzL3RzbGludC1sb2FkZXIhLi9zcmMvcHJvdmlkZXJzL3NlZ21lbnQvYW5ndWxhcnRpY3MyLXNlZ21lbnQudHMiLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBBbmd1bGFydGljczIgfSBmcm9tICcuLi8uLi9jb3JlL2FuZ3VsYXJ0aWNzMic7XHJcblxyXG5kZWNsYXJlIGNvbnN0IGZicTogRnVuY3Rpb247XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBbmd1bGFydGljczJGYWNlYm9vayB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBhbmd1bGFydGljczI6IEFuZ3VsYXJ0aWNzMlxyXG4gICkge1xyXG4gICAgdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MucGFnZVRyYWNraW5nLnRyYWNrUmVsYXRpdmVQYXRoID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5ldmVudFRyYWNrLnN1YnNjcmliZSgoeDogYW55KSA9PiB0aGlzLmV2ZW50VHJhY2soeC5hY3Rpb24sIHgucHJvcGVydGllcykpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VuZCBpbnRlcmFjdGlvbnMgdG8gdGhlIFBpeGVsLCBpLmUuIGZvciBldmVudCB0cmFja2luZyBpbiBQaXhlbFxyXG4gICAqIEBuYW1lIGV2ZW50VHJhY2tcclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBhY3Rpb24gUmVxdWlyZWQgJ2FjdGlvbicgKHN0cmluZykgYXNzb2NpYXRlZCB3aXRoIHRoZSBldmVudFxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wZXJ0aWVzXHJcbiAgICovXHJcbiAgZXZlbnRUcmFjayhhY3Rpb246IHN0cmluZywgcHJvcGVydGllczogYW55KSB7XHJcbiAgICBwcm9wZXJ0aWVzID0gcHJvcGVydGllcyB8fCB7fTtcclxuXHJcbiAgICBjb25zdCBldmVudExpc3QgPSBbXHJcbiAgICAgICdWaWV3Q29udGVudCcsXHJcbiAgICAgICdTZWFyY2gnLFxyXG4gICAgICAnQWRkVG9DYXJ0JyxcclxuICAgICAgJ0FkZFRvV2lzaGxpc3QnLFxyXG4gICAgICAnSW5pdGlhdGVDaGVja291dCcsXHJcbiAgICAgICdBZGRQYXltZW50SW5mbycsXHJcbiAgICAgICdQdXJjaGFzZScsXHJcbiAgICAgICdMZWFkJyxcclxuICAgICAgJ0NvbXBsZXRlUmVnaXN0cmF0aW9uJ1xyXG4gICAgXTtcclxuXHJcbiAgIGlmICh0eXBlb2YgZmJxICE9PSAndW5kZWZpbmVkJyAmJiBmYnEpIHtcclxuICAgICAgICBldmVudExpc3QuaW5kZXhPZihhY3Rpb24pID09PSAtMSA/XHJcbiAgICAgICAgICAgZmJxKCd0cmFja0N1c3RvbScsIGFjdGlvbiwgcHJvcGVydGllcykgOlxyXG4gICAgICAgICAgIGZicSgndHJhY2snLCBhY3Rpb24sIHByb3BlcnRpZXMpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9wcm92aWRlcnMvZmFjZWJvb2svYW5ndWxhcnRpY3MyLWZhY2Vib29rLnRzIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQW5ndWxhcnRpY3MyIH0gZnJvbSAnLi4vLi4vY29yZS9hbmd1bGFydGljczInO1xyXG5cclxuZGVjbGFyZSBjb25zdCBhcHBJbnNpZ2h0czogTWljcm9zb2Z0LkFwcGxpY2F0aW9uSW5zaWdodHMuSUFwcEluc2lnaHRzO1xyXG5cclxuaW1wb3J0IHsgVGl0bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuaW1wb3J0IHsgUm91dGVyLCBOYXZpZ2F0aW9uRW5kLCBOYXZpZ2F0aW9uU3RhcnQsIE5hdmlnYXRpb25FcnJvciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBbmd1bGFydGljczJBcHBJbnNpZ2h0cyB7XHJcbiAgICBsb2FkU3RhcnRUaW1lOiBudW1iZXIgPSBudWxsO1xyXG4gICAgbG9hZFRpbWU6IG51bWJlciA9IG51bGw7XHJcblxyXG4gICAgbWV0cmljczogYW55ID0gbnVsbDtcclxuICAgIGRpbWVuc2lvbnM6IGFueSA9IG51bGw7XHJcbiAgICBtZWFzdXJlbWVudHM6IGFueSA9IG51bGw7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhbmd1bGFydGljczI6IEFuZ3VsYXJ0aWNzMixcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgdGl0bGU6IFRpdGxlLFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xyXG4gICAgICAgIGlmICh0eXBlb2YgKGFwcEluc2lnaHRzKSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKCdhcHBJbnNpZ2h0cyBub3QgZm91bmQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYW5ndWxhcnRpY3MyLnNldHRpbmdzLmFwcEluc2lnaHRzID0ge1xyXG4gICAgICAgICAgICB1c2VySWQ6IG51bGxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5wYWdlVHJhY2suc3Vic2NyaWJlKCh4OiBhbnkpID0+IHRoaXMucGFnZVRyYWNrKHgucGF0aCkpO1xyXG5cclxuICAgICAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5ldmVudFRyYWNrLnN1YnNjcmliZSgoeDogYW55KSA9PiB0aGlzLmV2ZW50VHJhY2soeC5hY3Rpb24sIHgucHJvcGVydGllcykpO1xyXG5cclxuICAgICAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5leGNlcHRpb25UcmFjay5zdWJzY3JpYmUoKHg6IGFueSkgPT4gdGhpcy5leGNlcHRpb25UcmFjayh4KSk7XHJcblxyXG4gICAgICAgIHRoaXMuYW5ndWxhcnRpY3MyLnNldFVzZXJuYW1lLnN1YnNjcmliZSgoeDogc3RyaW5nKSA9PiB0aGlzLnNldFVzZXJuYW1lKHgpKTtcclxuXHJcbiAgICAgICAgdGhpcy5hbmd1bGFydGljczIuc2V0VXNlclByb3BlcnRpZXMuc3Vic2NyaWJlKCh4OiBhbnkpID0+IHRoaXMuc2V0VXNlclByb3BlcnRpZXMoeCkpO1xyXG5cclxuICAgICAgICB0aGlzLnJvdXRlci5ldmVudHNcclxuICAgICAgICAgICAgLmZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25TdGFydClcclxuICAgICAgICAgICAgLnN1YnNjcmliZShldmVudCA9PiB0aGlzLnN0YXJ0VGltZXIoKSk7XHJcblxyXG4gICAgICAgIHRoaXMucm91dGVyLmV2ZW50c1xyXG4gICAgICAgICAgICAuZmlsdGVyKGV2ZW50ID0+XHJcbiAgICAgICAgICAgICAgICAoZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRXJyb3IpIHx8XHJcbiAgICAgICAgICAgICAgICAoZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoZXJyb3IgPT4gdGhpcy5zdG9wVGltZXIoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRUaW1lcigpIHtcclxuICAgICAgICB0aGlzLmxvYWRTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIHRoaXMubG9hZFRpbWUgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHN0b3BUaW1lcigpIHtcclxuICAgICAgICB0aGlzLmxvYWRUaW1lID0gRGF0ZS5ub3coKSAtIHRoaXMubG9hZFN0YXJ0VGltZTtcclxuICAgICAgICB0aGlzLmxvYWRTdGFydFRpbWUgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGFnZSBUcmFjayBpbiBCYWlkdSBBbmFseXRpY3NcclxuICAgICAqIEBuYW1lIHBhZ2VUcmFja1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFJlcXVpcmVkICdwYXRoJyAoc3RyaW5nKVxyXG4gICAgICpcclxuICAgICAqIEBsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvQXBwbGljYXRpb25JbnNpZ2h0cy1KUy9ibG9iL21hc3Rlci9BUEktcmVmZXJlbmNlLm1kI3RyYWNrcGFnZXZpZXdcclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIHBhZ2VUcmFjayhwYXRoOiBzdHJpbmcpIHtcclxuICAgICAgICBhcHBJbnNpZ2h0cy50cmFja1BhZ2VWaWV3KFxyXG4gICAgICAgICAgICB0aGlzLnRpdGxlLmdldFRpdGxlKCksXHJcbiAgICAgICAgICAgIHBhdGgsXHJcbiAgICAgICAgICAgIHRoaXMuZGltZW5zaW9ucyxcclxuICAgICAgICAgICAgdGhpcy5tZXRyaWNzLFxyXG4gICAgICAgICAgICB0aGlzLmxvYWRUaW1lXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIExvZyBhIHVzZXIgYWN0aW9uIG9yIG90aGVyIG9jY3VycmVuY2UuXHJcbiAgICAgKiBAcGFyYW0gICBuYW1lICAgIEEgc3RyaW5nIHRvIGlkZW50aWZ5IHRoaXMgZXZlbnQgaW4gdGhlIHBvcnRhbC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gICBwcm9wZXJ0aWVzICBtYXBbc3RyaW5nLCBzdHJpbmddIC0gYWRkaXRpb25hbCBkYXRhIHVzZWQgdG8gZmlsdGVyIGV2ZW50cyBhbmQgbWV0cmljcyBpbiB0aGUgcG9ydGFsLiBEZWZhdWx0cyB0byBlbXB0eS5cclxuICAgICAqXHJcbiAgICAgKiBAaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9BcHBsaWNhdGlvbkluc2lnaHRzLUpTL2Jsb2IvbWFzdGVyL0FQSS1yZWZlcmVuY2UubWQjdHJhY2tldmVudFxyXG4gICAgICovXHJcbiAgICBldmVudFRyYWNrKG5hbWU6IHN0cmluZywgcHJvcGVydGllczogYW55KSB7XHJcbiAgICAgICAgYXBwSW5zaWdodHMudHJhY2tFdmVudChuYW1lLCBwcm9wZXJ0aWVzLCB0aGlzLm1lYXN1cmVtZW50cyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFeGNlcHRpb24gVHJhY2sgRXZlbnQgaW4gR0FcclxuICAgICAqIEBuYW1lIGV4Y2VwdGlvblRyYWNrXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHthbnl9IHByb3BlcnRpZXMgQ29tcHJpc2VkIG9mIHRoZSBtYW5kYXRvcnkgZmllbGRzICdhcHBJZCcgKHN0cmluZyksICdhcHBOYW1lJyAoc3RyaW5nKSBhbmQgJ2FwcFZlcnNpb24nIChzdHJpbmcpIGFuZFxyXG4gICAgICogb3B0aW9uYWwgIGZpZWxkcyAnZmF0YWwnIChib29sZWFuKSBhbmQgJ2Rlc2NyaXB0aW9uJyAoc3RyaW5nKSwgZXJyb3JcclxuICAgICAqXHJcbiAgICAgKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L0FwcGxpY2F0aW9uSW5zaWdodHMtSlMvYmxvYi9tYXN0ZXIvQVBJLXJlZmVyZW5jZS5tZCN0cmFja2V4Y2VwdGlvblxyXG4gICAgICovXHJcbiAgICBleGNlcHRpb25UcmFjayhwcm9wZXJ0aWVzOiBhbnkpIHtcclxuICAgICAgICBsZXQgZGVzY3JpcHRpb24gPSBwcm9wZXJ0aWVzLmV2ZW50IHx8IHByb3BlcnRpZXMuZGVzY3JpcHRpb24gfHwgcHJvcGVydGllcztcclxuXHJcbiAgICAgICAgYXBwSW5zaWdodHMudHJhY2tFeGNlcHRpb24oZGVzY3JpcHRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB1c2VySWRcclxuICAgICAqXHJcbiAgICAgKiBAbGluayBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L0FwcGxpY2F0aW9uSW5zaWdodHMtSlMvYmxvYi9tYXN0ZXIvQVBJLXJlZmVyZW5jZS5tZCNzZXRhdXRoZW50aWNhdGVkdXNlcmNvbnRleHRcclxuICAgICAqL1xyXG5cclxuICAgIHNldFVzZXJuYW1lKHVzZXJJZDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5hbmd1bGFydGljczIuc2V0dGluZ3MuYXBwSW5zaWdodHMudXNlcklkID0gdXNlcklkO1xyXG4gICAgICAgIGFwcEluc2lnaHRzLnNldEF1dGhlbnRpY2F0ZWRVc2VyQ29udGV4dCh1c2VySWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFVzZXJQcm9wZXJ0aWVzKHByb3BlcnRpZXM6IGFueSkge1xyXG4gICAgICAgIGlmIChwcm9wZXJ0aWVzLnVzZXJJZCkge1xyXG4gICAgICAgICAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5hcHBJbnNpZ2h0cy51c2VySWQgPSBwcm9wZXJ0aWVzLnVzZXJJZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwcm9wZXJ0aWVzLmFjY291bnRJZCkge1xyXG4gICAgICAgICAgICBhcHBJbnNpZ2h0cy5zZXRBdXRoZW50aWNhdGVkVXNlckNvbnRleHQoXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5hcHBJbnNpZ2h0cy51c2VySWQsXHJcbiAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzLmFjY291bnRJZFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9wcm92aWRlcnMvYXBwaW5zaWdodHMvYW5ndWxhcnRpY3MyLWFwcGluc2lnaHRzLnRzIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQW5ndWxhcnRpY3MyIH0gZnJvbSAnLi4vLi4vY29yZS9hbmd1bGFydGljczInO1xyXG5cclxuZGVjbGFyZSB2YXIgX2hzcTogYW55O1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQW5ndWxhcnRpY3MySHVic3BvdCB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBhbmd1bGFydGljczI6IEFuZ3VsYXJ0aWNzMlxyXG4gICkge1xyXG4gICAgaWYgKHR5cGVvZiBfaHNxID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICBfaHNxID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hbmd1bGFydGljczIucGFnZVRyYWNrLnN1YnNjcmliZSgoeDogYW55KSA9PiB0aGlzLnBhZ2VUcmFjayh4LnBhdGgsIHgubG9jYXRpb24pKTtcclxuXHJcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5ldmVudFRyYWNrLnN1YnNjcmliZSgoeDogYW55KSA9PiB0aGlzLmV2ZW50VHJhY2soeC5hY3Rpb24sIHgucHJvcGVydGllcykpO1xyXG5cclxuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnNldFVzZXJQcm9wZXJ0aWVzLnN1YnNjcmliZSgoeDogYW55KSA9PiB0aGlzLnNldFVzZXJQcm9wZXJ0aWVzKHgpKTtcclxuICB9XHJcblxyXG4gIHBhZ2VUcmFjayhwYXRoOiBzdHJpbmcsIGxvY2F0aW9uOiBhbnkpIHtcclxuICAgIGlmICh0eXBlb2YgX2hzcSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgX2hzcS5wdXNoKFsnc2V0UGF0aCcsIHBhdGhdKTtcclxuICAgICAgX2hzcS5wdXNoKFsndHJhY2tQYWdlVmlldyddKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGV2ZW50VHJhY2soYWN0aW9uOiBzdHJpbmcsIHByb3BlcnRpZXM6IGFueSkge1xyXG4gICAgaWYgKHR5cGVvZiBfaHNxICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICBfaHNxLnB1c2goWyd0cmFja0V2ZW50JywgcHJvcGVydGllc10pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0VXNlclByb3BlcnRpZXMocHJvcGVydGllczogYW55KSB7XHJcbiAgICBpZiAodHlwZW9mIF9oc3EgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgIF9oc3EucHVzaChbJ2lkZW50aWZ5JywgcHJvcGVydGllc10pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9wcm92aWRlcnMvaHVic3BvdC9hbmd1bGFydGljczItaHVic3BvdC50cyIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTG9jYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBBbmd1bGFydGljczIgfSBmcm9tICcuLi8uLi9jb3JlL2FuZ3VsYXJ0aWNzMic7XHJcblxyXG5kZWNsYXJlIHZhciBzOiBhbnk7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBbmd1bGFydGljczJBZG9iZUFuYWx5dGljcyB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBhbmd1bGFydGljczI6IEFuZ3VsYXJ0aWNzMixcclxuICAgIHByaXZhdGUgbG9jYXRpb246IExvY2F0aW9uXHJcbiAgKSB7XHJcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXR0aW5ncy5wYWdlVHJhY2tpbmcudHJhY2tSZWxhdGl2ZVBhdGggPSB0cnVlO1xyXG5cclxuICAgIHRoaXMuYW5ndWxhcnRpY3MyLnBhZ2VUcmFjay5zdWJzY3JpYmUoKHg6IGFueSkgPT4gdGhpcy5wYWdlVHJhY2soeC5wYXRoKSk7XHJcblxyXG4gICAgdGhpcy5hbmd1bGFydGljczIuZXZlbnRUcmFjay5zdWJzY3JpYmUoKHg6IGFueSkgPT4gdGhpcy5ldmVudFRyYWNrKHguYWN0aW9uLCB4LnByb3BlcnRpZXMpKTtcclxuXHJcbiAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5zZXRVc2VyUHJvcGVydGllcy5zdWJzY3JpYmUoKHg6IGFueSkgPT4gdGhpcy5zZXRVc2VyUHJvcGVydGllcyh4KSk7XHJcbiAgfVxyXG5cclxuICBwYWdlVHJhY2socGF0aDogc3RyaW5nKSB7XHJcbiAgICBpZiAodHlwZW9mIHMgIT09ICd1bmRlZmluZWQnICYmIHMpIHtcclxuICAgICAgcy5jbGVhclZhcnMoKTtcclxuICAgICAgcy50KHtwYWdlTmFtZTpwYXRofSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUcmFjayBFdmVudCBpbiBBZG9iZSBBbmFseXRpY3NcclxuICAgKiBAbmFtZSBldmVudFRyYWNrXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gYWN0aW9uIFJlcXVpcmVkICdhY3Rpb24nIChzdHJpbmcpIGFzc29jaWF0ZWQgd2l0aCB0aGUgZXZlbnRcclxuICAgKiBAcGFyYW0ge29iamVjdH0gcHJvcGVydGllcyBDb21wcmlzZWQgb2YgdGhlIG1hbmRhdG9yeSBmaWVsZCAnY2F0ZWdvcnknIChzdHJpbmcpIGFuZCBvcHRpb25hbCAgZmllbGRzICdsYWJlbCcgKHN0cmluZyksICd2YWx1ZScgKGludGVnZXIpIGFuZCAnbm9uaW50ZXJhY3Rpb24nIChib29sZWFuKVxyXG4gICAqXHJcbiAgICogQGxpbmsgaHR0cHM6Ly9tYXJrZXRpbmcuYWRvYmUuY29tL3Jlc291cmNlcy9oZWxwL2VuX1VTL3NjL2ltcGxlbWVudC9qc19pbXBsZW1lbnRhdGlvbi5odG1sXHJcbiAgICovXHJcbiAgZXZlbnRUcmFjayhhY3Rpb246IHN0cmluZywgcHJvcGVydGllczogYW55KSB7XHJcbiAgICBpZiAoIXByb3BlcnRpZXMpIHtcclxuICAgICAgcHJvcGVydGllcyA9IHByb3BlcnRpZXMgfHwge307XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiBzICE9PSAndW5kZWZpbmVkJyAmJiBzKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgcHJvcGVydGllcyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICB0aGlzLnNldFVzZXJQcm9wZXJ0aWVzKHByb3BlcnRpZXMpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChhY3Rpb24pIHtcclxuICAgICAgICAvLyBpZiBsaW5rTmFtZSBwcm9wZXJ0eSBpcyBwYXNzZWQsIHVzZSB0aGF0OyBvdGhlcndpc2UsIHRoZSBhY3Rpb24gaXMgdGhlIGxpbmtOYW1lXHJcbiAgICAgICAgY29uc3QgbGlua05hbWUgPSAocHJvcGVydGllc1snbGlua05hbWUnXSkgPyBwcm9wZXJ0aWVzWydsaW5rTmFtZSddIDogYWN0aW9uO1xyXG4gICAgICAgIC8vIG5vdGUgdGhhdCAndGhpcycgc2hvdWxkIHJlZmVyIHRoZSBsaW5rIGVsZW1lbnQsIGJ1dCB3ZSBjYW4ndCBnZXQgdGhhdCBpbiB0aGlzIGZ1bmN0aW9uLiBleGFtcGxlOlxyXG4gICAgICAgIC8vIDxhIGhyZWY9XCJodHRwOi8vYW5vdGhlcnNpdGUuY29tXCIgb25jbGljaz1cInMudGwodGhpcywnZScsJ0Fub3RoZXJTaXRlJyxudWxsKVwiPlxyXG4gICAgICAgIC8vIGlmIGRpc2FibGVEZWxheSBwcm9wZXJ0eSBpcyBwYXNzZWQsIHVzZSB0aGF0IHRvIHR1cm4gb2ZmL29uIHRoZSA1MDBtcyBkZWxheTsgb3RoZXJ3aXNlLCBpdCB1c2VzIHRoaXNcclxuICAgICAgICBjb25zdCBkaXNhYmxlRGVsYXkgPSAhIXByb3BlcnRpZXNbJ2Rpc2FibGVEZWxheSddID8gdHJ1ZSA6IHRoaXM7XHJcbiAgICAgICAgLy8gaWYgYWN0aW9uIHByb3BlcnR5IGlzIHBhc3NlZCwgdXNlIHRoYXQ7IG90aGVyd2lzZSwgdGhlIGFjdGlvbiByZW1haW5zIHVuY2hhbmdlZFxyXG4gICAgICAgIGlmIChwcm9wZXJ0aWVzWydhY3Rpb24nXSkge1xyXG4gICAgICAgICAgYWN0aW9uID0gcHJvcGVydGllc1snYWN0aW9uJ107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0UGFnZU5hbWUoKTtcclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbi50b1VwcGVyQ2FzZSgpID09PSBcIkRPV05MT0FEXCIpIHtcclxuICAgICAgICAgIHMudGwoZGlzYWJsZURlbGF5LCdkJyxsaW5rTmFtZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChhY3Rpb24udG9VcHBlckNhc2UoKSA9PT0gXCJFWElUXCIpIHtcclxuICAgICAgICAgIHMudGwoZGlzYWJsZURlbGF5LCdlJyxsaW5rTmFtZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHMudGwoZGlzYWJsZURlbGF5LCdvJyxsaW5rTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldFBhZ2VOYW1lKCkge1xyXG4gICAgY29uc3QgcGF0aCA9IHRoaXMubG9jYXRpb24ucGF0aCh0cnVlKTtcclxuICAgIGNvbnN0IGhhc2hOZHggPSBwYXRoLmluZGV4T2YoJyMnKTtcclxuICAgIGlmIChoYXNoTmR4ID4gMCAmJiBoYXNoTmR4IDwgcGF0aC5sZW5ndGgpIHtcclxuICAgICAgcy5wYWdlTmFtZSA9IHBhdGguc3Vic3RyaW5nKGhhc2hOZHgrMSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzLnBhZ2VOYW1lID0gcGF0aDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldFVzZXJQcm9wZXJ0aWVzKHByb3BlcnRpZXM6IGFueSkge1xyXG4gICAgaWYgKHR5cGVvZiBzICE9PSAndW5kZWZpbmVkJyAmJiBzKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgcHJvcGVydGllcyA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gcHJvcGVydGllcykge1xyXG4gICAgICAgICAgaWYgKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICBzW2tleV0gPSBwcm9wZXJ0aWVzW2tleV07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9ub2RlX21vZHVsZXMvdHNsaW50LWxvYWRlciEuL3NyYy9wcm92aWRlcnMvYWRvYmVhbmFseXRpY3MvYW5ndWxhcnRpY3MyLWFkb2JlYW5hbHl0aWNzLnRzIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUaXRsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5pbXBvcnQgeyBBbmd1bGFydGljczIgfSBmcm9tICcuLi8uLi9jb3JlL2FuZ3VsYXJ0aWNzMic7XHJcblxyXG5kZWNsYXJlIHZhciBjbGlja3k6IGFueTtcclxuZGVjbGFyZSB2YXIgd2luZG93OiBhbnk7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBbmd1bGFydGljczJDbGlja3kge1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIGFuZ3VsYXJ0aWNzMjogQW5ndWxhcnRpY3MyLFxyXG4gICAgICAgIHByaXZhdGUgdGl0bGVTZXJ2aWNlOiBUaXRsZVxyXG4gICAgKSB7XHJcbiAgICAgICAgaWYoIHR5cGVvZiAoY2xpY2t5KSA9PT0gJ3VuZGVmaW5lZCcgKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignQW5ndWxhcnRpY3MgMiBDbGlja3kgUGx1Z2luOiBjbGlja3kgZ2xvYmFsIG5vdCBmb3VuZCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFuZ3VsYXJ0aWNzMi5wYWdlVHJhY2suc3Vic2NyaWJlKCh4OiBhbnkpID0+IHRoaXMucGFnZVRyYWNrKHgucGF0aCkpO1xyXG4gICAgICAgIHRoaXMuYW5ndWxhcnRpY3MyLmV2ZW50VHJhY2suc3Vic2NyaWJlKCh4OiBhbnkpID0+IHRoaXMuZXZlbnRUcmFjayh4LmFjdGlvbiwgeC5wcm9wZXJ0aWVzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcGFnZVRyYWNrIChwYXRoOnN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGxldCB0aXRsZTogc3RyaW5nID0gdGhpcy50aXRsZVNlcnZpY2UuZ2V0VGl0bGUoKTtcclxuICAgICAgICBjbGlja3kubG9nKHBhdGgsIHRpdGxlLCAncGFnZXZpZXcnKTtcclxuICAgIH1cclxuXHJcbiAgICBldmVudFRyYWNrIChhY3Rpb246c3RyaW5nLCBwcm9wZXJ0aWVzOmFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmKCB0eXBlb2YgKHByb3BlcnRpZXMuZ29hbCkgPT09ICd1bmRlZmluZWQnICkge1xyXG4gICAgICAgICAgICBsZXQgdGl0bGU6IHN0cmluZyA9IHByb3BlcnRpZXMudGl0bGUgfHwgbnVsbDtcclxuICAgICAgICAgICAgbGV0IHR5cGU6IHN0cmluZyA9IChwcm9wZXJ0aWVzLmV2ZW50VHlwZSAhPSBudWxsKT8gdGhpcy52YWxpZGF0ZVR5cGUocHJvcGVydGllcy5ldmVudFR5cGUpIDogbnVsbDtcclxuICAgICAgICAgICAgY2xpY2t5LmxvZyhhY3Rpb24sIHRpdGxlLCB0eXBlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgZ29hbElkID0gcHJvcGVydGllcy5nb2FsO1xyXG4gICAgICAgICAgICBsZXQgcmV2ZW51ZSA9IHRoaXMudmFsaWRhdGVOdW1iZXIocHJvcGVydGllcy5yZXZlbnVlKSA/IHByb3BlcnRpZXMucmV2ZW51ZSA6IG51bGw7XHJcbiAgICAgICAgICAgIGxldCBub1F1ZXVlID0gISFwcm9wZXJ0aWVzLm5vUXVldWU7XHJcbiAgICAgICAgICAgIGNsaWNreS5nb2FsKGdvYWxJZCwgcmV2ZW51ZSwgbm9RdWV1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhbGlkYXRlVHlwZSAodHlwZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBUWVBFX0VOVU0gPSBbJ2NsaWNrJywgJ2Rvd25sb2FkJywgJ291dGJvdW5kJywgJ3BhZ2V2aWV3J107XHJcbiAgICAgICAgcmV0dXJuIChUWVBFX0VOVU0uaW5kZXhPZih0eXBlKSA+PSAwKSA/IHR5cGUgOiAncGFnZXZpZXcnO1xyXG4gICAgfVxyXG5cclxuICAgIHZhbGlkYXRlTnVtYmVyIChudW1iZXI6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0eXBlb2YgbnVtYmVyID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZShudW1iZXIpO1xyXG4gICAgICB9XHJcbiAgICBcclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL25vZGVfbW9kdWxlcy90c2xpbnQtbG9hZGVyIS4vc3JjL3Byb3ZpZGVycy9jbGlja3kvYW5ndWxhcnRpY3MyLWNsaWNreS50cyJdLCJzb3VyY2VSb290IjoiIn0=