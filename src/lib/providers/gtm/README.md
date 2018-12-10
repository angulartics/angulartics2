<img 
    src="../../../assets/svg/gtm.svg" 
    alt="Google Tag Manager logo"
    height="100px"
    width="200px" />

# Google Tag Manager (`gtag.js`)
__homepage__: [google.com/analytics/tag-manager](https://www.google.com/analytics/tag-manager/)  
__docs__: [developers.google.com/tag-manager/devguide](https://developers.google.com/tag-manager/devguide)  
__import__: `import { Angulartics2GoogleTagManager } from 'angulartics2/gtm';`  


## Initial Setup

Add the full tracking code from Google Tag Manager to the beginning of your body tag.

## Include it in your application

Bootstrapping the application with ```Angulartics2``` as provider and injecting both ```Angulartics2``` and ```Angulartics2GoogleTagManager``` (or any provider) into the root component will hook into the router and send every route change to your analytics provider.


```ts
// component
import { Angulartics2GoogleTagManager } from 'angulartics2/gtm';

@Component({ ... })
export class AppComponent {
  // import Angulartics2GoogleTagManager in root component
  constructor(angulartics2GoogleTagManager: Angulartics2GoogleTagManager) {
    angulartics2GoogleTagManager.startTracking();
  }
}
```

```ts
// bootstrap
import { Angulartics2Module } from 'angulartics2';

@NgModule({
  imports: [
    ...
    // import Angulartics2GoogleTagManager in root ngModule    
    Angulartics2Module.forRoot()
  ],
})
```

### Setting Up Tags

Now is the time to setup tracking for the tags in GTM.  [Here is a great post](http://blog.thecodecampus.de/angular-2-google-analytics-google-tag-manager/) on how to actually perform this setup.  In essence here is the TLDR:

1. Create a new tag
2. Add Universal Analytics + Tracking ID from GA
3. Create a new "Fire On" trigger (Custom Event) that tracks the `Page View` (for `pageTrack()`)

Make sure to debug it :D

### _For detailed instructions on how to send tracking events in a component or in a template check out the documentation for [Tracking Events](https://github.com/angulartics/angulartics2/wiki/Tracking-Events)._
