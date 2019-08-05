<img 
    src="../../../assets/svg/splunk.svg" 
    alt="Splunk logo"
    height="100px"
    width="200px" />

# Splunk
__homepage__: [splunk.com](https://www.splunk.com/)  
__docs__: [Splunk Collector API](https://github.com/splunk/splunk-demo-collector-for-analyticsjs#api)
__import__: `import { Angulartics2Splunk } from 'angulartics2/splunk';`  

## Setup
1. Add tracking code [provided by Splunk](https://www.splunk.com/blog/2013/10/17/still-using-3rd-party-web-analytics-providers-build-your-own-using-splunk.html) to right above the `</head>` closing tag. 
  ```
  <script type="text/javascript"> var sp=sp||[];(function(){var e=["init","identify","track","trackLink","pageview"],t=function(e){return function(){sp.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var n=0;n<e.length;n++)sp[e[n]]=t(e[n])})(),sp.load=function(e,o){sp._endpoint=e;if(o){sp.init(o)};var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src=("https:"===document.location.protocol?"https://":"http://")+"d21ey8j28ejz92.cloudfront.net/analytics/v1/sp.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n)};
  sp.load("https://www.example.com"); // Replace with your own collector URL
  </script>
  ```
  In the last line of above script, make sure to replace https://www.example.com with the address of your data collector.
  
2. [Setup Angulartics](https://github.com/angulartics/angulartics2/tree/next#installation) using `Angulartics2Splunk`.
```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { Angulartics2Module } from 'angulartics2';

const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),

    // added to imports
    Angulartics2Module.forRoot(),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
```
3. __Required__: Import your providers in the root component. This starts the tracking of route changes.
```ts
// component
import { Angulartics2Splunk } from 'angulartics2/splunk';

@Component({  ...  })
export class AppComponent {
  constructor(angulartics2Splunk: Angulartics2Splunk) {
    angulartics2Splunk.startTracking();
  }
}
```
