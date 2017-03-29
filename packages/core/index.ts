import {
  NgModule,
  ModuleWithProviders,
  Inject,
  Optional,
  OpaqueToken,
  SkipSelf
} from '@angular/core';

import { Angulartics } from './src/angulartics';
import { AngularticsOn } from './src/angularticsOn';

export * from './src/angulartics';
export * from './src/angularticsOn';

export const ANGULARTICS_FORROOT_GUARD = new OpaqueToken('ANGULARTICS_FORROOT_GUARD');
export function provideForRootGuard(angulartics: Angulartics): any {
  if (angulartics) {
    throw new Error(
      `AngularticsModule.forRoot() called twice. Lazy loaded modules should use AngularticsModule.forChild() instead.`);
  }

  return 'guarded';
}

@NgModule({
  declarations: [ AngularticsOn ],
  exports: [ AngularticsOn ]
})
export class AngularticsModule {
  constructor(@Optional() @Inject(ANGULARTICS_FORROOT_GUARD) guard: any) {}

  static forRoot(providers: Array<any>): ModuleWithProviders {
    return {
      ngModule: AngularticsModule,
      providers: [
        {
          provide: ANGULARTICS_FORROOT_GUARD,
          useFactory: provideForRootGuard,
          deps: [[Angulartics, new Optional(), new SkipSelf()]]
        },
        Angulartics,
        ...providers
      ]
    };
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: AngularticsModule,
      providers: []
    };
  }
}
