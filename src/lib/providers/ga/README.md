<img 
    src="../../../assets/svg/ga.svg" 
    alt="google analytics logo"
    height="100px"
    width="200px" />

# Google Analytics
__homepage__: [google.com/analytics](https://www.google.com/analytics)  
__docs__: [developers.google.com/analytics/devguides/collection/analyticsjs/](https://developers.google.com/analytics/devguides/collection/analyticsjs/)  
__import__: `import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';`  

## Setup
1. To setup Google Analytics add the folowing to main.ts

```ts
import {Angulartics2GoogleAnalytics} from "angulartics2/ga";


if (environment.production) {
  // ...
  Angulartics2GoogleAnalytics.prototype.createGaSession(environment.googleAnalytics);
}
```

2. you can add other environments if you want. In your environment.prod.ts add the configuration

```ts
export const environment = {
  production: true,
  // ...
  googleAnalytics: {
    domain: 'auto',
    trackingId: 'UA-XXXXXXXX-X' // replace with your Tracking Id
  }
};
```

for localhost environments replace 'auto' with 'none'

3. [Setup Angulartics](https://github.com/angulartics/angulartics2/tree/next#installation) using `Angulartics2GoogleAnalytics`
