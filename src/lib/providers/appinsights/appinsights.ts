import { Injectable } from '@angular/core';
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

@Injectable({ providedIn: 'root' })
export class Angulartics2AppInsights {
  loadStartTime: number = null;
  loadTime: number = null;

  metrics: { [name: string]: number } = null;
  dimensions: { [name: string]: string } = null;
  measurements: { [name: string]: number } = null;

  constructor(
    private angulartics2: Angulartics2,
    private title: Title,
    private router: Router,
  ) {
    if (typeof appInsights === 'undefined') {
      console.warn('appInsights not found');
    }

    const defaults = new AppInsightsDefaults();
    // Set the default settings for this module
    this.angulartics2.settings.appInsights = { ...defaults, ...this.angulartics2.settings.appInsights };
    this.angulartics2.setUsername
      .subscribe((x: string) => this.setUsername(x));
    this.angulartics2.setUserProperties
      .subscribe((x) => this.setUserProperties(x));
  }

  startTracking(): void {
    this.angulartics2.pageTrack
      .pipe(this.angulartics2.filterDeveloperMode())
      .subscribe((x) => this.pageTrack(x.path));
    this.angulartics2.eventTrack
      .pipe(this.angulartics2.filterDeveloperMode())
      .subscribe((x) => this.eventTrack(x.action, x.properties));
    this.angulartics2.exceptionTrack
      .pipe(this.angulartics2.filterDeveloperMode())
      .subscribe((x) => this.exceptionTrack(x));
    this.router.events
      .pipe(
        this.angulartics2.filterDeveloperMode(),
        filter(event => event instanceof NavigationStart),
    )
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
   *
   * @param path - Location 'path'
   *
   * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackpageview
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
   *
   * @param name Name to identify this event in the portal.
   * @param properties Additional data used to filter events and metrics in the portal. Defaults to empty.
   *
   * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackevent
   */
  eventTrack(name: string, properties: { [name: string]: string }) {
    appInsights.trackEvent(name, properties, this.measurements);
  }

  /**
   * Exception Track Event in GA
   *
   * @param properties - Comprised of the mandatory fields 'appId' (string), 'appName' (string) and 'appVersion' (string) and
   * optional fields 'fatal' (boolean) and 'description' (string), error
   *
   * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#trackexception
   */
  exceptionTrack(properties: any) {
    const description = properties.event || properties.description || properties;

    appInsights.trackException(description);
  }

  /**
   * @link https://github.com/Microsoft/ApplicationInsights-JS/blob/master/API-reference.md#setauthenticatedusercontext
   */
  setUsername(userId: string) {
    this.angulartics2.settings.appInsights.userId = userId;
    appInsights.setAuthenticatedUserContext(userId);
  }

  setUserProperties(properties: Partial<{ userId: string, accountId: string }>) {
    if (properties.userId) {
      this.angulartics2.settings.appInsights.userId = properties.userId;
    }
    if (properties.accountId) {
      appInsights.setAuthenticatedUserContext(
        this.angulartics2.settings.appInsights.userId,
        properties.accountId,
      );
    } else {
      appInsights.setAuthenticatedUserContext(
        this.angulartics2.settings.appInsights.userId,
      );
    }
  }
}
