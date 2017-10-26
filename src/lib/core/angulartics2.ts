import { Location } from '@angular/common';
import { Injectable, Inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Angulartics2Settings, DefaultConfig } from './angulartics2-config';
import { ANGULARTICS2_TOKEN, Angulartics2Token } from './angulartics2-token';

@Injectable()
export class Angulartics2 {
  settings: Angulartics2Settings;

  pageTrack = new ReplaySubject<{ path?: string; location?: Location }>(10);
  eventTrack = new ReplaySubject<{ action: string } | any>(10);
  exceptionTrack = new ReplaySubject<any>(10);
  setAlias = new ReplaySubject<string>(10);
  setUsername = new ReplaySubject<{ userId: string | number } | string>(10);
  setUserProperties = new ReplaySubject<any>(10);
  setUserPropertiesOnce = new ReplaySubject<any>(10);
  setSuperProperties = new ReplaySubject<any>(10);
  setSuperPropertiesOnce = new ReplaySubject<any>(10);
  userTimings = new ReplaySubject<any>(10);

  constructor(location: Location, router: Router, @Inject(ANGULARTICS2_TOKEN) setup: Angulartics2Token) {
    const defaultConfig = new DefaultConfig;
    this.settings = { ...defaultConfig, ...setup.settings };
    this.settings.pageTracking = { ...defaultConfig.pageTracking, ...setup.settings.pageTracking };
    this.trackLocation(location, router);
  }

  trackLocation(location: Location, router: Router) {
    router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        filter(() => !this.settings.developerMode),
      )
      .subscribe((event: NavigationEnd) =>
        this.trackUrlChange(event.urlAfterRedirects, location),
      );
  }

  protected trackUrlChange(url: string, location: Location) {
    if (this.settings.pageTracking.autoTrackVirtualPages && !this.matchesExcludedRoute(url)) {
      this.pageTrack.next({
        path: this.settings.pageTracking.basePath.length
          ? this.settings.pageTracking.basePath + url
          : location.prepareExternalUrl(url),
        location: location,
      });
    }
  }

  protected matchesExcludedRoute(url: string): boolean {
    for (const excludedRoute of this.settings.pageTracking.excludedRoutes) {
      const matchesRegex = excludedRoute instanceof RegExp && excludedRoute.test(url);
      if (matchesRegex || url.indexOf(<string>excludedRoute) !== -1) {
        return true;
      }
    }
    return false;
  }
}
