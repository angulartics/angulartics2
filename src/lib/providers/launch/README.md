<img 
    src="https://developer.adobelaunch.com/images/launch.svg" 
    alt="Launch, by Adobe logo"
    height="100px"
    width="100px" />

# Launch, by Adobe
__homepage__: [Launch, by Adobe](https://www.adobe.com/experience-platform/launch.html)  
__docs__: [developer.adobelaunch.com/](https://developer.adobelaunch.com/)  
__import__: `import { Angulartics2LaunchByAdobe } from 'angulartics2/launch';`  


## Initial Setup

Add your Launch embed code to the end of your head tag, as usual.

You can either add just the embed code with "async", or non-async embed code in the head plus the <code>_satellite.pageBottom()</code> snippet at the end of the body.

## Include it in your application

Bootstrapping the application with ```Angulartics2``` as provider and injecting both ```Angulartics2``` and ```Angulartics2LaunchByAdobe``` (or any provider) into the root component will hook into the router and send every route change to Launch, where it can be used for Analytics tracking or a lot of other things.


```ts
// component
import { Angulartics2LaunchByAdobe } from 'angulartics2/launch';

@Component({ ... })
export class AppComponent {
  // import Angulartics2LaunchByAdobe in root component
  constructor(angulartics2LaunchByAdobe: Angulartics2LaunchByAdobe) {
    angulartics2LaunchByAdobe.startTracking();
  }
}
```

```ts
// bootstrap
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2LaunchByAdobe } from 'angulartics2/launch';

@NgModule({
  imports: [
    ...
    // import Angulartics2LaunchByAdobe in root ngModule    
    Angulartics2Module.forRoot([ Angulartics2LaunchByAdobe ])
  ],
})
```

## Configuration

The Provider translates Angulartics' ```pageTrack()``` and ```eventTrack()``` methods into ```_satellite.track()``` calls for Launch. Those calls trigger "Direct-call" events within Launch.

You can configure the ID of the events that should be called.

The default IDs can be seen in ```launch.ts```:
```ts
// define DCR IDs for the available call types
dcrIDs = {};
dcrIDs['pageTrack'] = 'pageTrack';
dcrIDs['eventTrack'] = 'eventTrack';
```
With the default configuration as shown, a ```pageTrack()``` method call in Angulartics2 will result in a call to Launch that looks like this: ```_satellite.track('pageTrack', payload)```, triggering a 'pageTrack' Direct-call type Event if there is one configured. This Event, in turn, can trigger one or more Rules.


## Setting Up Tags

Once set up, Angulartics [usage](https://github.com/angulartics/angulartics2#usage) is the same regardless of provider

Now is the time to setup tracking in Launch.  [Here is a post](http://webanalyticsfordevelopers.com/2018/11/06/basic-tracking-remix-contains-launch/) explaining how a basic tracking setup can be done.

_For detailed instructions on how to send tracking events in a component or in a template check out the documentation for [Tracking Events](https://github.com/angulartics/angulartics2/wiki/Tracking-Events)._
