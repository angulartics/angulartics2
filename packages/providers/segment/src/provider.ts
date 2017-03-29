import { Injectable } from '@angular/core';

import { Angulartics } from '../../../core/src/angulartics';

declare var analytics: any;

@Injectable()
export class AngularticsSegment {

  constructor(
    private angulartics: Angulartics
  ) {
    this.angulartics.pageTrack.subscribe((x: any) => this.pageTrack(x.path, x.location));

    this.angulartics.eventTrack.subscribe((x: any) => this.eventTrack(x.action, x.properties));

    this.angulartics.setUserProperties.subscribe((x: any) => this.setUserProperties(x));

    this.angulartics.setUserPropertiesOnce.subscribe((x: any) => this.setUserProperties(x));

    this.angulartics.setAlias.subscribe((x: string) => this.setAlias(x));
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
      analytics.page(path);
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
      analytics.track(action, properties);
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
        analytics.identify(properties.userId, properties);
      } else {
        analytics.identify(properties);
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
      analytics.alias(alias);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }
}
