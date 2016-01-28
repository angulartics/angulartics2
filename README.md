# angulartics2

[![Join the chat at https://gitter.im/angulartics/angulartics2](https://badges.gitter.im/angulartics/angulartics2.svg)](https://gitter.im/angulartics/angulartics2?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![NPM version][npm-image]][npm-url] [![NPM downloads][npm-downloads-image]][npm-downloads-url]
[![devDependency Status](https://david-dm.org/angulartics/angulartics2/dev-status.svg)](https://david-dm.org/angulartics/angulartics2#info=devDependencies)
[![Build Status](https://img.shields.io/travis/angulartics/angulartics2/master.svg?style=flat)](https://travis-ci.org/angulartics/angulartics2)

[![MIT license][license-image]][license-url]
[![Gitter Chat](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/angulartics)

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

## Minimal setup

### for Google Analytics

Add the full tracking code from Google Tag Manager to the beginning of your body tag.

## Changes in the Google Analytics snippet

The snippet code provided by Google Analytics does an automatic pageview hit, but this is already done by Angulartics (unless you disable it) so make sure to delete the tracking line:

```js
      ...
      ga('create', 'UA-XXXXXXXX-X', 'none'); // 'none' while you are working on localhost
      ga('send', 'pageview');  // DELETE THIS LINE!
    </script>
```

## Include it in your application

```js
import {Angulartics2, Angulartics2On} from 'angulartics2';
import {Angulartics2GoogleAnalytics} from 'angulartics2/providers/angulartics2-google-analytics';

bootstrap(AppComponent, [
    Angulartics2
]);


import {Component, View, Injectable} from 'angular2/angular2';

@Injectable()
@Component({
    selector: 'app',
    providers: [Angulartics2GoogleAnalytics]
})
@View({
    template: `<div [angulartics2On]="'click'" [angularticsEvent]="'InitiateSearch'" [angularticsCategory]="'Search'"></div>`,
    directives: [Angulartics2On]
})
export class AppComponent {
    constructor(angulartics2: Angulartics2, angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {
    }
}
```

### for other providers

[Browse the website for detailed instructions.](http://angulartics.github.io)

## Supported providers

* Google Analytics
* Kissmetrics
* Mixpanel
* Segment

If there's no Angulartics2 plugin for your analytics vendor of choice, please feel free to write yours and PR' it!

## What else?

See more docs and samples at [http://angulartics.github.io](http://angulartics.github.io "http://angulartics.github.io").

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
