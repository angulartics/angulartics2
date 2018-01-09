import { ModuleWithProviders, NgModule, Provider } from '@angular/core';

import {
  Angulartics2,
  Angulartics2On,
  Angulartics2Settings,
  ANGULARTICS2_TOKEN,
} from 'angulartics2';

@NgModule({
  declarations: [Angulartics2On],
  exports: [Angulartics2On],
})
export class Angulartics2RouterlessModule {
  static forRoot(
    providers: Provider[],
    settings: Partial<Angulartics2Settings> = {},
  ): ModuleWithProviders {
    return {
      ngModule: Angulartics2RouterlessModule,
      providers: [
        { provide: ANGULARTICS2_TOKEN, useValue: { providers, settings } },
        Angulartics2,
        ...providers,
      ],
    };
  }
}
