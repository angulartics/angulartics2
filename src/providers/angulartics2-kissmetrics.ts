import {Injectable} from 'angular2/core';

import {Angulartics2} from '../index';

@Injectable()
export class Angulartics2Kissmetrics {
	private angulartics2: Angulartics2;
	private window: any = window;

	constructor(
		angulartics2: Angulartics2
	) {
		this.angulartics2 = angulartics2;

		if (typeof (this.window._kmq) == "undefined") {
			this.window._kmq = [];
		}

		this.angulartics2.pageTrack.subscribe((x: any) => this.pageTrack(x.path, x.location));

		this.angulartics2.eventTrack.subscribe((x: any) => this.eventTrack(x.action, x.properties));

		this.angulartics2.setUsername.subscribe((x: string) => this.setUsername(x));

		this.angulartics2.setUserProperties.subscribe((x: any) => this.setUserProperties(x));
	}

	pageTrack(path: string, location: any) {
		this.window._kmq.push(['record', 'Pageview', { 'Page': path }]);
	}

	eventTrack(action: string, properties: any) {
		this.window._kmq.push(['record', action, properties]);
	}

	setUsername(userId: string) {
		this.window._kmq.push(['identify', userId]);
	}

	setUserProperties(properties: any) {
		this.window._kmq.push(['set', properties]);
	}
}
