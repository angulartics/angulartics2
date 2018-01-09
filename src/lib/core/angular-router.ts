import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { filter } from 'rxjs/operators/filter';
import { map } from 'rxjs/operators/map';

import { Observable } from 'rxjs/Observable';
import { RouterlessTracking, TrackNavigationEnd } from './routerless';

/**
 * Track Route changes for applications using Angular's
 * default router
 *
 * @link https://angular.io/api/router/Router
 */
@Injectable()
export class AngularRouterTracking implements RouterlessTracking {
  constructor(
    private router: Router,
    private location: Location,
  ) {}

  trackLocation(settings): Observable<TrackNavigationEnd> {
    return this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      filter(() => !settings.developerMode),
      map((e: NavigationEnd) => {
        return { url: e.urlAfterRedirects };
      }),
    );
  }

  prepareExternalUrl(url: string): string {
    return this.location.prepareExternalUrl(url);
  }
}
