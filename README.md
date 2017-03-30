# angulartics2

[![NPM version][npm-image]][npm-url] [![NPM downloads][npm-downloads-image]][npm-downloads-url]
[![devDependency Status](https://david-dm.org/angulartics/angulartics2/dev-status.svg)](https://david-dm.org/angulartics/angulartics2#info=devDependencies)
[![Build Status](https://img.shields.io/travis/angulartics/angulartics2/master.svg?style=flat)](https://travis-ci.org/angulartics/angulartics2)

[![MIT license][license-image]][license-url]
[![Gitter Chat](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/angulartics/angulartics2)

Vendor-agnostic analytics for Angular2 applications. [angulartics.github.io](http://angulartics.github.io "Go to the website")

## Install

```shell
npm install angulartics2 --save
```

If you use SystemJS to load your files, you might have to update your config with this if you don't use `defaultJSExtensions: true`:
```js
System.config({
    packages: {
        "/angulartics2": {"defaultExtension": "js"}
    }
});
```

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

Bootstrapping the application with ```Angulartics2``` as provider and injecting ```Angulartics2GoogleAnalytics``` (or every provider you want to use) into the root component will hook into the router and send every route change to your analytics provider.

```ts
// component
import { Angulartics2GoogleAnalytics } from 'angulartics2';
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `<router-outlet></router-outlet>` // Or what your root template is.
})
export class AppComponent {
  constructor(angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {}
}

// bootstrap
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { Angulartics2Module, Angulartics2GoogleAnalytics } from 'angulartics2';

const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'about', component: AboutComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),

    Angulartics2Module.forRoot([ Angulartics2GoogleAnalytics ])
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
```


## Tracking events

To track events you can inject the directive ```angulartics2On``` into any component and use the attributes ```angulartics2On```, ```angularticsEvent``` and ```angularticsCategory```:


```ts
// component
import { Component } from '@angular/core';

@Component({
  selector: 'song-download-box',
  template: `<div angulartics2On="click" angularticsEvent="DownloadClick" angularticsCategory="{{ song.name }}">Click Me</div>`,
})
export class SongDownloadBox {}

import { NgModule } from '@angular/core';
import { Angulartics2Module } from 'angulartics2';

@NgModule({
  imports: [
    Angulartics2Module.forChild()
  ],
  declarations: [
    SongDownloadBox
  ]
})
```

If you need event label, you can use
```html
<div angulartics2On="click" angularticsEvent="DownloadClick" angularticsCategory="{{ song.name }}" [angularticsProperties]="{label: 'Fall Campaign'}">Click Me</div>
```


## Tracking events in the code
Import Angulartics2
```ts
import { Angulartics2 } from 'angulartics2';
```
and inject it
```ts
constructor(angulartics2: Angulartics2) {}
```

Then you can use
```ts
this.angulartics2.eventTrack.next({ action: 'myAction', properties: { category: 'myCategory' }});
```

If you need event label, you can use

```ts
this.angulartics2.eventTrack.next({ action: 'myAction', properties: { category: 'myCategory', label: 'myLabel' }});
```

## Supported providers

* [Google Analytics](https://github.com/angulartics/angulartics2/wiki/Google-Analytics)
* [Google Tag Manager](https://github.com/angulartics/angulartics2/wiki/Google-Tag-Manager)
* Kissmetrics
* Mixpanel
* Piwik
* Segment
* Baidu Analytics
* Facebook Pixel
* Application Insights

### For other providers

[Browse the website for detailed instructions.](http://angulartics.github.io)

If there's no Angulartics2 plugin for your analytics vendor of choice, please feel free to write yours and PR' it!

## What else?

See more docs and samples at [Wiki](https://github.com/angulartics/angulartics2/wiki).

## Contributing

Please see the [CONTRIBUTING](https://github.com/angulartics/angulartics2/blob/master/.github/CONTRIBUTING.md) and [CODE_OF_CONDUCT](https://github.com/angulartics/angulartics2/blob/master/.github/CODE_OF_CONDUCT.md) files for guidelines.

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/angulartics2.svg
[npm-url]: https://npmjs.org/package/angulartics2
[npm-downloads-image]: https://img.shields.io/npm/dm/angulartics2.svg
[npm-downloads-url]: https://npmjs.org/package/angulartics2
[bower-image]: https://img.shields.io/bower/v/angulartics2.svg
[bower-url]: http://bower.io/search/?q=angulartics2
[dep-status-image]: https://img.shields.io/david/angulartics/angulartics2.svg
[dep-status-url]: https://david-dm.org/angulartics/angulartics2
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg
[license-url]: LICENSE
[slack-image]: https://angulartics2.herokuapp.com/badge.svg
[slack-url]: https://angulartics2.herokuapp.com
