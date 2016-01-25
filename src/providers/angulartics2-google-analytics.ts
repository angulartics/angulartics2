import {Injectable} from 'angular2/core';

import {Angulartics2} from '../index';

@Injectable()
export class Angulartics2GoogleAnalytics {
	private angulartics2: Angulartics2;
	private window: any = window;

	constructor(
		angulartics2: Angulartics2
	) {
		this.angulartics2 = angulartics2;

		this.angulartics2.settings.pageTracking.trackRelativePath = true;

		// Set the default settings for this module
		this.angulartics2.settings.ga = {
			// array of additional account names (only works for analyticsjs)
			additionalAccountNames: [],
			userId: null
		};

		this.angulartics2.pageTrack.subscribe((x: any) => this.pageTrack(x));

		this.angulartics2.eventTrack.subscribe((x: any) => this.eventTrack(x.actions, x.properties));

		this.angulartics2.exceptionTrack.subscribe((x: any) => this.exceptionTrack(x));

		this.angulartics2.setUsername.subscribe((x: string) => this.setUsername(x));

		this.angulartics2.setUserProperties.subscribe((x: any) => this.setUserProperties(x));

		this.angulartics2.userTimings.subscribe((x: any) => this.userTimings(x));
	}

	pageTrack(object: any) {
		if (this.window._gaq) {
			this.window._gaq.push(['_trackPageview', object.path]);
			for (var accountName of this.angulartics2.settings.ga.additionalAccountNames) {
				this.window._gaq.push([accountName + '._trackPageview', object.path]);
			};
		}
		if (this.window.ga) {
			if (this.angulartics2.settings.ga.userId) {
				this.window.ga('set', '&uid', this.angulartics2.settings.ga.userId);
			}
			this.window.ga('send', 'pageview', object.path);
			for (var accountName of this.angulartics2.settings.ga.additionalAccountNames) {
				this.window.ga(accountName + '.send', 'pageview', object.path);
			};
		}
	}

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
	eventTrack(action: string, properties: any) {
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

		if (this.window.ga) {
			var eventOptions = {
				eventCategory: properties.category,
				eventAction: action,
				eventLabel: properties.label,
				eventValue: properties.value,
				nonInteraction: properties.noninteraction,
				page: properties.page || this.window.location.hash.substring(1) || this.window.location.pathname,
				userId: this.angulartics2.settings.ga.userId
			};

			// add custom dimensions and metrics
			this.setDimensionsAndMetrics(properties);

			if (this.angulartics2.settings.ga.transport) {
				this.window.ga('send', 'event', eventOptions, { transport: this.angulartics2.settings.ga.transport });
			} else {
				this.window.ga('send', 'event', eventOptions);
			}

			for (let accountName of this.angulartics2.settings.ga.additionalAccountNames) {
				this.window.ga(accountName + '.send', 'event', eventOptions);
			}
		} else if (this.window._gaq) {
			this.window._gaq.push(['_trackEvent', properties.category, action, properties.label, properties.value, properties.noninteraction]);
		}
	}

	/**
	 * Exception Track Event in GA
	 * @name exceptionTrack
	 *
	 * @param {object} properties Comprised of the mandatory fields 'appId' (string), 'appName' (string) and 'appVersion' (string) and 
	 * optional  fields 'fatal' (boolean) and 'description' (string)
	 *
	 * @https://developers.google.com/analytics/devguides/collection/analyticsjs/exceptions
	 *
	 * @link https://developers.google.com/analytics/devguides/collection/analyticsjs/events
	 */
	exceptionTrack(properties: any) {
		if (!properties || !properties.appId || !properties.appName || !properties.appVersion) {
			console.error('Must be setted appId, appName and appVersion.');
			return;
		}

		if (properties.fatal === undefined) {
			console.log('No "fatal" provided, sending with fatal=true');
			properties.exFatal = true;
		}

		properties.exDescription = properties.description;

		this.window.ga('send', 'exception', properties);
	}

	setUsername(userId: string) {
		this.angulartics2.settings.ga.userId = userId;
	}

	setUserProperties(properties: any) {
		this.setDimensionsAndMetrics(properties);
	}

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
	userTimings(properties: any) {
		if (!properties || !properties.timingCategory || !properties.timingVar || !properties.timingValue) {
			console.error('Properties timingCategory, timingVar, and timingValue are required to be set.');
			return;
		}

		if (this.window.ga) {
			this.window.ga('send', 'timing', properties);
		}
	}

	private setDimensionsAndMetrics(properties: any) {
		if (this.window.ga) {
			// add custom dimensions and metrics
			for (var idx = 1; idx <= 200; idx++) {
				if (properties['dimension' + idx.toString()]) {
					this.window.ga('set', 'dimension' + idx.toString(), properties['dimension' + idx.toString()]);
				}
				if (properties['metric' + idx.toString()]) {
					this.window.ga('set', 'metric' + idx.toString(), properties['metric' + idx.toString()]);
				}
			}
		}
	}
}
