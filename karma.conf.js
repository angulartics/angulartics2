// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-mocha-reporter'),
      require('@angular/cli/plugins/karma'),
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: 'coverage/',
      reports: ['text-summary', 'json', 'html'],
      fixWebpackSourcePaths: true,
    },
    angularCli: {
      environment: 'dev',
    },
    reporters: ['mocha', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeCI'],
    singleRun: false,
    customLaunchers: {
      ChromeCI: {
        base: `${process.env['TRAVIS'] ? 'ChromeHeadless' : 'Chrome'}`,
        flags: ['--no-sandbox']
      }
    },
  });
};
