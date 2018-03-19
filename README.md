# angulartics2

[![NPM version](https://img.shields.io/npm/v/angulartics2.svg)](https://npmjs.org/package/angulartics2) [![NPM downloads](https://img.shields.io/npm/dm/angulartics2.svg)](https://npmjs.org/package/angulartics2)
[![devDependency Status](https://david-dm.org/angulartics/angulartics2/dev-status.svg)](https://david-dm.org/angulartics/angulartics2#info=devDependencies)
[![Build Status](https://api.travis-ci.org/angulartics/angulartics2.svg?branch=master)](https://travis-ci.org/angulartics/angulartics2)

[![MIT license](http://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Gitter Chat](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/angulartics/angulartics2)

Vendor-agnostic Analytics for Angular Applications. [angulartics.github.io/angulartics2](https://angulartics.github.io/angulartics2 "Angulartics Docs")

- [angulartics2](#angulartics2)
  - [Installation](#installation)
    - [Include it in your application](#include-it-in-your-application)
  - [Usage](#usage)
    - [Tracking events in templates/HTML](#tracking-events-in-templates-html)
    - [Tracking events in the code](#tracking-events-in-the-code)
    - [Configuring the Module](#configuring-the-module)
      - [Exclude routes from automatic pageview tracking](#exclude-routes-from-automatic-pageview-tracking)
      - [Remove IDs from url paths](#remove-ids-from-url-paths)
      - [Remove Query Params from url paths](#remove-query-params-from-url-paths)
      - [Remove Hash from url paths](#remove-hash-from-url-paths)
    - [Using Without A Router](#using-without-a-router)
    - [Using With UI-Router](#using-with-ui-router)
    - [SystemJS](#systemjs)
  - [Supported providers](#supported-providers)
    - [For other providers](#for-other-providers)
    - [Minimal setup for Google Analytics](#minimal-setup-for-google-analytics)
  - [v4 Migration and Breaking Changes](#v4-migration-and-breaking-changes)
  - [Contributing](#contributing)
  - [License](#license)

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
> Note the different imports when [Using Without A Router](#using-without-a-router) or [Using With UI-Router](#using-with-ui-router).

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

### Tracking events in templates/HTML

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

If you need event label, you can use
```ts
this.angulartics2.eventTrack.next({ 
  action: 'myAction',
  properties: { 
    category: 'myCategory', 
    label: 'myLabel',
  },
});
```

### Configuring the Module

#### Exclude routes from automatic pageview tracking

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

#### Remove IDs from url paths

`/project/12981/feature` becomes `/project/feature`
````ts
Angulartics2Module.forRoot([providers], {
  pageTracking: {
    clearIds: true,
  }
}),
````
By default, it removes IDs matching this pattern (ie. either all numeric or UUID) : `^\d+$|^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$`.

You can set your own regexp if you need to : 

 `/project/a01/feature` becomes `/project/feature`
 ````ts
 Angulartics2Module.forRoot([providers], {
   pageTracking: {
     clearIds: true,
     idsRegExp: new RegExp('^[a-z]\\d+$') /* Workaround: No NgModule metadata found for 'AppModule' */
   }
 }),
 ````

#### Remove Query Params from url paths

This can be combined with clearIds and idsRegExp

`/project/12981/feature?param=12` becomes `/project/12981/feature`
````ts
Angulartics2Module.forRoot([providers], {
  pageTracking: {
    clearQueryParams: true,
  }
}),
````

#### Remove Hash from url paths

`/callback#authcode=123&idToken=456` becomes `/callback`
````ts
Angulartics2Module.forRoot([providers], {
  pageTracking: {
    clearHash: true,
  }
}),
````

### Using Without A Router

__Warning:__ this support is still experiemental  
`@angular/router` must still be installed! However, it will not be used.
````ts
import { Angulartics2RouterlessModule } from 'angulartics2/routerlessmodule';
@NgModule({
  // ...
  imports: [
    BrowserModule,
    Angulartics2RouterlessModule.forRoot([Angulartics2GoogleAnalytics]),
  ],
})
````

### Using With UI-Router

__Warning:__ this support is still experiemental  
`@angular/router` must still be installed! However, it will not be used.  
````ts
import { Angulartics2UirouterModule } from 'angulartics2/uiroutermodule';
@NgModule({
  // ...
  imports: [
    BrowserModule,
    Angulartics2UirouterModule.forRoot([Angulartics2GoogleAnalytics]),
  ],
})
````

### SystemJS

Using SystemJS? If you aren't using `defaultJSExtensions: true` you may need to use:
```ts
System.config({
    packages: {
        "/angulartics2": {"defaultExtension": "js"},
    },
});
```

## Supported providers

* [Google Analytics](/src/lib/providers/ga) (`analytics.js`)
* [Google Tag Manager](/src/lib/providers/gtm) (`gtag.js`)
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

If there's no Angulartics2 plugin for your analytics vendor of choice, please feel free to write yours and PR it!

### Minimal setup for Google Analytics

- See [Google Analytics](/src/lib/providers/ga) if your code snippet contains `analytics.js`
- See [Google Tag Manager](/src/lib/providers/gtm) if your code snippet contains `gtag.js`

## v4 Migration and Breaking Changes

See [Release Notes](https://github.com/angulartics/angulartics2/releases/tag/v4.0.0)

## Contributing

Please see the [CONTRIBUTING](https://github.com/angulartics/angulartics2/blob/master/.github/CONTRIBUTING.md) and [CODE_OF_CONDUCT](https://github.com/angulartics/angulartics2/blob/master/.github/CODE_OF_CONDUCT.md) files for guidelines.

## License

[MIT](LICENSE)
