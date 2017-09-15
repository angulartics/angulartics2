import { Angulartics2 } from '../../core/angulartics2';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
export declare class Angulartics2AppInsights {
    private angulartics2;
    private title;
    private router;
    loadStartTime: number;
    loadTime: number;
    metrics: any;
    dimensions: any;
    measurements: any;
    constructor(angulartics2: Angulartics2, title: Title, router: Router);
    startTimer(): void;
    stopTimer(): void;
    /**
     * Page Track in Baidu Analytics
     * @name pageTrack
     *
     * @param {string} path Required 'path' (string)
     *
     * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackpageview
     *
     */
    pageTrack(path: string): void;
    /**
     * Log a user action or other occurrence.
     * @param   name    A string to identify this event in the portal.
     *
     * @param   properties  map[string, string] - additional data used to filter events and metrics in the portal. Defaults to empty.
     *
     * @https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackevent
     */
    eventTrack(name: string, properties: any): void;
    /**
     * Exception Track Event in GA
     * @name exceptionTrack
     *
     * @param {any} properties Comprised of the mandatory fields 'appId' (string), 'appName' (string) and 'appVersion' (string) and
     * optional  fields 'fatal' (boolean) and 'description' (string), error
     *
     * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackexception
     */
    exceptionTrack(properties: any): void;
    /**
     *
     * @param userId
     *
     * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#setauthenticatedusercontext
     */
    setUsername(userId: string): void;
    setUserProperties(properties: any): void;
}
