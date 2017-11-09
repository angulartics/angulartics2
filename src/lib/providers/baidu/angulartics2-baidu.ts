import { Injectable } from '@angular/core';

import { Angulartics2 } from 'angulartics2';


declare var hmt: any;

@Injectable()
export class Angulartics2BaiduAnalytics {
  constructor(private angulartics2: Angulartics2) {
    if (typeof hmt === 'undefined') {
      hmt = [];
    } else {
      hmt.push(['_ setAutoPageview', false]);
    }

    this.angulartics2.pageTrack.subscribe((x: any) => this.pageTrack(x.path));

    this.angulartics2.eventTrack.subscribe((x: any) =>
      this.eventTrack(x.action, x.properties),
    );

    this.angulartics2.setUsername.subscribe((x: string) => this.setUsername(x));

    this.angulartics2.setUserProperties.subscribe((x: any) =>
      this.setUserProperties(x),
    );
  }

  /**
   * Page Track in Baidu Analytics
   *
   * @param path Required url 'path'
   *
   * @link http://tongji.baidu.com/open/api/more?p=ref_trackPageview
   */
  pageTrack(path: string) {
    if (typeof hmt !== 'undefined' && hmt) {
      hmt.push(['_trackPageview', path]);
    }
  }

  /**
   * Track Event in Baidu Analytics
   *
   * @param action Name associated with the event
   * @param properties Comprised of:
   *  - 'category' (string)
   *  - 'opt_label' (string)
   *  - 'opt_value' (string)
   *
   * @link http://tongji.baidu.com/open/api/more?p=ref_trackEvent
   */
  eventTrack(action: string, properties: any) {
    // baidu analytics requires category
    if (!properties || !properties.category) {
      properties = properties || {};
      properties.category = 'Event';
      properties.opt_label = 'default';
      properties.opt_value = 'default';
    }

    if (typeof hmt !== 'undefined' && hmt) {
      hmt.push([
        '_trackEvent',
        properties.category,
        action,
        properties.opt_label,
        properties.opt_value,
      ]);
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
