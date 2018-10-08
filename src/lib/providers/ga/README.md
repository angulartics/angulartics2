<img 
    src="../../../assets/svg/ga.svg" 
    alt="google analytics logo"
    height="100px"
    width="200px" />

# Google Analytics (`analytics.js`)

__homepage__: [google.com/analytics](https://www.google.com/analytics)  
__docs__: [developers.google.com/analytics/devguides/collection/analyticsjs/](https://developers.google.com/analytics/devguides/collection/analyticsjs/)  
__import__: `import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';`  

## Setup

1. Add [`analytics.js` tracking code provided by Google](https://developers.google.com/analytics/devguides/collection/analyticsjs/) to the beginning of your body tag.
> Note: If Google Analytics suggest you use `gtag.js` tracking code, either switch to `analytics.js`, or have a look at the instructions for [Google Tag Manager](/src/lib/providers/gtm).
2. Remove `ga('send', 'pageview');` to prevent duplicate pageview (as this is also done by angulartics):
```html
<script>
  ...
  ga('create', 'UA-XXXXXXXX-X', 'none'); // 'none' while you are working on localhost
  ga('send', 'pageview');  // DELETE THIS LINE!
</script>
```
3. [Setup Angulartics](https://github.com/angulartics/angulartics2/tree/master#installation) using `Angulartics2GoogleAnalytics`
