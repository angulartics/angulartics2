import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss'],
})
export class ProvidersComponent {
  providers = [
    {
      name: 'adobeanalytics',
      display: 'Adobe Analytics',
      type: 'Analytics',
    },
    {
      name: 'amplitude',
      display: 'Amplitude',
      type: 'Analytics',
    },
    {
      name: 'appinsights',
      display: 'Azure Application Insights',
      type: 'Analytics',
    },
    {
      name: 'baidu',
      display: 'Baidu',
      type: 'Analytics',
    },
    {
      name: 'clicky',
      display: 'Clicky',
      type: 'Analytics',
    },
    {
      name: 'facebook',
      display: 'Facebook Pixel',
      type: 'Advertising',
    },
    {
      name: 'ga',
      display: 'Google Analytics',
      type: 'Analytics',
    },
    {
      name: 'ga-enhanced-ecom',
      display: 'Google Analytics Enhanced Ecommerce',
      type: 'Analytics',
    },
    {
      name: 'gtm',
      display: 'Google Tag Manager',
      type: 'Analytics',
    },
    {
      name: 'gst',
      display: 'Google Global Site Tag',
      type: 'Analytics',
    },
    {
      name: 'hubspot',
      display: 'HubSpot',
      type: 'Analytics',
    },
    {
      name: 'intercom',
      display: 'Intercom',
      type: 'Email',
    },
    {
      name: 'kissmetrics',
      display: 'Kissmetrics',
      type: 'Analytics',
    },
    {
      name: 'launch',
      display: 'Launch, by Adobe',
      type: 'Analytics',
    },
    {
      name: 'mixpanel',
      display: 'Mixpanel',
      type: 'Analytics',
    },
    {
      name: 'piwik',
      display: 'Piwik',
      type: 'Analytics',
    },
    {
      name: 'segment',
      display: 'Segment',
      type: 'Analytics',
    },
    {
      name: 'pyze',
      display: 'Pyze',
      type: 'Analytics',
    },
    {
      name: 'splunk',
      display: 'Splunk',
      type: 'Analytics',
    },
    {
      name: 'woopra',
      display: 'Woopra',
      type: 'Analytics',
    },
  ];
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    for (const provider of this.providers) {
      iconRegistry.addSvgIcon(
        provider.name,
        sanitizer.bypassSecurityTrustResourceUrl(
          `/assets/svg/${provider.name}.svg`,
        ),
      );
    }
  }
}
