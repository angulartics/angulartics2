<img 
    src="../../../assets/svg/facebook.svg" 
    alt="Facebook Pixel logo"
    height="100px"
    width="200px" />

# Facebook Pixel

__homepage__: [www.facebook.com/business/a/facebook-pixel](https://www.facebook.com/business/a/facebook-pixel)  
__docs__: [developers.facebook.com/docs/facebook-pixel](https://developers.facebook.com/docs/facebook-pixel)  
__import__: `import { Angulartics2Facebook } from 'angulartics2/facebook';`  

## Setup

1. Add tracking code [provided by Facebook](https://www.facebook.com/events_manager/)
```html
 <!-- Facebook Pixel Code -->
  <script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', 'XXXXXXXXXXXXXXX');
    fbq('track', 'PageView');
  </script>
  <noscript><img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=XXXXXXXXXXXXXXX&ev=PageView&noscript=1"
  /></noscript>
  <!-- End Facebook Pixel Code -->
```
2. Do **not** remove the pageview tracking (as you would to for Google Analytics)
3. [Setup Angulartics](https://github.com/angulartics/angulartics2/tree/next#installation) using `Angulartics2Facebook`
