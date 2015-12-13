'use strict';
var fs = require('fs');
var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var mockery = require('mockery');

var runAll = function(it) {
  it('fills package.json with correct information', function () {
    assert.fileContent('package.json',  /"name": "temp"/);
  });

  it('fills src/config/main.json with correct information', function () {
    assert.fileContent('src/config/main.json',  /"sessionSecret": ".*"/);
  });
}

var defaultFiles = function(it) {
  it('creates default files', function () {
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
      'src/config/main.json',
      'src/lib/items.js',
      'src/schema/items.js',
      'src/schema/index.js',
      'src/passport.js'
    ];

    assert.file(expected);
  });
}

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

    defaultFiles(it);
    runAll(it);
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

    defaultFiles(it);
    runAll(it);

    it('creates passport related files', function () {
      var expected = [
        'src/passport.js',
        'src/config/passport.json'
      ];

      assert.file(expected);
    });

    it('fills src/config/passport.json with correct information', function () {
      assert.fileContent('src/config/passport.json',  /"facebook":/);
      assert.fileContent('src/config/passport.json',  /"github":/);
      assert.fileContent('src/config/passport.json',  /"google":/);
    });
  });

  describe('local', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .withPrompts({
          name: 'temp',
          database: 'mongoose',
          authLocal: true
        })
        .on('end', done);
    });

    defaultFiles(it);
    runAll(it);

    it('creates passport related files', function () {
      var expected = [
        'src/passport.js'
      ];

      assert.file(expected);
    });
  });

  describe('oAuth & local', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .withPrompts({
          name: 'temp',
          database: 'mongoose',
          authLocal: true,
          auth: ['passport-facebook', 'passport-github', 'passport-google-oauth']
        })
        .on('end', done);
    });

    defaultFiles(it);
    runAll(it);

    it('creates passport related files', function () {
      var expected = [
        'src/passport.js',
        'src/config/passport.json'
      ];

      assert.file(expected);
    });

    it('fills src/config/passport.json with correct information', function () {
      assert.fileContent('src/config/passport.json',  /"facebook":/);
      assert.fileContent('src/config/passport.json',  /"github":/);
      assert.fileContent('src/config/passport.json',  /"google":/);
    });
  });
});
