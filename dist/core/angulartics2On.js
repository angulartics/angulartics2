import { Directive, Injectable, Input, ElementRef } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
// import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';
import { Angulartics2 } from './angulartics2';
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
        { type: Injectable },
        { type: Directive, args: [{
                    selector: '[angulartics2On]'
                },] },
    ];
    /** @nocollapse */
    Angulartics2On.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Angulartics2, },
        { type: EventManager, },
    ]; };
    Angulartics2On.propDecorators = {
        'angulartics2On': [{ type: Input, args: ['angulartics2On',] },],
        'angularticsEvent': [{ type: Input },],
        'angularticsCategory': [{ type: Input },],
        'angularticsProperties': [{ type: Input },],
    };
    return Angulartics2On;
}());
export { Angulartics2On };
