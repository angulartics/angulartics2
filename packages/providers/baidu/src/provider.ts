import { Injectable } from '@angular/core';

import { Angulartics } from '../../../core/src/angulartics';

declare var hmt: any;

@Injectable()
export class AngularticsBaiduAnalytics {

    constructor(
        private angulartics: Angulartics
    ) {
        if (typeof (hmt) === 'undefined') {
            hmt = [];
        } else {
            hmt.push(['_ setAutoPageview', false]);
        }

        this.angulartics.pageTrack.subscribe((x: any) => this.pageTrack(x.path));

        this.angulartics.eventTrack.subscribe((x: any) => this.eventTrack(x.action, x.properties));

        this.angulartics.setUsername.subscribe((x: string) => this.setUsername(x));

        this.angulartics.setUserProperties.subscribe((x: any) => this.setUserProperties(x));
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
    pageTrack(path: string) {
        if (typeof hmt !== 'undefined' && hmt) {
            hmt.push(['_trackPageview', path]);
        }
    }

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
    eventTrack(action: string, properties: any) {
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
    }

    setUsername(userId: string) {
        // set default custom variables name to 'identity' and 'value'
        hmt.push(['_setCustomVar', 1, 'identity', userId]);
    }

    setUserProperties(properties: any) {
        hmt.push(['_setCustomVar', 2, 'user', JSON.stringify(properties)]);
    }
}
