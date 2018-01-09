import {
  ModuleWithProviders,
  NgModule,
  Provider,
} from '@angular/core';

import {
  Angulartics2,
  Angulartics2On,
  Angulartics2Settings,
  ANGULARTICS2_TOKEN,
  RouterlessTracking,
} from 'angulartics2';
import { UIRouterTracking } from './uirouter';


@NgModule({
  declarations: [Angulartics2On],
  exports: [Angulartics2On],
})
export class Angulartics2UirouterModule {
  static forRoot(
    providers: Provider[],
    settings: Partial<Angulartics2Settings> = {},
  ): ModuleWithProviders {
    return {
      ngModule: Angulartics2UirouterModule,
      providers: [
        { provide: ANGULARTICS2_TOKEN, useValue: { providers, settings } },
        Angulartics2,
        { provide: RouterlessTracking, useClass: UIRouterTracking },
        ...providers,
      ],
    };
  }
}
