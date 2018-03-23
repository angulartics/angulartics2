<img 
    src="../../../assets/svg/mixpanel.svg" 
    alt="Mixpanel logo"
    height="100px"
    width="200px" />

# Mixpanel
__homepage__: [mixpanel.com](https://mixpanel.com/)  
__docs__: [mixpanel.com/help/reference/javascript](https://mixpanel.com/help/reference/javascript)  
__import__: `import { Angulartics2Mixpanel } from 'angulartics2/mixpanel';`  

## Setup
1. Add tracking code [provided by Mixpanel](https://mixpanel.com/help/reference/javascript) to right above the header closing tag ``</header>``
2. [Setup Angulartics](https://github.com/angulartics/angulartics2/tree/next#installation) using `Angulartics2Mixpanel`

## Integrating with NgRx:
### Adding an event with an effect:

* Right:
```angular2html
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Angulartics2Mixpanel } from 'angulartics2/mixpanel';

import * as mixpanel from '../actions/mixpanel';

@Injectable()
export class MixpanelEffects {
  @Effect({ dispatch: false })
  mixpanelActionTracking$ = this.actions$
    .ofType(mixpanel.MIXPANEL_TRACK)
    .do((action: mixpanel.MixpanelTrack) => {
      // ATTENTION HERE
      this.angulartics2Mixpanel.eventTrack(action.payload.action, {
        ...action.payload.properties,
      });
    });

  constructor(private actions$: Actions,
              private angulartics2Mixpanel: Angulartics2Mixpanel) {
  }
}

/**
 * Action definition
 */
export const MIXPANEL_TRACK = '[MIXPANEL] Track';

export class MixpanelTrack implements Action {
  readonly type = MIXPANEL_TRACK;

  constructor(public payload: MixPanelPayload) {}
}

export interface MixPanelPayload {
  action: string;
  properties?: MixPanelPayloadProperties;
}
```

* Right:

```angular2html
@Injectable()
export class MixpanelEffects {
  ...
    .do((action: mixpanel.MixpanelTrack) => {
      this.angulartics2Mixpanel.eventTrack(action.payload.action, action.payload.properties);
    });
  ...
}
```
**The custom properties object should be a new object, otherwise the action will be be recorded successfully.**
