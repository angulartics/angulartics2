import {Location} from '@angular/common';
import {Injectable} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {Angulartics2} from './angulartics2';

@Injectable()
export class Angulartics2RouterFix extends Angulartics2 {
  constructor(location: Location, router: Router) {
    super(location);
    this.trackRouter(location, router);
  }

  trackRouter(location: Location, router: Router) {
    router.events.subscribe((value: any) => {
      if (!(value instanceof NavigationEnd)) {
        return;
      } 
      if (!this.settings.developerMode) {
        var url = location.path();
        if (this.settings.pageTracking.autoTrackVirtualPages && !this.matchesExcludedRouteChild(url)) {
          this.pageTrack.next({
            path: this.settings.pageTracking.basePath.length ? this.settings.pageTracking.basePath + url : location.prepareExternalUrl(url),
            location: location
          });
        }
      }
    })
  }

  private matchesExcludedRouteChild(url: string): boolean {
    for (let excludedRoute of this.settings.pageTracking.excludedRoutes) {
      if ((excludedRoute instanceof RegExp && excludedRoute.test(url)) || url.indexOf(excludedRoute) > -1) {
        return true;
      }
    }
    return false;
  }
}