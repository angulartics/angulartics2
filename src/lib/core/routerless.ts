import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { Angulartics2Settings } from './angulartics2-config';

export interface TrackNavigationEnd {
  url: string;
}

export class RouterlessTracking {
  trackLocation(
    settings: Angulartics2Settings,
  ): Observable<TrackNavigationEnd> {
    return new BehaviorSubject<TrackNavigationEnd>({ url: '/' });
  }
}
