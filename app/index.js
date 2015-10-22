'use strict';
var generator = require('yeoman-generator');
var chalk = require('chalk');

module.exports = generator.Base.extend({
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

  writing: {
    yorc: function() {
      this.config.save();
    },

    projectfiles: function() {
      this.template('_package.json', 'package.json');
      this.template('eslintrc', '.eslintrc');
      this.template('travis.yml', '.travis.yml');
      this.template('_README.md', 'README.md');
    },

    gitfiles: function() {
      this.copy('gitignore', '.gitignore');
    },

    app: function() {
      this.copy('src/server.js', 'src/server.js');
      this.copy('public/.placeholder', 'public/.placeholder');
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

  install: function() {
    this.npmInstall();
  },

  end: {
    finished: function() {
      this.log(chalk.bold.green('\nGenerator setup finished.'));
      this.log('If you see no errors above, run the server:');
      this.log(chalk.bold.white('npm start'));
    }
  }
});
