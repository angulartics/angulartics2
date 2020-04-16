import { ModuleWithProviders, NgModule } from '@angular/core';

import {
  Angulartics2,
  Angulartics2OnModule,
  Angulartics2Settings,
  ANGULARTICS2_TOKEN,
  RouterlessTracking,
} from 'angulartics2';

@NgModule({
  imports: [Angulartics2OnModule],
})
export class Angulartics2RouterlessModule {
  static forRoot(
    settings: Partial<Angulartics2Settings> = {},
  ): ModuleWithProviders<Angulartics2RouterlessModule> {
    return {
      ngModule: Angulartics2RouterlessModule,
      providers: [
        { provide: ANGULARTICS2_TOKEN, useValue: { settings } },
        RouterlessTracking,
        Angulartics2,
      ],
    };
  }
}
