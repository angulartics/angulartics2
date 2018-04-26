/* tslint:disable:import-blacklist */

// build based on
// https://github.com/angular/angularfire2/blob/master/tools/build.js
import { spawn } from 'child_process';
import * as copyfiles from 'copy';
import { copy } from 'fs-extra';
import { rollup, RollupFileOptions, RollupWarning } from 'rollup';
import * as filesize from 'rollup-plugin-filesize';
import * as sourcemaps from 'rollup-plugin-sourcemaps';
import { Observable } from 'rxjs';

const copyAll: ((s: string, s1: string) => any) = Observable.bindCallback(
  copyfiles,
);

const core = ['core', 'uiroutermodule', 'routerlessmodule'];

// Rollup globals
const MODULE_NAMES = {
  core: 'angulartics2',
  uiroutermodule: 'angulartics2.uiroutermodule',
  routerlessmodule: 'angulartics2.routerlessmodule',
  adobeanalytics: 'angulartics2.adobeanalytics',
  appinsights: 'angulartics2.appinsights',
  baidu: 'angulartics2.baidu',
  facebook: 'angulartics2.facebook',
  ga: 'angulartics2.ga',
  'ga-enhanced-ecom': 'angulartics2.ga-enhanced-ecom',
  gtm: 'angulartics2.gtm',
  hubspot: 'angulartics2.hubspot',
  kissmetrics: 'angulartics2.kissmetrics',
  mixpanel: 'angulartics2.mixpanel',
  piwik: 'angulartics2.piwik',
  segment: 'angulartics2.segment',
  intercom: 'angulartics2.intercom',
  woopra: 'angulartics2.woopra',
  clicky: 'angulartics2.clicky',
  amplitude: 'angulartics2.amplitude',
};

const GLOBALS = {
  'tslib': 'tslib',

  '@angular/core': 'ng.core',
  '@angular/common': 'ng.common',
  '@angular/forms': 'ng.forms',
  '@angular/http': 'ng.http',
  '@angular/router': 'ng.router',
  '@angular/platform-browser': 'ng.platformBrowser',
  '@angular/platform-server': 'ng.platformServer',
  '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',

  '@uirouter/core': '@uirouter/core',

  'rxjs/Observable': 'Rx',
  'rxjs/Subject': 'Rx',
  'rxjs/Observer': 'Rx',
  'rxjs/Subscription': 'Rx',
  'rxjs/ReplaySubject': 'Rx',
  'rxjs/BehaviorSubject': 'Rx',

  'rxjs/operators/filter': 'Rx.operators',
  'rxjs/operators/map': 'Rx.operators',
  'rxjs/operators/delay': 'Rx.operators',

  'rxjs/observable/merge': 'Rx.Observable',
  'rxjs/observable/of': 'Rx.Observable',

  'angulartics2': MODULE_NAMES['core'],
};

function createEntry(name): string {
  if (name === 'core') {
    return `${process.cwd()}/dist/es5/index.js`;
  }
  return `${process.cwd()}/dist/${name}/es5/index.js`;
}


// Constants for running typescript commands
const NGC = './node_modules/.bin/ngc';
const TSC_ARGS = (type: string, name: string, config= 'build') => {
  if (!type || type === 'routerlessmodule' || type === 'uiroutermodule') {
    return ['-p', `${process.cwd()}/src/lib/${name}/tsconfig-${config}.json`];
  }
  return ['-p', `${process.cwd()}/src/lib/${type}/${name}/tsconfig-${config}.json`];
};

/**
 * Create an Observable of a spawned child process.
 */
function spawnObservable(command: string, args: string[]) {
  return Observable.create(observer => {
    const cmd = spawn(command, args);
    observer.next(''); // hack to kick things off, not every command will have a stdout
    cmd.stdout.on('data', (data) => { observer.next(data.toString()); });
    cmd.stderr.on('data', (data) => { observer.error(data.toString()); });
    cmd.on('close', (data) => { observer.complete(); });
  });
}

function generateBundle(
  input: string,
  file: string,
  name,
  format,
): Promise<any> {
  const plugins = [sourcemaps(), filesize()];
  const options: RollupFileOptions = {
    input,
    external: Object.keys(GLOBALS),
    onwarn(warning: RollupWarning) {
      if (warning.code === 'THIS_IS_UNDEFINED') {
        return;
      }
      if (warning.code === 'UNUSED_EXTERNAL_IMPORT') {
        return;
      }
      console.log(warning.message);
    },
    plugins,
  };
  return rollup(options).then(bundle => {
    return bundle.write({
      file,
      name,
      globals: GLOBALS,
      format,
      sourcemap: true,
    });
  });
}

