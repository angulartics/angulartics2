import {Directive, Injectable, Input, ElementRef, AfterContentInit} from 'angular2/core';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';

import {Angulartics2} from './angulartics2';

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

	private elRef: ElementRef;
	private el: any;
	private angulartics2: Angulartics2;

	constructor(
		elRef: ElementRef,
		angulartics2: Angulartics2
	) {
		this.elRef = elRef;
		this.el = elRef.nativeElement;
		this.angulartics2 = angulartics2;
	}

	ngAfterContentInit() {
		DOM.on(this.el, this.angulartics2On, (event: any) => this.eventTrack(event));
  }

	eventTrack(event: any) {
		if (this.angularticsIf && !eval(this.angularticsIf)) {
			return; // Cancel this event if we don't pass the angulartics-if condition
		}

		const action = this.angularticsEvent || this.inferEventName();
		let properties: any = {
			eventType: event.type
		};

		if (this.angularticsCategory) {
			properties.category = this.angularticsCategory;
		}

		// Allow components to pass through an expression that gets merged on to the event properties
		// eg. angulartics-properites='myComponentScope.someConfigExpression.$angularticsProperties'
		if (this.angularticsProperties) {
			Object.assign(properties, eval(this.angularticsProperties));
		}

		this.angulartics2.eventTrack.next({
			action,
			properties
		});
	}

	private isCommand() {
		return ['a:', 'button:', 'button:button', 'button:submit', 'input:button', 'input:submit'].indexOf(
			DOM.tagName(this.el).toLowerCase() + ':' + (DOM.type(this.el) || '')) >= 0;
	}

	private inferEventName() {
		if (this.isCommand()) return DOM.getText(this.el) || DOM.getValue(this.el);
		return DOM.getProperty(this.el, 'id') || DOM.getProperty(this.el, 'name') || DOM.tagName(this.el);
	}
}
