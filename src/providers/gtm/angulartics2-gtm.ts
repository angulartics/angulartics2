import { Injectable } from '@angular/core';

import { Angulartics2 } from '../../core/angulartics2';

declare var dataLayer: any;

@Injectable()
export class Angulartics2GoogleTagManager {

  constructor(
    private angulartics2: Angulartics2
  ) {

    // The dataLayer needs to be initialized
    if (typeof dataLayer !== 'undefined' && dataLayer) {
      dataLayer = (<any>window).dataLayer = (<any>window).dataLayer || [];
    }

    this.angulartics2.settings.pageTracking.trackRelativePath = true;

    // Set the default settings for this module
    this.angulartics2.settings.gtm = {
      userId: null
    };

    this.angulartics2.pageTrack.subscribe((x: any) => this.pageTrack(x.path));

    this.angulartics2.eventTrack.subscribe((x: any) => this.eventTrack(x.action, x.properties));

    this.angulartics2.exceptionTrack.subscribe((x: any) => this.exceptionTrack(x));

    this.angulartics2.setUsername.subscribe((x: string) => this.setUsername(x));
  }

  pageTrack(path: string) {
    if (typeof dataLayer !== 'undefined' && dataLayer) {
      dataLayer.push({
        'event': 'Page View',
        'content-name': path,
        'userId': this.angulartics2.settings.gtm.userId
      });
    }
  }

  /**
   * Send interactions to the dataLayer, i.e. for event tracking in Google Analytics
   * @name eventTrack
   *
   * @param {string} action Required 'action' (string) associated with the event
   * @param {object} properties Comprised of the mandatory field 'category' (string) and optional  fields 'label' (string), 'value' (integer) and 'noninteraction' (boolean)
   */
  eventTrack(action: string, properties: any) {

    // Set a default GTM category
    properties = properties || {};

    if (typeof dataLayer !== 'undefined' && dataLayer) {
      dataLayer.push({
        event: properties.event || 'interaction',
        target: properties.category || 'Event',
        action: action,
        label: properties.label,
        value: properties.value,
        interactionType: properties.noninteraction,
        userId: this.angulartics2.settings.gtm.userId
      });
    }
  }

  /**
   * Exception Track Event in GTM
   * @name exceptionTrack
   *
   * @param {object} properties Comprised of the mandatory fields 'appId' (string), 'appName' (string) and 'appVersion' (string) and
   * optional  fields 'fatal' (boolean) and 'description' (string)
   */
  exceptionTrack(properties: any) {
    if (! properties || ! properties.appId || ! properties.appName || ! properties.appVersion) {
      console.error('Must be setted appId, appName and appVersion.');
      return;
    }

    if (properties.fatal === undefined) {
      console.log('No "fatal" provided, sending with fatal=true');
      properties.exFatal = true;
    }

    properties.exDescription = properties.event ? properties.event.stack : properties.description;

    this.eventTrack(`Exception thrown for ${properties.appName} <${properties.appId}@${properties.appVersion}>`, {
      'category': 'Exception',
      'label': properties.exDescription
    });
  }

  /**
   * Set userId for use with Universal Analytics User ID feature
   * @name setUsername
   *
   * @param {string} userId Required 'userId' value (string) used to identify user cross-device in Google Analytics
   */
  setUsername(userId: string) {
    this.angulartics2.settings.gtm.userId = userId;
  }
}
