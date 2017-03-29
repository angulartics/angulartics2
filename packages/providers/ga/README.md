#Google Analytics

## Minimal setup for Google Analytics

Add the full tracking code from Google Tag Manager to the beginning of your body tag.

### Changes in the Google Analytics snippet

The snippet code provided by Google Analytics does an automatic pageview hit, but this is already done by Angulartics (unless you disable it) so make sure to delete the tracking line:

```html
      ...
      ga('create', 'UA-XXXXXXXX-X', 'none'); // 'none' while you are working on localhost
      ga('send', 'pageview');  // DELETE THIS LINE!
    </script>
```

## Include it in your application

Bootstrapping the application with ```Angulartics``` as provider and injecting both ```Angulartics``` and ```AngularticsGoogleAnalytics``` (or any provider) into the root component will hook into the router and send every route change to your analytics provider.

```ts
// component
import { AngularticsGoogleAnalytics } from '@angulartics/ga';
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `<router-outlet></router-outlet>` // Or what your root template is.
})
export class AppComponent {
  constructor(angularticsGoogleAnalytics: AngularticsGoogleAnalytics) {}
}

// bootstrap
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AngularticsModule, AngularticsGoogleAnalytics } from '@angulartics/core';

const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),

    AngularticsModule.forRoot([ AngularticsGoogleAnalytics ])
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
```

### _For detailed instructions on how to send tracking events in a component or in a template check out the documentation for [Tracking Events](https://github.com/angulartics/angulartics/wiki/Tracking-Events)._