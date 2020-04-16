import { ModuleWithProviders, NgModule } from '@angular/core';

import { AngularRouterTracking } from './angular-router';
import { Angulartics2Settings } from './angulartics2-config';
import { Angulartics2 } from './angulartics2-core';
import { ANGULARTICS2_TOKEN } from './angulartics2-token';
import { Angulartics2On, Angulartics2OnModule } from './angulartics2On';
import { RouterlessTracking } from './routerless';

@NgModule({
  imports: [Angulartics2OnModule],
  exports: [Angulartics2On],
})
export class Angulartics2Module {
  static forRoot(
    settings: Partial<Angulartics2Settings> = {},
  ): ModuleWithProviders<Angulartics2Module> {
    return {
      ngModule: Angulartics2Module,
      providers: [
        { provide: ANGULARTICS2_TOKEN, useValue: { settings } },
        { provide: RouterlessTracking, useClass: AngularRouterTracking },
        Angulartics2,
      ],
    };
  }
}
