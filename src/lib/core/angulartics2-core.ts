import { Inject, Injectable } from '@angular/core';

import { MonoTypeOperatorFunction, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Angulartics2Settings, DefaultConfig } from './angulartics2-config';
import { EventTrack, PageTrack, UserTimings } from './angulartics2-interfaces';
import { Angulartics2Token, ANGULARTICS2_TOKEN } from './angulartics2-token';
import { RouterlessTracking, TrackNavigationEnd } from './routerless';

@Injectable({ providedIn: 'root' })
export class Angulartics2 {
  settings: Angulartics2Settings;

  pageTrack = new ReplaySubject<Partial<PageTrack>>(10);
  eventTrack = new ReplaySubject<Partial<EventTrack>>(10);
  exceptionTrack = new ReplaySubject<any>(10);
  setAlias = new ReplaySubject<string>(10);
  setUsername = new ReplaySubject<{ userId: string | number } | string>(10);
  setUserProperties = new ReplaySubject<any>(10);
  setUserPropertiesOnce = new ReplaySubject<any>(10);
  setSuperProperties = new ReplaySubject<any>(10);
  setSuperPropertiesOnce = new ReplaySubject<any>(10);
  userTimings = new ReplaySubject<UserTimings>(10);

  constructor(
    private tracker: RouterlessTracking,
    @Inject(ANGULARTICS2_TOKEN) setup: Angulartics2Token,
  ) {
    const defaultConfig = new DefaultConfig();
    this.settings = { ...defaultConfig, ...setup.settings };
    this.settings.pageTracking = {
      ...defaultConfig.pageTracking,
      ...setup.settings.pageTracking,
    };
    this.tracker
      .trackLocation(this.settings)
      .subscribe((event: TrackNavigationEnd) =>
        this.trackUrlChange(event.url),
      );
  }

  /** filters all events when developer mode is true */
  filterDeveloperMode<T>(): MonoTypeOperatorFunction<T> {
    return filter((value, index) => !this.settings.developerMode);
  }

  protected trackUrlChange(url: string) {
    if (this.settings.pageTracking.autoTrackVirtualPages && !this.matchesExcludedRoute(url)) {
      const clearedUrl = this.clearUrl(url);
      let path: string;
      if (this.settings.pageTracking.basePath.length) {
        path = this.settings.pageTracking.basePath + clearedUrl;
      } else {
        path = this.tracker.prepareExternalUrl(clearedUrl);
      }
      this.pageTrack.next({ path });
    }
  }

  /**
   * Use string literals or regular expressions to exclude routes
   * from automatic pageview tracking.
   *
   * @param url location
   */
  protected matchesExcludedRoute(url: string): boolean {
    for (const excludedRoute of this.settings.pageTracking.excludedRoutes) {
      const matchesRegex = excludedRoute instanceof RegExp && excludedRoute.test(url);
      if (matchesRegex || url.indexOf(excludedRoute as string) !== -1) {
        return true;
      }
    }
    return false;
  }

  /**
   * Removes id's from tracked route.
   *  EX: `/project/12981/feature` becomes `/project/feature`
   *
   * @param url current page path
   */
  protected clearUrl(url: string): string {
    if (this.settings.pageTracking.clearIds || this.settings.pageTracking.clearQueryParams ||
      this.settings.pageTracking.clearHash) {
      return url
        .split('/')
        .map(part => this.settings.pageTracking.clearQueryParams ? part.split('?')[0] : part)
        .map(part => this.settings.pageTracking.clearHash ? part.split('#')[0] : part)
        .filter(part => !this.settings.pageTracking.clearIds || !part.match(this.settings.pageTracking.idsRegExp))
        .join('/');
    }
    return url;
  }
}
