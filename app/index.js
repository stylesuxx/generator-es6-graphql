'use strict';
var generator = require('yeoman-generator');

module.exports = generator.Base.extend({
  /*
  initializing: function() {
    this.log('initializing just ran');
  },
  */

  prompting: function() {
    var done = this.async();
    this.prompt({
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: this.appname
    }, function(answers) {
      this.appname = answers.name;

      done();
    }.bind(this));
  },

  /*
  configuring: function() {
    this.log('configuring just ran');
  },

  default: function() {
    this.log('default just ran');
  },
  */

  writing: {
    projectfiles: function() {
      /*
      this.template('_travis.yml', '.travis.yml');
      */
      this.template('_package.json', 'package.json');
      this.template('eslintrc', '.eslintrc');
      this.template('README.md');
    },

    gitfiles: function() {
      this.copy('gitignore', '.gitignore');
    },

    app: function() {
      this.copy('src/server.js', 'src/server.js');
    },

    tools: function() {
      this.copy('tools/lib/copy.js', 'tools/lib/copy.js');
      this.copy('tools/build.js', 'tools/build.js');
      this.copy('tools/bundle.js', 'tools/bundle.js');
      this.copy('tools/clean.js', 'tools/clean.js');
      this.copy('tools/config.js', 'tools/config.js');
      this.copy('tools/copy.js', 'tools/copy.js');
      this.copy('tools/serve.js', 'tools/serve.js');
      this.copy('tools/start.js', 'tools/start.js');
    }
  },

  /*
  conflicts: function() {
    this.log('conflicts just ran');
  },
  */

  install: function() {
    this.npmInstall();
  },

  /*
  end: function() {
    this.log('end just ran');
  }
  */
});
