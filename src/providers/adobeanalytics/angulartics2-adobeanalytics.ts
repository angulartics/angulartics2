import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Angulartics2 } from '../../core/angulartics2';

declare var s: any;

@Injectable()
export class Angulartics2AdobeAnalytics {

  constructor(
    private angulartics2: Angulartics2,
    private location: Location
  ) {
    this.angulartics2.settings.pageTracking.trackRelativePath = true;

    this.angulartics2.pageTrack.subscribe((x: any) => this.pageTrack(x.path));

    this.angulartics2.eventTrack.subscribe((x: any) => this.eventTrack(x.action, x.properties));

    this.angulartics2.setUserProperties.subscribe((x: any) => this.setUserProperties(x));
  }

  pageTrack(path: string) {
    if (typeof s !== 'undefined' && s) {
      s.clearVars();
      s.t({pageName:path});
    }
  }

  /**
   * Track Event in Adobe Analytics
   * @name eventTrack
   *
   * @param {string} action Required 'action' (string) associated with the event
   * @param {object} properties Comprised of the mandatory field 'category' (string) and optional  fields 'label' (string), 'value' (integer) and 'noninteraction' (boolean)
   *
   * @link https://marketing.adobe.com/resources/help/en_US/sc/implement/js_implementation.html
   */
  eventTrack(action: string, properties: any) {
    if (!properties) {
      properties = properties || {};
    }

    if (typeof s !== 'undefined' && s) {
      if (typeof properties === 'object') {
        this.setUserProperties(properties);
      }
      if (action) {
        // if linkName property is passed, use that; otherwise, the action is the linkName
        const linkName = (properties['linkName']) ? properties['linkName'] : action;
        // note that 'this' should refer the link element, but we can't get that in this function. example:
        // <a href="http://anothersite.com" onclick="s.tl(this,'e','AnotherSite',null)">
        // if disableDelay property is passed, use that to turn off/on the 500ms delay; otherwise, it uses this
        const disableDelay = !!properties['disableDelay'] ? true : this;
        // if action property is passed, use that; otherwise, the action remains unchanged
        if (properties['action']) {
          action = properties['action'];
        }
        this.setPageName();

        if (action.toUpperCase() === "DOWNLOAD") {
          s.tl(disableDelay,'d',linkName);
        } else if (action.toUpperCase() === "EXIT") {
          s.tl(disableDelay,'e',linkName);
        } else {
          s.tl(disableDelay,'o',linkName);
        }
      }
    }
  }

  private setPageName() {
    const path = this.location.path(true);
    const hashNdx = path.indexOf('#');
    if (hashNdx > 0 && hashNdx < path.length) {
      s.pageName = path.substring(hashNdx+1);
    } else {
      s.pageName = path;
    }
  }

  setUserProperties(properties: any) {
    if (typeof properties === 'object') {
      for (let key in properties) {
        if (properties.hasOwnProperty(key)) {
          s[key] = properties[key];
        }
      }
    }
  }

}
