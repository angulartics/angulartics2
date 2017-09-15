import { ModuleWithProviders, InjectionToken } from '@angular/core';
import { Angulartics2 } from './core/angulartics2';
export * from './core/angulartics2';
export * from './core/angulartics2On';
export * from './providers/index';
export declare const ANGULARTICS2_FORROOT_GUARD: InjectionToken<{}>;
export declare function provideForRootGuard(angulartics2: Angulartics2): any;
export declare class Angulartics2Module {
    constructor(guard: any);
    static forRoot(providers: Array<any>): ModuleWithProviders;
    static forChild(): ModuleWithProviders;
}
