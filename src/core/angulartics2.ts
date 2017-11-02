import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';

@Injectable()
export class Angulartics2 {
  public settings: any = {
    pageTracking: {
      autoTrackVirtualPages: true,
      basePath: '',
      excludedRoutes: [],
      clearIds: false
    },
    eventTracking: {},
    developerMode: false
  };

  /*
    @Param: ({url: string, location: Location})
   */
  public pageTrack: ReplaySubject<any> = new ReplaySubject(10);

  /*
    @Param: ({action: any, properties: any})
   */
  public eventTrack: ReplaySubject<any> = new ReplaySubject(10);

  /*
    @Param: (properties: any)
   */
  public exceptionTrack: ReplaySubject<any> = new ReplaySubject(10);

  /*
    @Param: (alias: string)
   */
  public setAlias: ReplaySubject<any> = new ReplaySubject(10);

  /*
    @Param: (userId: string)
   */
  public setUsername: ReplaySubject<any> = new ReplaySubject(10);

  /*
    @Param: ({action: any, properties: any})
   */
  public setUserProperties: ReplaySubject<any> = new ReplaySubject(10);

  /*
    @Param: (properties: any)
   */
  public setUserPropertiesOnce: ReplaySubject<any> = new ReplaySubject(10);

  /*
    @Param: (properties: any)
   */
  public setSuperProperties: ReplaySubject<any> = new ReplaySubject(10);

  /*
    @Param: (properties: any)
   */
  public setSuperPropertiesOnce: ReplaySubject<any> = new ReplaySubject(10);

  /*
    @Param: (properties: any)
   */
  public userTimings: ReplaySubject<any> = new ReplaySubject(10);

  constructor(location: Location, router: Router) {
    this.trackLocation(location, router);
  }

  trackLocation(location: Location, router: Router) {
    router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        if (!this.settings.developerMode) {
          this.trackUrlChange(event.urlAfterRedirects, location);
        }
      });
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
  clearIds(value: boolean) {
    this.settings.pageTracking.clearIds = value;
  }
  developerMode(value: boolean) {
    this.settings.developerMode = value;
  }

  protected trackUrlChange(url: string, location: Location) {
    if (!this.settings.developerMode) {
      if (this.settings.pageTracking.autoTrackVirtualPages && !this.matchesExcludedRoute(url)) {
        const clearedUrl = this.clearUrl(url);
        this.pageTrack.next({
          path: this.settings.pageTracking.basePath.length ? this.settings.pageTracking.basePath + clearedUrl : location.prepareExternalUrl(clearedUrl),
          location: location
        });
      }
    }
  }

  protected matchesExcludedRoute(url: string): boolean {
    for (let excludedRoute of this.settings.pageTracking.excludedRoutes) {
      if ((excludedRoute instanceof RegExp && excludedRoute.test(url)) || url.indexOf(excludedRoute) > -1) {
        return true;
      }
    }
    return false;
  }

  protected clearUrl(url: string): string {
    if (this.settings.pageTracking.clearIds) {
      return url
        .split('/')
        .filter(part => !part.match(/\d+/))
        .join('/')
    }
    return url;
  }
}
