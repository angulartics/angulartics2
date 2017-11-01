import {
  NgModule,
  ModuleWithProviders,
  Optional,
  SkipSelf,
} from '@angular/core';

import { Angulartics2 } from './angulartics2';
import { Angulartics2On } from './angulartics2On';
import { ANGULARTICS2_TOKEN } from './angulartics2-token';
import { Angulartics2Settings } from './angulartics2-config';


@NgModule({
  declarations: [Angulartics2On],
  exports: [Angulartics2On],
})
export class Angulartics2Module {
  constructor(@Optional() @SkipSelf() parentModule: Angulartics2Module) {
    if (parentModule) {
      throw new Error(
        'Angulartics2Module.forRoot() called twice. Lazy loaded modules should use Angulartics2Module instead.',
      );
    }
  }

  static forRoot(providers: any[], settings: Partial<Angulartics2Settings> = {}): ModuleWithProviders {
    return {
      ngModule: Angulartics2Module,
      providers: [
        { provide: ANGULARTICS2_TOKEN, useValue: { providers, settings } },
        Angulartics2,
        ...providers,
      ],
    };
  }
}
