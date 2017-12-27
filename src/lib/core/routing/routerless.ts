import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Angulartics2Settings } from '../angulartics2-config';

export interface TrackNavigationEnd {
  url: string;
}

export class RouterlessTracking {
  trackLocation(
    settings: Angulartics2Settings,
  ): Observable<TrackNavigationEnd> {
    const subject = new BehaviorSubject<TrackNavigationEnd>({ url: '/' });
    return subject;
  }
}
