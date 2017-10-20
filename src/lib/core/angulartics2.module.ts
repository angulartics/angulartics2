import {
  NgModule,
  ModuleWithProviders,
  Optional,
  SkipSelf,
  InjectionToken,
} from '@angular/core';

import { Angulartics2 } from './angulartics2';
import { Angulartics2On } from './angulartics2On'


export const ANGULARTICS2_TOKEN = new InjectionToken<any[]>('ANGULARTICS2');


@NgModule({
  declarations: [ Angulartics2On ],
  exports: [ Angulartics2On ],
})
export class Angulartics2Module {
  constructor(@Optional() @SkipSelf() parentModule: Angulartics2Module) {
    if (parentModule) {
      throw new Error('Angulartics2Module.forRoot() called twice. Lazy loaded modules should use Angulartics2Module instead.');
    }
  }

  static forRoot(providers: any[]): ModuleWithProviders {
    return {
      ngModule: Angulartics2Module,
      providers: [
        { provide: ANGULARTICS2_TOKEN, useValue: providers },
        Angulartics2,
        ...providers,
      ]
    }
  }
}
