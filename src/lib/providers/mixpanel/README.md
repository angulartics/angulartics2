<img
    src="../../../assets/svg/mixpanel.svg"
    alt="Mixpanel logo"
    height="100px"
    width="200px" />

# Mixpanel

**homepage**: [mixpanel.com](https://mixpanel.com/)  
**docs**: [mixpanel.com/help/reference/javascript](https://mixpanel.com/help/reference/javascript)  
**import**: `import { Angulartics2Mixpanel } from 'angulartics2/mixpanel';`

## Setup

1.  Add tracking code [provided by Mixpanel](https://mixpanel.com/help/reference/javascript) to right above the header closing tag `</header>`
2.  [Setup Angulartics](https://github.com/angulartics/angulartics2/tree/next#installation) using `Angulartics2Mixpanel`

## Integrating with NgRx:

You have a chance to unburden the integration process if your system is using NgRx. Specifically, we can reuse the existing actions in our application and use effects to catch and dispatch a mixpanel action accordingly.

### Boilerplating:

```ts
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

export interface MixPanelPayloadProperties {
  // Your custom properties go here
}
```

### Catch and dispatch a mixpanel event by an effect:

```ts
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

  constructor(
    private actions$: Actions,
    private angulartics2Mixpanel: Angulartics2Mixpanel,
  ) {}
}
```

### Usage:

Somewhere in our application, we might have the code to dispatch a mixpanel action:

```ts
  @Effect()
  someEffect$ = this.actions$
    .ofType(some.ACTION)
    .map(action => new mixpanel.MixpanelTrack({
      action: action.type,
      properties: {
        category: 'Your Category',
        labelOrWhatever: 'LabelHere',
      }
    }));
```

### Common error:

The custom properties object should be a **new object**, otherwise the action will not be recorded successfully. For example the code below will be ignored by the server.

```ts
@Injectable()
export class MixpanelEffects {
  ...
    .do((action: mixpanel.MixpanelTrack) => {
      // reuse the existing properties is WRONG
      this.angulartics2Mixpanel.eventTrack(action.payload.action, action.payload.properties);
    });
  ...
}
```
