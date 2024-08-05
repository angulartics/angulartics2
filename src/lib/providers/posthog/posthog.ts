import { inject, Injectable } from '@angular/core';
import { Angulartics2 } from '../../angulartics2-core';

declare let posthog: any;

@Injectable({ providedIn: 'root' })
export class Angulartics2Posthog {
  private readonly angulartics2 = inject(Angulartics2);

  constructor() {
    this.angulartics2.setUsername.subscribe(x => this.setUsername(x));
    this.angulartics2.setUserProperties.subscribe(x => this.setUserProperties(x));
    this.angulartics2.setUserPropertiesOnce.subscribe(x => this.setUserPropertiesOnce(x));
    this.angulartics2.setSuperProperties.subscribe(x => this.setSuperProperties(x));
    this.angulartics2.setSuperPropertiesOnce.subscribe(x => this.setSuperPropertiesOnce(x));
    this.angulartics2.setAlias.subscribe(x => this.setAlias(x));
  }

  startTracking(): void {
    this.startPageTracking();
    this.startEventTracking();
  }

  startPageTracking(): void {
    this.angulartics2.pageTrack.pipe(this.angulartics2.filterDeveloperMode()).subscribe(x => {
      this.pageTrack(x.path);
    });
  }

  startEventTracking(): void {
    this.angulartics2.eventTrack.pipe(this.angulartics2.filterDeveloperMode()).subscribe(x => {
      this.eventTrack(x.action, x.properties);
    });
  }

  pageTrack(path: string | undefined): void {
    try {
      posthog.capture('Page Viewed', { page: path });
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  eventTrack(action: string, properties?: any): void {
    try {
      posthog.capture(action, properties);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  setUsername(userId: string | { userId: string | number }): void {
    try {
      posthog.identify(userId);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  setUserProperties(properties: any | undefined): void {
    try {
      posthog.identify(properties["distinct_id"], properties);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  setUserPropertiesOnce(properties: any | undefined): void {
    try {
      posthog.capture('Set User Properties Once', {
        $set_once: properties
      });
    }
    catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  setSuperProperties(properties: any | undefined): void {
    try {
      posthog.capture('Set Super Properties', { $set: properties });
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  setSuperPropertiesOnce(properties: any | undefined): void {
    try {
      posthog.capture('Set Super Properties Once', { $set_once: properties });
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  setAlias(alias: string): void {
    try {
      posthog.alias(alias);
    }
    catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  setGroup(groupType: string, groupKey: string, properties: any) {
    try {
      posthog.group(groupType, groupKey, properties);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }
}
