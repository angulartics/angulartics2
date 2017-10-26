import { Injectable, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { filter } from 'rxjs/operators';

import { Angulartics2, AppInsightsSettings } from 'angulartics2';

declare const appInsights: Microsoft.ApplicationInsights.IAppInsights;

export class AppInsightsDefaults implements AppInsightsSettings {
  userId = null;
}

@Injectable()
export class Angulartics2AppInsights {
  loadStartTime: number = null;
  loadTime: number = null;

  metrics: any = null;
  dimensions: any = null;
  measurements: any = null;

  constructor(
    private angulartics2: Angulartics2,
    private title: Title,
    private router: Router,
  ) {
    if (typeof appInsights === 'undefined') {
      console.warn('appInsights not found');
    }

    const defaults = new AppInsightsDefaults;
    // Set the default settings for this module
    this.angulartics2.settings.appInsights = { ...defaults, ...this.angulartics2.settings.appInsights };

    this.angulartics2.pageTrack.subscribe((x: any) => this.pageTrack(x.path));

    this.angulartics2.eventTrack.subscribe((x: any) => this.eventTrack(x.action, x.properties));

    this.angulartics2.exceptionTrack.subscribe((x: any) => this.exceptionTrack(x));

    this.angulartics2.setUsername.subscribe((x: string) => this.setUsername(x));

    this.angulartics2.setUserProperties.subscribe((x: any) => this.setUserProperties(x));

    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(event => this.startTimer());

    this.router.events
      .pipe(filter(event => event instanceof NavigationError || event instanceof NavigationEnd))
      .subscribe(error => this.stopTimer());
  }

  startTimer() {
    this.loadStartTime = Date.now();
    this.loadTime = null;
  }

  stopTimer() {
    this.loadTime = Date.now() - this.loadStartTime;
    this.loadStartTime = null;
  }

  /**
     * Page Track in Baidu Analytics
     * @name pageTrack
     *
     * @param {string} path Required 'path' (string)
     *
     * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackpageview
     *
     */
  pageTrack(path: string) {
    appInsights.trackPageView(
      this.title.getTitle(),
      path,
      this.dimensions,
      this.metrics,
      this.loadTime,
    );
  }

  /**
     * Log a user action or other occurrence.
     * @param   name    A string to identify this event in the portal.
     *
     * @param   properties  map[string, string] - additional data used to filter events and metrics in the portal. Defaults to empty.
     *
     * @https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackevent
     */
  eventTrack(name: string, properties: any) {
    appInsights.trackEvent(name, properties, this.measurements);
  }

  /**
     * Exception Track Event in GA
     * @name exceptionTrack
     *
     * @param {any} properties Comprised of the mandatory fields 'appId' (string), 'appName' (string) and 'appVersion' (string) and
     * optional  fields 'fatal' (boolean) and 'description' (string), error
     *
     * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackexception
     */
  exceptionTrack(properties: any) {
    let description = properties.event || properties.description || properties;

    appInsights.trackException(description);
  }

  /**
     *
     * @param userId
     *
     * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#setauthenticatedusercontext
     */

  setUsername(userId: string) {
    this.angulartics2.settings.appInsights.userId = userId;
    appInsights.setAuthenticatedUserContext(userId);
  }

  setUserProperties(properties: any) {
    if (properties.userId) {
      this.angulartics2.settings.appInsights.userId = properties.userId;
    }

    if (properties.accountId) {
      appInsights.setAuthenticatedUserContext(
        this.angulartics2.settings.appInsights.userId,
        properties.accountId,
      );
    }
  }
}
