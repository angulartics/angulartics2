import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
export declare class Angulartics2 {
    settings: any;
    pageTrack: ReplaySubject<any>;
    eventTrack: ReplaySubject<any>;
    exceptionTrack: ReplaySubject<any>;
    setAlias: ReplaySubject<any>;
    setUsername: ReplaySubject<any>;
    setUserProperties: ReplaySubject<any>;
    setUserPropertiesOnce: ReplaySubject<any>;
    setSuperProperties: ReplaySubject<any>;
    setSuperPropertiesOnce: ReplaySubject<any>;
    userTimings: ReplaySubject<any>;
    constructor(location: Location, router: Router);
    trackLocation(location: Location, router: Router): void;
    virtualPageviews(value: boolean): void;
    excludeRoutes(routes: Array<string | RegExp>): void;
    firstPageview(value: boolean): void;
    withBase(value: string): void;
    developerMode(value: boolean): void;
    protected trackUrlChange(url: string, location: Location): void;
    protected matchesExcludedRoute(url: string): boolean;
}
