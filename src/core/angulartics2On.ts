import { Directive, Injectable, Input, ElementRef, AfterContentInit } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
// import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';

import { Angulartics2 } from './angulartics2';

@Injectable()
@Directive({
  selector: '[angulartics2On]'
})
export class Angulartics2On implements AfterContentInit {
  @Input('angulartics2On') angulartics2On: string;
  @Input() angularticsEvent: string;
  @Input() angularticsCategory: string;
  @Input() angularticsIf: string;
  @Input() angularticsProperties: any;

  private el: any;

  constructor(
    private elRef: ElementRef,
    private angulartics2: Angulartics2,
    private eventManager: EventManager
  ) {
    this.el = elRef.nativeElement;
  }

  ngAfterContentInit() {
    this.eventManager.addEventListener(this.el, this.angulartics2On || 'click', (event: any) => this.eventTrack(event));
  }

  public eventTrack(event: any) {
    if (this.angularticsIf && !this.angularticsIf) {
      return; // Cancel this event if we don't pass the angulartics-if condition
    }

    const action = this.angularticsEvent; // || this.inferEventName();
    let properties: any = {
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
      action,
      properties
    });
  }

  /*private isCommand() {
    return ['a:', 'button:', 'button:button', 'button:submit', 'input:button', 'input:submit'].indexOf(
      getDOM().tagName(this.el).toLowerCase() + ':' + (getDOM().type(this.el) || '')) >= 0;
  }

  private inferEventName() {
    if (this.isCommand()) return getDOM().getText(this.el) || getDOM().getValue(this.el);
    return getDOM().getProperty(this.el, 'id') || getDOM().getProperty(this.el, 'name') || getDOM().tagName(this.el);
  }*/
}
