/* tslint:disable:import-blacklist */

// build based on
// https://github.com/angular/angularfire2/blob/master/tools/build.js
import { spawn } from 'child_process';
import { rollup } from 'rollup';
import * as sourcemaps from 'rollup-plugin-sourcemaps';
import { Observable } from 'rxjs';
import { copy } from 'fs-extra';

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
  clicky: 'angulartics2.clicky',
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
  'rxjs/operators/filter': 'Rx.Observable',
  'rxjs/observable/merge': 'Rx.Observable',
  'rxjs/observable/of': 'Rx.Observable',

  'angulartics2': MODULE_NAMES['core'],
};

function createEntry(name): string {
  if (name === 'core') {
    return `${process.cwd()}/dist/packages-dist/index.js`;
  }
  return `${process.cwd()}/dist/packages-dist/${name}/index.js`;
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
  const entry = createEntry(name);
  const file = `${process.cwd()}/dist/packages-dist/bundles/${name}.umd.js`;
  return generateBundle(entry, file, moduleName, 'umd');
}

function buildModule(name: string, type: string) {
  const es2015$ = spawnObservable(NGC, TSC_ARGS(type, name));
  const esm$ = spawnObservable(NGC, TSC_ARGS(type, name, 'esm'));
  return Observable.forkJoin(es2015$, esm$);
}

function buildModulesProviders() {
  const providers = Object.keys(MODULE_NAMES).filter((n) => n !== 'core');
  return Observable.of(...providers)
    .mergeMap((name) => buildModule(name, 'providers'), 3)
    .combineAll();
}

function buildUmds() {
  return Observable.of(...Object.keys(MODULE_NAMES))
    .mergeMap((name) => Observable.from(createUmd(name)), 3)
    .combineAll();
}

function copyFilesCore() {
  return Observable
    .forkJoin(
      Observable.from(copy(
        `${process.cwd()}/README.md`,
        `${process.cwd()}/dist/packages-dist/README.md`,
      )),
      Observable.from(copy(
        `${process.cwd()}/src/lib/core/package.json`,
        `${process.cwd()}/dist/packages-dist/package.json`,
      )),
    );
}

function copyFilesProviders() {
  const providers = Object.keys(MODULE_NAMES).filter((n) => n !== 'core');
  return Observable.of(...providers)
    .mergeMap((name) => Observable.of(copy(
      `${process.cwd()}/src/lib/providers/${name}/package.json`,
      `${process.cwd()}/dist/packages-dist/${name}/package.json`,
    )))
    .combineAll();
}

function buildLibrary() {
  return Observable
    .forkJoin(buildModule('core', ''))
    .switchMap(() => copyFilesCore())
    .switchMap(() => buildModulesProviders())
    .switchMap(() => copyFilesProviders())
    .switchMap(() => buildUmds());
}

buildLibrary().subscribe(
  data => console.log('success'),
  err => console.log('err', err),
  () => console.log('complete'),
);
