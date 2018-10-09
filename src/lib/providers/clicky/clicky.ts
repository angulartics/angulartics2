import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Angulartics2 } from 'angulartics2';
import { ClickyProperties } from './clicky.interfaces';

declare var clicky: any;

@Injectable({ providedIn: 'root' })
export class Angulartics2Clicky {
  constructor(
    private angulartics2: Angulartics2,
    private titleService: Title,
  ) {
    if (typeof clicky === 'undefined') {
      console.warn('Angulartics 2 Clicky Plugin: clicky global not found');
    }
  }

  startTracking(): void {
    this.angulartics2.pageTrack
      .pipe(this.angulartics2.filterDeveloperMode())
      .subscribe((x) => this.pageTrack(x.path));
    this.angulartics2.eventTrack
      .pipe(this.angulartics2.filterDeveloperMode())
      .subscribe((x) => this.eventOrGoalTrack(x.action, x.properties));
  }

  /**
   * Track Page in Clicky
   *
   * @param path location
   *
   * @link https://clicky.com/help/custom/manual#log
   */
  pageTrack(path: string) {
    const title: string = this.titleService.getTitle();
    clicky.log(path, title, 'pageview');
  }

  /**
   * Track Event Or Goal in Clicky
   *
   * @param action Action name
   * @param properties Definition of 'properties.goal' determines goal vs event tracking
   *
   * @link https://clicky.com/help/custom/manual#log
   * @link https://clicky.com/help/custom/manual#goal
   */
  eventOrGoalTrack(action: string, properties: Partial<ClickyProperties>) {
    if (typeof properties.goal === 'undefined') {
      const title: string = properties.title || null;
      const type: string = properties.type != null ? this.validateType(properties.type) : null;
      clicky.log(action, title, type);
    } else {
      const goalId: string = properties.goal;
      const revenue: number = properties.revenue;
      clicky.goal(goalId, revenue, !!properties.noQueue);
    }
  }

  private validateType(type: string): string {
    const EventType = ['pageview', 'click', 'download', 'outbound'];
    return EventType.indexOf(type) > -1 ? type : 'pageview';
  }
}
