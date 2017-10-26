import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class Angulartics2 {
  public settings: any = {
    pageTracking: {
      autoTrackVirtualPages: true,
      basePath: '',
      excludedRoutes: [],
    },
    eventTracking: {},
    developerMode: false,
  };

  pageTrack = new ReplaySubject<{ path?: string, location?: Location}>(10);
  eventTrack = new ReplaySubject<{action: string} | any>(10);
  exceptionTrack = new ReplaySubject<any>(10);
  setAlias = new ReplaySubject<string>(10);
  setUsername = new ReplaySubject<{userId: string | number} | string>(10);
  setUserProperties = new ReplaySubject<any>(10);
  setUserPropertiesOnce = new ReplaySubject<any>(10);
  setSuperProperties = new ReplaySubject<any>(10);
  setSuperPropertiesOnce = new ReplaySubject<any>(10);
  userTimings = new ReplaySubject<any>(10);

  constructor(location: Location, router: Router) {
    this.trackLocation(location, router);
  }

  trackLocation(location: Location, router: Router) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      filter(() => !this.settings.developerMode),
    ).subscribe(
      (event: NavigationEnd) => this.trackUrlChange(event.urlAfterRedirects, location),
    );
  }

  virtualPageviews(value: boolean) {
    this.settings.pageTracking.autoTrackVirtualPages = value;
  }
  excludeRoutes(routes: Array<string|RegExp>) {
    this.settings.pageTracking.excludedRoutes = routes;
  }
  firstPageview(value: boolean) {
    this.settings.pageTracking.autoTrackFirstPage = value;
  }
  withBase(value: string) {
    this.settings.pageTracking.basePath = (value);
  }
  developerMode(value: boolean) {
    this.settings.developerMode = value;
  }

  protected trackUrlChange(url: string, location: Location) {
    if (this.settings.developerMode === true) {
      return;
    }
    if (this.settings.pageTracking.autoTrackVirtualPages && !this.matchesExcludedRoute(url)) {
      this.pageTrack.next({
        path: this.settings.pageTracking.basePath.length ? this.settings.pageTracking.basePath + url : location.prepareExternalUrl(url),
        location: location
      });
    }
  }

  protected matchesExcludedRoute(url: string): boolean {
    for (const excludedRoute of this.settings.pageTracking.excludedRoutes) {
      if ((excludedRoute instanceof RegExp && excludedRoute.test(url)) || url.indexOf(excludedRoute) > -1) {
        return true;
      }
    }
    return false;
  }
}
