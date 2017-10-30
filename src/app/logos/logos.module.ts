import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoogleAnalyticsComponent } from './google-analytics.component';
import { KissmetricsComponent } from './kissmetrics.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    GoogleAnalyticsComponent,
    KissmetricsComponent,
  ],
  exports: [
    GoogleAnalyticsComponent,
  ],
})
export class LogosModule { }
