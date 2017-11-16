# angulartics2

[![NPM version](https://img.shields.io/npm/v/angulartics2.svg)](https://npmjs.org/package/angulartics2) [![NPM downloads](https://img.shields.io/npm/dm/angulartics2.svg)](https://npmjs.org/package/angulartics2)
[![devDependency Status](https://david-dm.org/angulartics/angulartics2/dev-status.svg)](https://david-dm.org/angulartics/angulartics2#info=devDependencies)
[![Build Status](https://api.travis-ci.org/angulartics/angulartics2.svg?branch=master)](https://travis-ci.org/angulartics/angulartics2)

[![MIT license](http://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Gitter Chat](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/angulartics/angulartics2)

Vendor-agnostic Analytics for Angular Applications. [angulartics.github.io/angulartics2](https://angulartics.github.io/angulartics2 "Angulartics Docs")

* [Installation](#installation)
* [Usage](#usage)
  + [Include it in your application](#include-it-in-your-application)
  + [Tracking events](#tracking-events)
  + [Tracking events in the code](#tracking-events-in-the-code)
  + [Excluding routes from automatic pageview tracking](#excluding-routes-from-automatic-pageview-tracking)
* [Supported providers](#supported-providers)
  + [For other providers](#for-other-providers)
  + [Minimal setup for Google Analytics](#minimal-setup-for-google-analytics)
    - [Changes in the Google Analytics snippet](#changes-in-the-google-analytics-snippet)
* [SystemJS](#systemjs)
* [Contributing](#contributing)
* [License](#license)


## v4.0.0 Migration and Breaking Changes
See [Release Notes](https://github.com/angulartics/angulartics2/releases/tag/v4.0.0)


## Installation

```sh
npm install angulartics2 --save
```

### Include it in your application
1. Add `Angulartics2Module` to your root NgModule passing an array of providers to enable
```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),

    // added to imports
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
```
2. __Required__: Import your providers in the root component. This starts the tracking of route changes.
```ts
// component
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

@Component({  ...  })
export class AppComponent {
  constructor(angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {}
}
```

## Usage
### Tracking events

To track events you can inject the directive ```angulartics2On``` into any component and use the attributes ```angulartics2On```, ```angularticsAction``` and ```angularticsCategory```:


```ts
// component
import { Component } from '@angular/core';

@Component({
  selector: 'song-download-box',
  template: `
    <div 
      angulartics2On="click" 
      angularticsAction="DownloadClick" 
      [angularticsCategory]="song.name">
      Click Me
    </div>`,
})
export class SongDownloadBox {}

import { NgModule } from '@angular/core';
import { Angulartics2Module } from 'angulartics2';

@NgModule({
  imports: [
    Angulartics2Module,
  ],
  declarations: [
    SongDownloadBox,
  ]
})
```

If you need event label, you can use
```html
<div 
  angulartics2On="click" 
  angularticsAction="DownloadClick" 
  angularticsLabel="label-name" 
  angularticsValue="value" 
  [angularticsCategory]="song.name" 
  [angularticsProperties]="{'custom-property': 'Fall Campaign'}">
  Click Me
</div>
```


### Tracking events in the code
```ts
import { Angulartics2 } from 'angulartics2';
constructor(private angulartics2: Angulartics2) {
  this.angulartics2.eventTrack.next({ 
    action: 'myAction', 
    properties: { category: 'myCategory' },
  });
}
```

If you need event label
```ts
this.angulartics2.eventTrack.next({ 
  action: 'myAction',
  properties: { 
    category: 'myCategory', 
    label: 'myLabel',
  },
});
```

### Exclude routes from automatic pageview tracking

Pass string literals or regular expressions to exclude routes from automatic pageview tracking.
````ts
Angulartics2Module.forRoot([providers], {
  pageTracking: {
    excludedRoutes: [
      /\/[0-9]{4}\/[0-9]{2}\/[a-zA-Z0-9|\-]*/,
      '2017/03/article-title'
    ],
  }
}),
````

### Remove ID's from url paths
`/project/12981/feature` becomes `/project/feature`
````ts
Angulartics2Module.forRoot([providers], {
  pageTracking: {
    clearIds: true,
  }
}),
````

## Supported providers

* [Google Analytics](/src/lib/providers/ga)
* [Google Tag Manager](/src/lib/providers/gtm)
* [Google Enhanced Ecom](/src/lib/providers/ga-enhanced-ecom)
* [Kissmetrics](/src/lib/providers/kissmetrics)
* [Mixpanel](/src/lib/providers/mixpanel)
* [Piwik](/src/lib/providers/piwik)
* [Segment](/src/lib/providers/segment)
* [Baidu Analytics](/src/lib/providers/baidu)
* [Facebook Pixel](/src/lib/providers/facebook)
* [Application Insights](/src/lib/providers/appinsights)
* [Hubspot](/src/lib/providers/hubspot)
* [Adobe Analytics (Omniture)](/src/lib/providers/adobeanalytics)
* [Intercom](/src/lib/providers/intercom)
* [Woopra](/src/lib/providers/woopra)
* [Clicky](/src/lib/providers/clicky)

### For other providers

If there's no Angulartics2 plugin for your analytics vendor of choice, please feel free to write yours and PR' it!

### Minimal setup for Google Analytics

Add the full Google [analytics.js](https://developers.google.com/analytics/devguides/collection/analyticsjs/) tracking code to the beginning of your body tag.

#### Changes in the Google Analytics snippet

The snippet code provided by Google Analytics does an automatic pageview hit, but this is already done by Angulartics (unless you disable it) so make sure to delete the tracking line:

```html
      ...
      ga('create', 'UA-XXXXXXXX-X', 'none'); // 'none' while you are working on localhost
      ga('send', 'pageview');  // DELETE THIS LINE!
    </script>
```

## SystemJS
Using SystemJS? If you aren't using `defaultJSExtensions: true` you may need to use:
```ts
System.config({
    packages: {
        "/angulartics2": {"defaultExtension": "js"},
    },
});
```

## Contributing

Please see the [CONTRIBUTING](https://github.com/angulartics/angulartics2/blob/master/.github/CONTRIBUTING.md) and [CODE_OF_CONDUCT](https://github.com/angulartics/angulartics2/blob/master/.github/CODE_OF_CONDUCT.md) files for guidelines.

## License

[MIT](LICENSE)
