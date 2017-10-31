/* tslint:disable:import-blacklist */
// based on https://github.com/angular/angularfire2/blob/master/tools/build.js
import { rollup } from 'rollup';
import { spawn } from 'child_process';
import { Observable } from 'rxjs';
import * as copyfiles from 'copy';
import * as sourcemaps from 'rollup-plugin-sourcemaps';

const copyAll: ((s: string, s1: string) => any) = Observable.bindCallback(copyfiles);

// Rollup globals
const MODULE_NAMES = {
  core: 'angulartics2',
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
};

const GLOBALS = {
  '@angular/core': 'ng.core',
  '@angular/common': 'ng.common',
  '@angular/forms': 'ng.forms',
  '@angular/http': 'ng.http',
  '@angular/router': 'ng.router',
  '@angular/platform-browser': 'ng.platformBrowser',
  '@angular/platform-server': 'ng.platformServer',
  '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',

  'rxjs/Observable': 'Rx',
  'rxjs/Subject': 'Rx',
  'rxjs/Observer': 'Rx',
  'rxjs/Subscription': 'Rx',
  'rxjs/ReplaySubject': 'Rx',
  'rxjs/operators': 'Rx.Observable',
  'rxjs/observable/merge': 'Rx.Observable',
  'rxjs/observable/of': 'Rx.Observable',

  'angulartics2': MODULE_NAMES['core'],
  'angulartics2/adobeanalytics': MODULE_NAMES['adobeanalytics'],
};

function createEntry(name, target, type= 'core'): string {
  const ENTRIES = {
    core: `${process.cwd()}/dist/packages-dist/index.js`,
    adobeanalytics: `${process.cwd()}/dist/packages-dist/adobeanalytics/index.js`,
    appinsights: `${process.cwd()}/dist/packages-dist/appinsights/index.js`,
    baidu: `${process.cwd()}/dist/packages-dist/baidu/index.js`,
    facebook: `${process.cwd()}/dist/packages-dist/facebook/index.js`,
    ga: `${process.cwd()}/dist/packages-dist/ga/index.js`,
    'ga-enhanced-ecom': `${process.cwd()}/dist/packages-dist/ga-enhanced-ecom/index.js`,
    gtm: `${process.cwd()}/dist/packages-dist/gtm/index.js`,
    hubspot: `${process.cwd()}/dist/packages-dist/hubspot/index.js`,
    kissmetrics: `${process.cwd()}/dist/packages-dist/kissmetrics/index.js`,
    mixpanel: `${process.cwd()}/dist/packages-dist/mixpanel/index.js`,
    piwik: `${process.cwd()}/dist/packages-dist/piwik/index.js`,
    segment: `${process.cwd()}/dist/packages-dist/segment/index.js`,
    intercom: `${process.cwd()}/dist/packages-dist/intercom/index.js`,
    woopra: `${process.cwd()}/dist/packages-dist/woopra/index.js`,
  };
  return ENTRIES[name];
}


// Constants for running typescript commands
const NGC = './node_modules/.bin/ngc';
const TSC_ARGS = (type: string, name: string, config= 'build') => {
  if (!type) {
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

function generateBundle(input, file, name, format) {
  const plugins = [
    sourcemaps(),
  ];
  return rollup({
    input,
    external: Object.keys(GLOBALS),
    onwarn(warning) {
      if (warning.code === 'THIS_IS_UNDEFINED') {
        return;
      }
      if (warning.code === 'UNUSED_EXTERNAL_IMPORT') {
        return;
      }
      console.log(warning.message);
    },
    file,
    plugins,
  }).then(bundle => {
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
  const entry = createEntry(name, 'es5');
  let file = `${process.cwd()}/dist/packages-dist/bundles/${name}.umd.js`;
  if (name === 'core') {
    file = `${process.cwd()}/dist/packages-dist/bundles/angulartics2-core.umd.js`;
  }
  return generateBundle(entry, file, moduleName, 'umd');
}

function createEs(name: string, target: string, type: string) {
  const moduleName = MODULE_NAMES[name];
  const entry = createEntry(name, target);
  const file = `${process.cwd()}/dist/packages-dist/angulartics2.${target}.js`;
  return generateBundle(entry, file, moduleName, 'es');
}

function buildModule(name: string, type: string) {
  const es2015$ = spawnObservable(NGC, TSC_ARGS(type, name));
  const esm$ = spawnObservable(NGC, TSC_ARGS(type, name, 'esm'));
  return Observable.forkJoin(es2015$, esm$);
}

function createBundles(name: string, type: string) {
  return Observable
    .forkJoin(
      Observable.from(createEs(name, 'es2015', type)),
      Observable.from(createEs(name, 'es5', type)),
    );
}

function buildModulesProviders() {
  return Observable.of(...Object.keys(MODULE_NAMES))
    .mergeMap((name) => {
      if (name === 'core') {
        return Observable.fromPromise(Promise.resolve('hello'));
      }
      return buildModule(name, 'providers');
    }, 2)
    .combineAll();
}

function buildUmds() {
  return Observable.of(...Object.keys(MODULE_NAMES))
    .mergeMap((name) => Observable.from(createUmd(name)), 2)
    .combineAll();
}

function copyFilesCore() {
  return Observable
    .forkJoin(
      copyAll(`${process.cwd()}/*.md`, `${process.cwd()}/dist/packages-dist`),
      copyAll(`${process.cwd()}/src/lib/core/package.json*`, `${process.cwd()}/dist/packages-dist`),
    );
}

function copyFilesProviders() {
  return Observable
    .forkJoin(
      copyAll(`${process.cwd()}/src/lib/providers/**/package.json`, `${process.cwd()}/dist/packages-dist`),
    );
}

function buildLibrary() {
  return Observable
    .forkJoin(buildModule('core', ''))
    .switchMap(() => createBundles('core', 'core'))
    .switchMap(() => copyFilesCore())
    .switchMap(() => buildModulesProviders())
    .switchMap(() => buildUmds())
    .switchMap(() => copyFilesProviders());
}

buildLibrary().subscribe(
  data => console.log('success'),
  err => console.log('err', err),
  () => console.log('complete'),
);
