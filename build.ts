/* tslint:disable:import-blacklist */

// build based on
// https://github.com/angular/angularfire2/blob/master/tools/build.js
import { spawn } from 'child_process';
import * as copyfiles from 'copy';
import { copy } from 'fs-extra';
import { rollup } from 'rollup';
import * as filesize from 'rollup-plugin-filesize';
import * as sourcemaps from 'rollup-plugin-sourcemaps';
import { Observable } from 'rxjs';

const copyAll: ((s: string, s1: string) => any) = Observable.bindCallback(
  copyfiles,
);

const core = ['core', 'uirouter', 'routerless'];

// Rollup globals
const MODULE_NAMES = {
  core: 'angulartics2',
  uirouter: 'angulartics2.uirouter',
  routerless: 'angulartics2.routerless',
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

  'rxjs/observable/merge': 'Rx.Observable',
  'rxjs/observable/of': 'Rx.Observable',

  'angulartics2': MODULE_NAMES['core'],
};

function createEntry(name): string {
  if (name === 'core') {
    return `${process.cwd()}/dist/es5/index.js`;
  }
  if (name === 'routerless' || name === 'uirouter') {
    return `${process.cwd()}/dist/${name}/es5/${name}/index.js`;
  }
  return `${process.cwd()}/dist/${name}/es5/index.js`;
}


// Constants for running typescript commands
const NGC = './node_modules/.bin/ngc';
const TSC_ARGS = (type: string, name: string, config= 'build') => {
  if (!type) {
    return ['-p', `${process.cwd()}/src/lib/${name}/tsconfig-${config}.json`];
  }
  if (type === 'routerless' || type === 'uirouter') {
    return ['-p', `${process.cwd()}/src/lib/core/${name}/tsconfig-${config}.json`];
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
    filesize(),
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

function createEs(name: string, target: string) {
  const moduleName = MODULE_NAMES[name];
  const entry = createEntry(name);
  let output = `${process.cwd()}/dist/packages-dist/${name}/${name}.${target}.js`;
  if (name === 'core') {
    output = `${process.cwd()}/dist/packages-dist/${name}.${target}.js`;
  }
  if (name === 'uirouter') {
    output = `${process.cwd()}/dist/packages-dist/uirouter/${name}.${target}.js`;
  }
  if (name === 'routerless') {
    output = `${process.cwd()}/dist/packages-dist/routerless/${name}.${target}.js`;
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

function buildModulesProviders() {
  const providers = Object.keys(MODULE_NAMES).filter((n) => !core.includes(n));
  return Observable.of(...providers)
    .flatMap((name) => buildModule(name, 'providers'));
}

function buildUmds() {
  return Observable.of(...Object.keys(MODULE_NAMES))
    .zip((name) => Observable.forkJoin(
      Observable.from(createUmd(name)),
      Observable.from(createEs(name, 'es2015')),
      Observable.from(createEs(name, 'es5')),
    ));
}

function copyFilesCore() {
  return Observable
    .zip(
      copyAll(
        `${process.cwd()}/dist/es2015/**/*.d.ts`,
        `${process.cwd()}/dist/packages-dist`,
      ),
      Observable.from(copy(
        `${process.cwd()}/README.md`,
        `${process.cwd()}/dist/packages-dist/README.md`,
      )),
      Observable.from(copy(
        `${process.cwd()}/src/lib/core/package.json`,
        `${process.cwd()}/dist/packages-dist/package.json`,
      )),
      Observable.of(copy(
        `${process.cwd()}/dist/es2015/index.metadata.json`,
        `${process.cwd()}/dist/packages-dist/index.metadata.json`,
      )),
      copyAll(
        `${process.cwd()}/dist/routerless/es2015/**/*.d.ts`,
        `${process.cwd()}/dist/packages-dist/routerless`,
      ),
      Observable.of(copy(
        `${process.cwd()}/dist/routerless/es2015/routerless/index.metadata.json`,
        `${process.cwd()}/dist/packages-dist/routerless/index.metadata.json`,
      )),
      Observable.of(copy(
        `${process.cwd()}/src/lib/core/routerless/package.json`,
        `${process.cwd()}/dist/packages-dist/routerless/package.json`,
      )),
      copyAll(
        `${process.cwd()}/dist/uirouter/es2015/**/*.d.ts`,
        `${process.cwd()}/dist/packages-dist/uirouter`,
      ),
      Observable.of(copy(
        `${process.cwd()}/dist/uirouter/es2015/uirouter/index.metadata.json`,
        `${process.cwd()}/dist/packages-dist/uirouter/index.metadata.json`,
      )),
      Observable.of(copy(
        `${process.cwd()}/src/lib/core/uirouter/package.json`,
        `${process.cwd()}/dist/packages-dist/uirouter/package.json`,
      )),
    );
}

function copyFilesProviders() {
  const providers = Object.keys(MODULE_NAMES).filter((n) => !core.includes(n));
  return Observable.of(...providers)
    .mergeMap((name) =>  Observable
      .zip(
        copyAll(
          `${process.cwd()}/dist/${name}/es2015/**/*.d.ts`,
          `${process.cwd()}/dist/packages-dist/${name}`,
        ),
        Observable.of(copy(
          `${process.cwd()}/src/lib/providers/${name}/package.json`,
          `${process.cwd()}/dist/packages-dist/${name}/package.json`,
        )),
        Observable.of(copy(
          `${process.cwd()}/dist/${name}/es2015/index.metadata.json`,
          `${process.cwd()}/dist/packages-dist/${name}/index.metadata.json`,
        )),
      ),
    )
    .combineAll();
}

async function buildLibrary() {
  await Observable.zip(
    buildModule('core', ''),
    buildModule('routerless', 'routerless'),
    buildModule('uirouter', 'uirouter'),
  )
  .toPromise();
  await buildModulesProviders().toPromise();
  await Observable.zip(copyFilesCore(), copyFilesProviders()).toPromise();
  await buildUmds().toPromise();
}

buildLibrary()
  .then(() => console.log('success'))
  .catch((e) => console.error(e));
