import { copySync } from 'fs-extra';
import { ngPackagr } from 'ng-packagr';
import { join } from 'path';
import * as del from 'del';

const CORE_MODULE_NAMES = ['uiroutermodule', 'routerlessmodule'];

// Rollup globals
const MODULE_NAMES = [
  'adobeanalytics',
  'appinsights',
  'baidu',
  'facebook',
  'ga',
  'ga-enhanced-ecom',
  'gtm',
  'gst',
  'hubspot',
  'kissmetrics',
  'launch',
  'mixpanel',
  'pyze',
  'piwik',
  'segment',
  'intercom',
  'woopra',
  'clicky',
  'amplitude',
  'splunk',
  'ibm-digital-analytics',
  'gosquared',
];


async function main() {
  // cleanup dist
  del.sync(join(process.cwd(), '/dist'));
  del.sync(join(process.cwd(), '/node_modules/angulartics2'));

  await ngPackagr()
    .forProject(join(process.cwd(), 'src/lib/core/package.json'))
    .build();

  // put it in node modules so the path resolves
  // proper path support eventually
  copySync(
    join(process.cwd(), '/dist/core'),
    join(process.cwd(), '/node_modules/angulartics2'),
  );
  copySync(
    join(process.cwd(), '/dist/core'),
    join(process.cwd(), '/dist/packages-dist'),
  );

  for (const m of CORE_MODULE_NAMES) {
    await ngPackagr()
      .forProject(join(process.cwd(), `src/lib/${m}/package.json`))
      .build();
  }

  // build each provider
  for (const m of MODULE_NAMES) {
    await ngPackagr()
      .forProject(join(process.cwd(), `src/lib/providers/${m}/package.json`))
      .build();
  }

  copySync('README.md', join(process.cwd(), 'dist/packages-dist/README.md'));
  copySync('LICENSE', join(process.cwd(), 'dist/packages-dist/LICENSE'));
}

main()
  .then(() => console.log('success'))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
