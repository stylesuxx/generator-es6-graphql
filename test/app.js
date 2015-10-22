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
        '.yo-rc.json',
        '.gitignore',
        '.eslintrc',
        '.travis.yml',
        'package.json',
        'README.md',
        'src/server.js',
        'tools/lib/copy.js',
        'tools/build.js',
        'tools/bundle.js',
        'tools/clean.js',
        'tools/config.js',
        'tools/copy.js',
        'tools/serve.js',
        'tools/start.js'
      ];

      assert.file(expected);
    });

    it('fills package.json with correct information', function () {
      assert.fileContent('package.json',  /"name": "temp"/);
    });

    it('setup travis.CI config', function () {
      assert.fileContent(
        '.travis.yml',
        /node_js/
      );
    });
  });
});