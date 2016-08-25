import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Angulartics2 } from './angulartics2';
export declare class Angulartics2RouterFix extends Angulartics2 {
    constructor(location: Location, router: Router);
    trackRouter(location: Location, router: Router): void;
    private matchesExcludedRouteChild(url);
}
