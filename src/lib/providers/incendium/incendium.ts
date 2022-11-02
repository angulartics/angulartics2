import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Angulartics2 } from '../../angulartics2-core';

enum EventNames {
  RUN = 'run',
  GO = 'go',
}

export enum IncendiumEventNames {
  ADD_CONVERION = 'add_conversion',
}

interface IIncendiumResponse {
  value: string;
  type: IncendiumEventNames;
}

type TIncendiumParams =
  | {
      key: string;
    }
  | boolean;

declare var inc: (e: EventNames | IncendiumEventNames, v?: TIncendiumParams, g?: boolean) => string;
declare global {
  interface Window {
    INCENDIUM: any;
  }
}

@Injectable({ providedIn: 'root' })
export class Angulartics2Incendium {
  incendiumResponse = new Subject<Partial<IIncendiumResponse>>();

  constructor(private angulartics2: Angulartics2) {
    if (typeof inc === 'undefined') {
      console.warn('Angulartics 2 Incendium Plugin: incendium global not found');
    }
  }

  startTracking(): void {
    this.angulartics2.pageTrack
      .pipe(this.angulartics2.filterDeveloperMode())
      .subscribe(x => this.pageTrack(x.path));

    this.angulartics2.eventTrack
      .pipe(this.angulartics2.filterDeveloperMode())
      .subscribe(({ action, properties }) => this.trackAction(action, properties));
  }

  /**
   * Track Page in Incendium
   *
   * @param path location
   */
  pageTrack(path: string) {
    inc(EventNames.RUN, false, true);
  }

  /**
   * Track Action
   *
   * @param action Action name
   * @param properties params
   */
  async trackAction(action: string, properties: any) {
    try {
      switch (action as IncendiumEventNames) {
        case IncendiumEventNames.ADD_CONVERION:
          inc(IncendiumEventNames.ADD_CONVERION, properties.key);
          break;

        default:
          break;
      }
      const res = await inc(EventNames.GO);
      this.incendiumResponse.next({
        value: res,
        type: IncendiumEventNames.ADD_CONVERION,
      });
    } catch (error) {
      this.incendiumResponse.error(error);
    }
  }
}
