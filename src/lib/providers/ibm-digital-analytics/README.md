<img 
    src="../../../assets/svg/ibm.svg" 
    alt="IBM logo"
    height="300px"
    width="400px" />

# IBM Digital Analytics
__homepage__: [https://digitalanalytics.ibmcloud.com](https://digitalanalytics.ibmcloud.com)  
__docs__: [https://www.ibm.com/support/knowledgecenter/SSPG9M/Analytics/kc_welcome_analytics.html](https://www.ibm.com/support/knowledgecenter/SSPG9M/Analytics/kc_welcome_analytics.html)  
__import__: `import { Angulartics2IBMDigitalAnalytics } from 'angulartics2/ibm-digital-analytics';`  

## Setup

Add the following IBM Digital Analytics code to your *index.html* file, before the closing body tag. Replace *XXXXXXXXX* with your Client ID and other *cmSetClientID* function parameters accordingly.

```html
<script type="text/javascript" src="//libs.coremetrics.com/eluminate.js"></script>
<script type="text/javascript">
    cmSetClientID("XXXXXXXXX", true, "data.coremetrics.com", "ibm.com");
</script>

```

## Usage

### Import
```ts
// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouterOutlet } from '@angular/router';

import { AppComponent } from './app.component';

import { Angulartics2Module } from 'angulartics2';
import { PageComponent } from './page/page.component';
import { HomeComponent } from './home/home.component';

const ROUTES: Routes = [
  { path: '', component: HomeComponent},
  { path: 'page', component: PageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    Angulartics2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Enable Auto Route Logging
```ts
// app.component.ts 
import { Component } from '@angular/core';
import { Angulartics2IBMDigitalAnalytics } from 'angulartics2/ibm-digital-analytics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Enable route logging
  constructor(angulartics2IBMDigitalAnalytics: Angulartics2IBMDigitalAnalytics) {
      angulartics2IBMDigitalAnalytics.startTracking();
  }
}
```

### Track Events in Template
```html
<div 
    angulartics2On="click" 
    angularticsAction="cmCreateProductviewTag" 
    [angularticsProperties]="{'productId': '123', 'productName': 'Apples', 'categoryId': '777'}"
>Click Me for cmCreateProductviewTag</div>

<div 
    angulartics2On="click" 
    angularticsAction="cmCreateShopAction5Tag" 
    [angularticsProperties]="{'productId': '124', 'productName': 'Pears', 'quantity': '5', 'unitPrice': '1.99', 'categoryId': '778'}"
>Click Me for cmCreateShopAction5Tag</div>

<div 
    angulartics2On="click" 
    angularticsAction="cmCreateShopAction9Tag" 
    [angularticsProperties]="{'productId': '125', 'productName': 'Apricots', 'quantity': '6', 'unitPrice': '2.99', 'registrationId': '123456', 'orderId': '456', 'orderSubtotal': '29.90', 'categoryId': '779'}"
>Click Me for cmCreateShopAction9Tag</div>

<div 
    angulartics2On="click" 
    angularticsAction="cmCreateOrderTag" 
    [angularticsProperties]="{'orderId': '456', 'orderSubtotal': '29.90', 'orderShipping': '0', 'registrationId': '123456', 'registrantCity': 'Atlanta', 'registrantState': 'GA', 'registrantPostalCode': '30300'}"
>Click Me for cmCreateOrderTag</div>

<div 
    angulartics2On="click" 
    angularticsAction="cmCreateRegistrationTag" 
    [angularticsProperties]="{'registrationId': '123456', 'registrantEmail': 'john@example.com', 'registrantCity': 'Atlanta', 'registrantState': 'GA', 'registrantPostalCode': '30300', 'registrantCountry': 'US', 'attrbute': '3-_-SMOKING-_-DOUBLE'}"
>Click Me for cmCreateRegistrationTag</div>

<div 
    angulartics2On="click" 
    angularticsAction="cmCreateElementTag" 
    [angularticsProperties]="{'elementId': 'element123456', 'elementCategory': 'some elements'}"
>Click Me for cmCreateElementTag</div>

<div 
    angulartics2On="click" 
    angularticsAction="cmCreateConversionEventTag" 
    [angularticsProperties]="{'eventId': 'Request More Information', 'actionType': '2', 'eventCategoryId': 'Forms', 'points': '10'}"
>Click Me for cmCreateConversionEventTag</div>
```
