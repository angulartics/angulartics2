import {
  ModuleWithProviders,
  NgModule,
  Provider,
} from '@angular/core';

import { AngularRouterTracking } from './angular-router';
import { Angulartics2 } from './angulartics2';
import { Angulartics2Settings } from './angulartics2-config';
import { ANGULARTICS2_TOKEN } from './angulartics2-token';
import { Angulartics2On, Angulartics2OnModule } from './angulartics2On';
import { RouterlessTracking } from './routerless';


@NgModule({
  imports: [Angulartics2OnModule],
  exports: [Angulartics2On],
})
export class Angulartics2Module {
  static forRoot(
    providers: Provider[],
    settings: Partial<Angulartics2Settings> = {},
  ): ModuleWithProviders {
    return {
      ngModule: Angulartics2Module,
      providers: [
        { provide: ANGULARTICS2_TOKEN, useValue: { providers, settings } },
        Angulartics2,
        { provide: RouterlessTracking, useClass: AngularRouterTracking },
        ...providers,
      ],
    };
  }
}
