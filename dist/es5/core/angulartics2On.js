"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
// import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';
var angulartics2_1 = require("./angulartics2");
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
    /*private isCommand() {
      return ['a:', 'button:', 'button:button', 'button:submit', 'input:button', 'input:submit'].indexOf(
        getDOM().tagName(this.el).toLowerCase() + ':' + (getDOM().type(this.el) || '')) >= 0;
    }
  
    private inferEventName() {
      if (this.isCommand()) return getDOM().getText(this.el) || getDOM().getValue(this.el);
      return getDOM().getProperty(this.el, 'id') || getDOM().getProperty(this.el, 'name') || getDOM().tagName(this.el);
    }*/
    Angulartics2On.decorators = [
        { type: core_1.Injectable },
        { type: core_1.Directive, args: [{
                    selector: '[angulartics2On]'
                },] },
    ];
    /** @nocollapse */
    Angulartics2On.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: angulartics2_1.Angulartics2, },
        { type: platform_browser_1.EventManager, },
    ]; };
    Angulartics2On.propDecorators = {
        'angulartics2On': [{ type: core_1.Input, args: ['angulartics2On',] },],
        'angularticsEvent': [{ type: core_1.Input },],
        'angularticsCategory': [{ type: core_1.Input },],
        'angularticsProperties': [{ type: core_1.Input },],
    };
    return Angulartics2On;
}());
exports.Angulartics2On = Angulartics2On;
