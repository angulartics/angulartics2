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
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var angulartics2_1 = require('./angulartics2');
var Angulartics2On = (function () {
    function Angulartics2On(elRef, angulartics2, eventManager) {
        this.elRef = elRef;
        this.angulartics2 = angulartics2;
        this.eventManager = eventManager;
        this.el = elRef.nativeElement;
    }
    Angulartics2On.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.eventManager.addEventListener(this.el, this.angulartics2On || 'click', function (event) { return _this.eventTrack(event); });
    };
    Angulartics2On.prototype.eventTrack = function (event) {
        if (this.angularticsIf && !eval(this.angularticsIf)) {
            return;
        }
        var action = this.angularticsEvent || this.inferEventName();
        var properties = {
            eventType: event.type
        };
        if (this.angularticsCategory) {
            properties.category = this.angularticsCategory;
        }
        if (this.angularticsProperties) {
            Object.assign(properties, eval(this.angularticsProperties));
        }
        this.angulartics2.eventTrack.next({
            action: action,
            properties: properties
        });
    };
    Angulartics2On.prototype.isCommand = function () {
        return ['a:', 'button:', 'button:button', 'button:submit', 'input:button', 'input:submit'].indexOf(dom_adapter_1.getDOM().tagName(this.el).toLowerCase() + ':' + (dom_adapter_1.getDOM().type(this.el) || '')) >= 0;
    };
    Angulartics2On.prototype.inferEventName = function () {
        if (this.isCommand())
            return dom_adapter_1.getDOM().getText(this.el) || dom_adapter_1.getDOM().getValue(this.el);
        return dom_adapter_1.getDOM().getProperty(this.el, 'id') || dom_adapter_1.getDOM().getProperty(this.el, 'name') || dom_adapter_1.getDOM().tagName(this.el);
    };
    __decorate([
        core_1.Input('angulartics2On'), 
        __metadata('design:type', String)
    ], Angulartics2On.prototype, "angulartics2On", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Angulartics2On.prototype, "angularticsEvent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Angulartics2On.prototype, "angularticsCategory", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Angulartics2On.prototype, "angularticsIf", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Angulartics2On.prototype, "angularticsProperties", void 0);
    Angulartics2On = __decorate([
        core_1.Injectable(),
        core_1.Directive({
            selector: '[angulartics2On]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, angulartics2_1.Angulartics2, platform_browser_1.EventManager])
    ], Angulartics2On);
    return Angulartics2On;
}());
exports.Angulartics2On = Angulartics2On;