function createUmd(name: string) {
  const moduleName = MODULE_NAMES[name];
  const entry = createEntry(name);
  const file = `${process.cwd()}/dist/packages-dist/bundles/${name}.umd.js`;
  return generateBundle(entry, file, moduleName, 'umd');
}

function createEs(name: string, target: string) {
  const moduleName = MODULE_NAMES[name];
  const entry = createEntry(name);
  let output = `${process.cwd()}/dist/packages-dist/${name}/${name}.${target}.js`;
  if (name === 'core') {
    output = `${process.cwd()}/dist/packages-dist/${name}.${target}.js`;
  }
  return generateBundle(
    entry,
    output,
    name,
    'es',
  );
}

function buildModule(name: string, type: string) {
  const es2015$ = spawnObservable(NGC, TSC_ARGS(type, name));
  const esm$ = spawnObservable(NGC, TSC_ARGS(type, name, 'esm'));
  return Observable.forkJoin(es2015$, esm$);
}

async function buildModulesProviders() {
  const providers = Object.keys(MODULE_NAMES).filter((n) => !core.includes(n));
  for (const name of providers) {
    await buildModule(name, 'providers').toPromise();
  }
}

function buildUmds() {
  return Promise.all(Object.keys(MODULE_NAMES).map(async (name) => {
    await createUmd(name);
    await createEs(name, 'es2015');
    await createEs(name, 'es5');
  }));
}

async function copyFilesCore() {
  await copyAll(
    `${process.cwd()}/dist/es2015/**/*.d.ts`,
    `${process.cwd()}/dist/packages-dist`,
  ).toPromise();
  await copy(
    `${process.cwd()}/README.md`,
    `${process.cwd()}/dist/packages-dist/README.md`,
  );
  await copy(
    `${process.cwd()}/src/lib/core/package.json`,
    `${process.cwd()}/dist/packages-dist/package.json`,
  );
  await copy(
    `${process.cwd()}/dist/es2015/index.metadata.json`,
    `${process.cwd()}/dist/packages-dist/index.metadata.json`,
  );
  copyAll(
    `${process.cwd()}/dist/routerlessmodule/es2015/**/*.d.ts`,
    `${process.cwd()}/dist/packages-dist/routerlessmodule`,
  );
  await copy(
    `${process.cwd()}/dist/routerlessmodule/es2015/index.metadata.json`,
    `${process.cwd()}/dist/packages-dist/routerlessmodule/index.metadata.json`,
  );
  await copy(
    `${process.cwd()}/src/lib/routerlessmodule/package.json`,
    `${process.cwd()}/dist/packages-dist/routerlessmodule/package.json`,
  );
  await copyAll(
    `${process.cwd()}/dist/uiroutermodule/es2015/**/*.d.ts`,
    `${process.cwd()}/dist/packages-dist/uiroutermodule`,
  ).toPromise();
  await copy(
    `${process.cwd()}/dist/uiroutermodule/es2015/index.metadata.json`,
    `${process.cwd()}/dist/packages-dist/uiroutermodule/index.metadata.json`,
  );
  await copy(
    `${process.cwd()}/src/lib/uiroutermodule/package.json`,
    `${process.cwd()}/dist/packages-dist/uiroutermodule/package.json`,
  );
}

function copyFilesProviders() {
  const providers = Object.keys(MODULE_NAMES).filter((n) => !core.includes(n));
  return Promise.all(providers.map(async (name) => {
    await copyAll(
      `${process.cwd()}/dist/${name}/es2015/**/*.d.ts`,
      `${process.cwd()}/dist/packages-dist/${name}`,
    ).toPromise();
    await copy(
      `${process.cwd()}/src/lib/providers/${name}/package.json`,
      `${process.cwd()}/dist/packages-dist/${name}/package.json`,
    );
    await copy(
      `${process.cwd()}/dist/${name}/es2015/index.metadata.json`,
      `${process.cwd()}/dist/packages-dist/${name}/index.metadata.json`,
    );
  }));
}

async function buildLibrary() {
  try {
    await buildModule('core', '').toPromise();
    await buildModule('routerlessmodule', 'routerlessmodule').toPromise();
    await buildModule('uiroutermodule', 'uiroutermodule').toPromise();
    await buildModulesProviders();
    await copyFilesCore();
    await copyFilesProviders();
    await buildUmds();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

buildLibrary()
  .then(() => console.log('success'))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
