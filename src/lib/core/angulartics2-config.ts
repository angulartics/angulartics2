export interface GoogleAnalyticsSettings {
  /** array of additional account names (only works for analyticsjs) */
  additionalAccountNames: string[];
  userId: any;
  /** see https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#transport */
  transport: string;
}

export interface AppInsightsSettings {
  userId: string;
}

export interface GoogleTagManagerSettings {
  userId: any;
}

export interface PageTrackingSettings {
  autoTrackVirtualPages: boolean;
  basePath: string;
  excludedRoutes: (string | RegExp)[];
  /** drop ids from url `/sections/123/pages/456` -> `/sections/pages` */
  clearIds: boolean;
}

export interface Angulartics2Settings {
  pageTracking: Partial<PageTrackingSettings>;
  /** Disable page tracking */
  developerMode: boolean;
  ga: Partial<GoogleAnalyticsSettings>;
  appInsights: Partial<AppInsightsSettings>;
  gtm: Partial<GoogleTagManagerSettings>;
}

export class DefaultConfig implements Angulartics2Settings {
  pageTracking = {
    autoTrackVirtualPages: true,
    basePath: '',
    excludedRoutes: [],
    clearIds: false,
  };
  developerMode = false;
  ga = {};
  appInsights = {};
  gtm = {};
}
