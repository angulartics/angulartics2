import {
  ModuleWithProviders,
  NgModule,
  Provider,
} from '@angular/core';

import { Angulartics2 } from '../angulartics2';
import { Angulartics2Settings } from '../angulartics2-config';
import { ANGULARTICS2_TOKEN } from '../angulartics2-token';
import { Angulartics2On } from '../angulartics2On';


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
