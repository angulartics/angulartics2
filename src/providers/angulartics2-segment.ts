import {Injectable} from 'angular2/core';

import {Angulartics2} from '../index';

@Injectable()
export class Angulartics2Segment {
	private angulartics2: Angulartics2;
	private window: any = window;

	constructor(
		angulartics2: Angulartics2
	) {
		this.angulartics2 = angulartics2;

		this.angulartics2.pageTrack.subscribe((x: any) => this.pageTrack(x.path, x.location));

		this.angulartics2.eventTrack.subscribe((x: any) => this.eventTrack(x.action, x.properties));

		this.angulartics2.setUserProperties.subscribe((x: any) => this.setUserProperties(x));

		this.angulartics2.setUserPropertiesOnce.subscribe((x: any) => this.setUserProperties(x));

		this.angulartics2.setAlias.subscribe((x: string) => this.setAlias(x));
	}

	// https://segment.com/docs/libraries/analytics.js/#page
  // analytics.page([category], [name], [properties], [options], [callback]);
  // TODO : Support optional parameters where the parameter order and type changes their meaning
  // e.g.
  // (string) is (name)
  // (string, string) is (category, name)
  // (string, object) is (name, properties)
	pageTrack(path: string, location: any) {
		try {
			this.window.analytics.page(path);
		} catch (e) {
			if (!(e instanceof ReferenceError)) {
				throw e;
			}
		}
	}

	// https://segment.com/docs/libraries/analytics.js/#track
  // analytics.track(event, [properties], [options], [callback]);
	eventTrack(action: string, properties: any) {
		try {
			this.window.analytics.track(action, properties);
		} catch (e) {
			if (!(e instanceof ReferenceError)) {
				throw e;
			}
		}
	}

	// https://segment.com/docs/libraries/analytics.js/#identify
  // analytics.identify([userId], [traits], [options], [callback]);
	setUserProperties(properties: any) {
		try {
			if (properties.userId) {
				this.window.analytics.identify(properties.userId, properties);
			} else {
				this.window.analytics.identify(properties);
			}
		} catch (e) {
			if (!(e instanceof ReferenceError)) {
				throw e;
			}
		}
	}

	// https://segment.com/docs/libraries/analytics.js/#alias
  // analytics.alias(userId, previousId, options, callback);
	setAlias(alias: any) {
		try {
			this.window.analytics.alias(alias);
		} catch (e) {
			if (!(e instanceof ReferenceError)) {
				throw e;
			}
		}
	}
}
