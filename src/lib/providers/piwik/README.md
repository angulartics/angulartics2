<img 
    src="../../../assets/svg/piwik.svg" 
    alt="Piwik logo"
    height="100px"
    width="200px" />

# Piwik
__homepage__: [piwik.org](https://piwik.org)  
__docs__: [developer.piwik.org](https://developer.piwik.org)  
__import__: `import { Angulartics2Piwik } from 'angulartics2/piwik';`  

## Setup
Add the sandard piwik track code inside your index.html head tag:
```html
<!-- Piwik -->
<script type="text/javascript">
  var _paq = _paq || [];
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  // _paq.push(['trackPageView']); // DELETE THIS LINE
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="//piwik.YOUR-DOMAIN.com/";
    _paq.push(['setTrackerUrl', u+'piwik.php']);
    _paq.push(['setSiteId', '11']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
  })();
</script>
<!-- End Piwik Code -->
```
Make sure "trackPageView" line is commented or deleted. It is not needed as page tracking will be trigger by the angular module on route change.

Replace YOUR-DOMAIN with your piwik domain (`//DOMAIN.innocraft.cloud` if you are using the innocraft cloud service).

Pass the Piwik provider to angulartics in app.module:
```ts
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2Piwik } from 'angulartics2/piwik';
@NgModule({
  imports: [
    Angulartics2Module.forRoot([Angulartics2Piwik]),
    ...
```

Inject angulartics into your root component (usually appComponent)
```ts
import { Angulartics2Piwik } from 'angulartics2/piwik';
export class AppComponent {
  // inject Angulartics2Piwik in root component to initialize it
  constructor(private angulartics2Piwik: Angulartics2Piwik){ }
}
```

To track full URLs if there is a hash (#), make sure to enable `settings=>websites=>settings=>page url fragments tracking` in the Piwik dashboard.

Once set up, Angulartics [usage](https://github.com/angulartics/angulartics2#usage) is the same regardless of provider
