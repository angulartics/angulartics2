import {
  NgModule,
  ModuleWithProviders,
  Inject,
  Optional,
  OpaqueToken,
  SkipSelf
} from '@angular/core';

import { Angulartics2 } from './core/angulartics2';
import { Angulartics2On } from './core/angulartics2On';

export * from './core/angulartics2';
export * from './core/angulartics2On';
export * from './providers/index'

export const ANGULARTICS2_FORROOT_GUARD = new OpaqueToken('ANGULARTICS2_FORROOT_GUARD');
export function provideForRootGuard(angulartics2: Angulartics2): any {
  if (angulartics2) {
    throw new Error(
      `Angulartics2Module.forRoot() called twice. Lazy loaded modules should use Angulartics2Module.forChild() instead.`);
  }

  return 'guarded';
}

@NgModule({
  declarations: [ Angulartics2On ],
  exports: [ Angulartics2On ]
})
export class Angulartics2Module {
  constructor(@Optional() @Inject(ANGULARTICS2_FORROOT_GUARD) guard: any) {}

  static forRoot(providers: Array<any>): ModuleWithProviders {
    return {
      ngModule: Angulartics2Module,
      providers: [
        {
          provide: ANGULARTICS2_FORROOT_GUARD,
          useFactory: provideForRootGuard,
          deps: [[Angulartics2, new Optional(), new SkipSelf()]]
        },
        Angulartics2,
        ...providers
      ]
    };
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: Angulartics2Module,
      providers: []
    };
  }
}
