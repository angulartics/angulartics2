<img 
    src="../../../assets/svg/gtm.svg" 
    alt="Google Global Site Tag logo"
    height="100px"
    width="200px" />

# Google Global Site Tag (`gtag.js`)
__homepage__: [google.com/analytics/tag-manager](https://www.google.com/analytics/tag-manager/)  
docs: [developers.google.com/analytics/devguides/collection/gtagjs](developers.google.com/analytics/devguides/collection/gtagjs)
__import__: `import { Angulartics2GoogleGlobalSiteTag } from 'angulartics2/gst';`  


## Initial Setup

Add the full tracking code from [developers.google.com/analytics/devguides/collection/gtagjs/](developers.google.com/analytics/devguides/collection/gtagjs/)

## Include it in your application

Bootstrapping the application with ```Angulartics2``` as provider and injecting both ```Angulartics2``` and ```Angulartics2GoogleGlobalSiteTag``` (or any provider) into the root component will hook into the router and send every route change to your analytics provider.


```ts
// component
import { Angulartics2GoogleGlobalSiteTag } from 'angulartics2/gst';

@Component({ ... })
export class AppComponent {
  // import Angulartics2GoogleGlobalSiteTag in root component
  constructor(angulartics2GoogleGlobalSiteTag: Angulartics2GoogleGlobalSiteTag) {}
}
```

```ts
// bootstrap
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleGlobalSiteTag } from 'angulartics2/gst';

@NgModule({
  imports: [
    ...
    // import Angulartics2GoogleGlobalSiteTag in root ngModule    
    Angulartics2Module.forRoot([ Angulartics2GoogleGlobalSiteTag ])
  ],
})
```

### _For detailed instructions on how to send tracking events in a component or in a template check out the documentation for [Tracking Events](https://github.com/angulartics/angulartics2/wiki/Tracking-Events)._
