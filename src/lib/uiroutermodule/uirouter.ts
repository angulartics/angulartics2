import { Injectable } from '@angular/core';
import { Transition, TransitionService } from '@uirouter/core';

import { Observable, Subject } from 'rxjs';

import { RouterlessTracking, TrackNavigationEnd } from 'angulartics2';

/**
 * Track Route changes for applications using UI-Router
 *
 * @link https://ui-router.github.io/ng2/docs/latest/
 *
 * referenced: https://github.com/ui-router/sample-app-angular/blob/9adb533b85c0f0fccef23968489cca0a5ec84654/src/app/util/ga.ts
 */
@Injectable({ providedIn: 'root' })
export class UIRouterTracking implements RouterlessTracking {
  constructor(private transitionService: TransitionService) {}

  path(trans: Transition) {
    return trans.$to().url.format(trans.params());
  }

  trackLocation(settings): Observable<TrackNavigationEnd> {
    const subject = new Subject<TrackNavigationEnd>();
    this.transitionService.onSuccess(
      {},
      trans => {
        return subject.next({ url: this.path(trans) });
      },
      {
        priority: -10000,
      },
    );
    return subject;
  }

  prepareExternalUrl(url: string): string {
    return url;
  }
}
