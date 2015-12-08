'use strict';
var fs = require('fs');
var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var mockery = require('mockery');

describe('generator:app', function () {
  before(function () {
    mockery.enable({warnOnUnregistered: false});
  });

  after(function () {
    mockery.disable();
  });

  describe('defaults', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .withPrompts({
          name: 'temp'
        })
        .on('end', done);
    });

    it('creates files', function () {
      var expected = [
        'package.json',
        '.babelrc',
        '.eslintrc',
        '.travis.yml',
        'README.md',
        '.gitignore',
        'src/server.js',
        'public/.placeholder',
        'tools/lib/copy.js',
        'tools/build.js',
        'tools/bundle.js',
        'tools/clean.js',
        'tools/config.js',
        'tools/copy.js',
        'tools/serve.js',
        'tools/start.js',
        'src/lib/items.js',
        'src/schema/items.js',
        'src/schema/index.js',
        'src/passport.js'
      ];

      assert.file(expected);
    });

    it('fills package.json with correct information', function () {
      assert.fileContent('package.json',  /"name": "temp"/);
    });
  });

  describe('oAuth', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .withPrompts({
          name: 'temp',
          auth: ['passport-facebook', 'passport-github', 'passport-google-oauth']
        })
        .on('end', done);
    });

    it('creates files', function () {
      var expected = [
        'package.json',
        '.babelrc',
        '.eslintrc',
        '.travis.yml',
        'README.md',
        '.gitignore',
        'src/server.js',
        'public/.placeholder',
        'tools/lib/copy.js',
        'tools/build.js',
        'tools/bundle.js',
        'tools/clean.js',
        'tools/config.js',
        'tools/copy.js',
        'tools/serve.js',
        'tools/start.js',
        'src/lib/items.js',
        'src/schema/items.js',
        'src/schema/index.js',
        'src/passport.js',
        'src/passportConfig.js'
      ];

      assert.file(expected);
    });

    it('fills package.json with correct information', function () {
      assert.fileContent('package.json',  /"name": "temp"/);
    });

    it('fills src/passportConfig.js with correct information', function () {
      assert.fileContent('src/passportConfig.js',  /facebook:/);
      assert.fileContent('src/passportConfig.js',  /github:/);
      assert.fileContent('src/passportConfig.js',  /google:/);
    });
  });
});
