/**
 * Adapted from angular2-webpack-starter
 */

 const helpers = require('./helpers');

/**
 * Webpack Plugins
 */
 const webpack = require('webpack');

 const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

 module.exports = {
   devtool: 'inline-source-map',

   resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        use: 'tslint-loader',
        exclude: [helpers.root('node_modules')]
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        use: 'source-map-loader',
        exclude: [
        helpers.root('node_modules/rxjs'),
        helpers.root('node_modules/@angular')
        ]
      },
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        query: {
          compilerOptions: {
            removeComments: true
          }
        },
        exclude: [/\.e2e\.ts$/]
      },
      {
        enforce: 'post',
        test: /\.(js|ts)$/,
        use: 'istanbul-instrumenter-loader',
        include: helpers.root('src'),
        exclude: [
        /\.(e2e|spec)\.ts$/,
        /node_modules/
        ]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'ENV': JSON.stringify(ENV),
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    }),

    new webpack.LoaderOptionsPlugin({
      options: {
        tslintLoader: {
          emitErrors: false,
          failOnHint: false,
          resourcePath: 'src'
        },
        node: {
          global: 'window',
          process: false,
          crypto: 'empty',
          module: false,
          clearImmediate: false,
          setImmediate: false
        }
      }
    })
  ]

};