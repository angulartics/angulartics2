<img 
    src="../../../assets/svg/gtm.svg" 
    alt="Google Global Site Tag logo"
    height="100px"
    width="200px" />

# Google Global Site Tag (`gtag.js`)

* __homepage__: [google.com/analytics](https://marketingplatform.google.com/about/analytics/)
* __docs__: [developers.google.com/analytics/devguides/collection/gtagjs](https://developers.google.com/analytics/devguides/collection/gtagjs/)
* __import__: `import { Angulartics2GoogleGlobalSiteTag } from 'angulartics2/gst';`

## Initial Setup

Add the full tracking code from [developers.google.com/analytics/devguides/collection/gtagjs/](https://developers.google.com/analytics/devguides/collection/gtagjs/)

## Include it in your application

Bootstrapping the application with ```Angulartics2```:

```ts
// bootstrap
import { Angulartics2Module } from 'angulartics2';

@NgModule({
  imports: [
    ...
    // import Angulartics2GoogleGlobalSiteTag in root ngModule
    Angulartics2Module.forRoot()
  ],
})
export class AppModule { }
```

Then injecting `Angulartics2GoogleGlobalSiteTag` (or any provider) into the root
component and calling `startTracking` will hook into the router and send every route
change to your analytics provider.

```ts
// component
import { Angulartics2GoogleGlobalSiteTag } from 'angulartics2/gst';

@Component({ ... })
export class AppComponent {
  // import Angulartics2GoogleGlobalSiteTag in root component
  constructor(angulartics: Angulartics2GoogleGlobalSiteTag) {
    angulartics.startTracking();
  }
}
```

## Send tracking events in a component or template

_Check out the documentation for [Tracking Events](https://github.com/angulartics/angulartics2/wiki/Tracking-Events)._

## Extended Event properties.

All extended properties that can be added to events, for e-commerce (`items`, `shipping`, `tax`...), adwords (`send_to`, `account_type`, `transaction_id`) and another can be passed through the gstCustom:

```ts
constructor(private angulartics2: Angulartics2) {
  angulartics2.eventTrack.next({
    action: 'conversion',
    properties: {
      gstCustom: {
        send_to: 'AW-XXXXXX/R-12345678',
        transaction_id: ''
      }
    }
  });
}
```

## Custom dimension and tracker settings

`custom_map` and other config settings you could set inside your HTML page will be overridden after each pagetrack. Therefore, you need to pass them to the GST configuration if you want to use them. At this point, you're probably better to remove completely the `gtag('config'` call from you HTML page and to add all required properties at module definition.

```ts
// bootstrap
import { Angulartics2Module } from 'angulartics2';

@NgModule({
  imports: [
    ...
    // import Angulartics2GoogleGlobalSiteTag in root ngModule
    Angulartics2Module.forRoot(
      gst: {
        trackingIds: ['UA-11111111-1'],
        customMap: {
          dimension1: 'version',
          dimension2: 'page_language',
          dimension3: 'custom_dimension_name'
        },
        anonymizeIp: true
      },
    )
  ],
})
export class AppModule { }
```

Then, you can use the normal angulartic approach:

```ts
this.angulartics2.setUserProperties.next({
  custom_dimension_name: 'example'
});
```

You can also pass custom dimension with a specific event using the `gstCustom` property described in previous section
