const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const PROJECT_PATH = path.resolve(__dirname);
const OUTPUT_PATH = path.resolve(PROJECT_PATH, './build/');
const OUTPUT_NAME = 'index.js';
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// 升级小版本号
const pkgJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const sp = pkgJson.version.split('.');
sp[2] = parseInt(sp[2]) + 1;
pkgJson.version = sp.join('.');
fs.writeFileSync('./package.json', JSON.stringify(pkgJson, null, 2));

const externals = Object.keys(pkgJson.dependencies).reduce((p, c) => {
  p[c] = `commonjs2 ${c}`;
  return p;
}, {});
console.log('using externals', externals);

module.exports = {
  entry: path.resolve(PROJECT_PATH, './src/index.ts'),

  mode: 'production',
  optimization: {
    minimize: true,
  },
  output: {
    filename: OUTPUT_NAME,
    path: path.join(OUTPUT_PATH, 'src'),
  },
  externals, // in order to ignore all modules in node_modules folder
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        include: [path.resolve(PROJECT_PATH, 'src')],
        exclude: [path.resolve(PROJECT_PATH, 'build')],

        options: {},
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.json'],
    symlinks: true,
  },

  performance: {
    hints: false,
  },
  devtool: false,
  // 消除"循环依赖"警告
  plugins: [
    new webpack.ContextReplacementPlugin(/.*/),
    new webpack.IgnorePlugin({
      resourceRegExp: /(mongodb-client-encryption|utf-8-validate|bufferutil|aws4)$/,
    }),
    new webpack.BannerPlugin({
      raw: true,
      entryOnly: true,
      banner: '#!/usr/bin/env node',
    }),

    // 拷贝package.json
    new CopyPlugin({
      patterns: [
        {
          from: './package.json',
          to: path.join(OUTPUT_PATH, 'package.json'),
          transform(content) {
            const { name, version, main, description, bin, license, dependencies } = JSON.parse(content);
            return JSON.stringify({ name, version, main, description, bin, license, dependencies }, 2);
          },
        },
      ],
    }),
    // 拷贝模板
    new CopyPlugin({
      patterns: [
        {
          from: path.join(PROJECT_PATH, '../example'),
          to: path.join(OUTPUT_PATH, 'templates'),
          globOptions: {            
            ignore: [
              // Ignore all files in all subdirectories
              '**/node_modules/**',
              '**/build/**',
              '**/pnpm-lock.yaml',
            ],
          },
        },
      ],
    }),
    // new BundleAnalyzerPlugin(),
  ],
};
