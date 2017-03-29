import { Injectable } from '@angular/core';

import { Angulartics } from '../../../core/src/angulartics';

declare var _paq: any;

@Injectable()
export class AngularticsPiwik {

  constructor(
    private angulartics: Angulartics
  ) {
    if (typeof (_paq) === 'undefined') {
      console.warn('Piwik not found');
    }

    this.angulartics.pageTrack.subscribe((x: any) => this.pageTrack(x.path, x.location));

    this.angulartics.eventTrack.subscribe((x: any) => this.eventTrack(x.action, x.properties));

    this.angulartics.setUsername.subscribe((x: string) => this.setUsername(x));

    this.angulartics.setUserProperties.subscribe((x: any) => this.setUserProperties(x));

  }

  pageTrack(path: string, location: any) {
    try {
      _paq.push(['setDocumentTitle', window.document.title]);
      _paq.push(['setCustomUrl', path]);
      _paq.push(['trackPageView']);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  eventTrack(action: string, properties: any) {
    try {
      if (properties.value) {
        var parsed = parseInt(properties.value, 10);
        properties.value = isNaN(parsed) ? 0 : parsed;
      }
      _paq.push(['trackEvent', properties.category, action, properties.label, properties.value]);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  setUsername(userId: string) {
    try {
      _paq.push(['setUserId', userId]);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  setUserProperties(properties: any) {
    try {
      _paq.push(['setCustomVariable', properties]);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

}
