import {Injectable} from 'angular2/core';

import {Angulartics2} from '../core/angulartics2';

declare var mixpanel: any;

@Injectable()
export class Angulartics2Mixpanel {
	private angulartics2: Angulartics2;

	constructor(
		angulartics2: Angulartics2
	) {
		this.angulartics2 = angulartics2;

		this.angulartics2.pageTrack.subscribe((x: any) => this.pageTrack(x.path, x.location));

		this.angulartics2.eventTrack.subscribe((x: any) => this.eventTrack(x.action, x.properties));

		this.angulartics2.setUsername.subscribe((x: string) => this.setUsername(x));

		this.angulartics2.setUserProperties.subscribe((x: any) => this.setUserProperties(x));

		this.angulartics2.setUserPropertiesOnce.subscribe((x: any) => this.setUserPropertiesOnce(x));

		this.angulartics2.setSuperProperties.subscribe((x: any) => this.setSuperProperties(x));

		this.angulartics2.setSuperPropertiesOnce.subscribe((x: any) => this.setSuperPropertiesOnce(x));

		this.angulartics2.setAlias.subscribe((x: string) => this.setAlias(x));
	}

	pageTrack(path: string, location: any) {
		try {
			mixpanel.track("Page Viewed", { "page": path });
		} catch (e) {
			if (!(e instanceof ReferenceError)) {
				throw e;
			}
		}
	}

	eventTrack(action: string, properties: any) {
		try {
			mixpanel.track(action, properties);
		} catch (e) {
			if (!(e instanceof ReferenceError)) {
				throw e;
			}
		}
	}

	setUsername(userId: string) {
		try {
			mixpanel.identify(userId);
		} catch (e) {
			if (!(e instanceof ReferenceError)) {
				throw e;
			}
		}
	}

	setUserProperties(properties: any) {
		try {
			mixpanel.people.set(properties);
		} catch (e) {
			if (!(e instanceof ReferenceError)) {
				throw e;
			}
		}
	}

	setUserPropertiesOnce(properties: any) {
		try {
			mixpanel.people.set_once(properties);
		} catch (e) {
			if (!(e instanceof ReferenceError)) {
				throw e;
			}
		}
	}

	setSuperProperties(properties: any) {
		try {
			mixpanel.register(properties);
		} catch (e) {
			if (!(e instanceof ReferenceError)) {
				throw e;
			}
		}
	}

	setSuperPropertiesOnce(properties: any) {
		try {
			mixpanel.register_once(properties);
		} catch (e) {
			if (!(e instanceof ReferenceError)) {
				throw e;
			}
		}
	}

	setAlias(alias: any) {
		try {
			mixpanel.alias(alias);
		} catch (e) {
			if (!(e instanceof ReferenceError)) {
				throw e;
			}
		}
	}
}
