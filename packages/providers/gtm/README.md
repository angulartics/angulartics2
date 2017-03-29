# Google Tag Manager

## Initial Setup

Add the full tracking code from Google Tag Manager to the beginning of your body tag.

## Include it in your application

Bootstrapping the application with ```Angulartics``` as provider and injecting both ```Angulartics``` and ```AngularticsGoogleTagManager``` (or any provider) into the root component will hook into the router and send every route change to your analytics provider.

```ts
// component
import { AngularticsGoogleTagManager } from '@angulartics/gtm';
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  constructor(angularticsGoogleTagManager: AngularticsGoogleTagManager) {}
}

// bootstrap
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AngularticsModule, AngularticsGoogleTagManager } from '@angulartics/core';

const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),

    AngularticsModule.forRoot([ AngularticsGoogleTagManager ])
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
```

### Setting Up Tags

Now is the time to setup tracking for the tags in GTM.  [Here is a great post](http://blog.thecodecampus.de/angular-2-google-analytics-google-tag-manager/) on how to actually perform this setup.  In essence here is the TLDR:

1. Create a new tag
2. Add Universal Analytics + Tracking ID from GA
3. Create a new "Fire On" trigger (Custom Event) that tracks the `Page View` (for `pageTrack()`)

Make sure to debug it :D

### _For detailed instructions on how to send tracking events in a component or in a template check out the documentation for [Tracking Events](https://github.com/angulartics/angulartics/wiki/Tracking-Events)._