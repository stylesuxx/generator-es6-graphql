'use strict';
var generator = require('yeoman-generator');
var chalk = require('chalk');
var crypto = require('crypto');

module.exports = generator.Base.extend({
  initializing: function() {
    this.auth = [];
    this.authLocal = false;
  },

  prompting: {
    appname: function() {
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

    graphqlroute: function() {
      var done = this.async();
      this.prompt({
        type: 'input',
        name: 'graphqlroute',
        message: 'Route to the GraphQL endpoint',
        default: '/graphql'
      }, function(answers) {
        this.graphqlroute = answers.graphqlroute;
        if(this.graphqlroute[0] != '/') {
          this.graphqlroute = '/' + this.graphqlroute;
        }

        done();
      }.bind(this));
    },

    graphiql: function() {
      var done = this.async();
      this.prompt({
        type: 'confirm',
        name: 'graphiql',
        message: 'Enable GraphiQL',
        default: true
      }, function(answers) {
        this.graphiql = answers.graphiql;

        done();
      }.bind(this));
    },

    database: function() {
      var done = this.async();
      this.prompt({
        type: 'list',
        name: 'database',
        message: 'Choose database',
        choices: [
          {name: 'None', value: 'none'},
          {name: 'Mongoose', value: 'mongoose'}
        ],
        default: 0
      }, function(answers) {
        this.database = answers.database;

        if(this.database != 'none') {
          this.prompt({
            type: 'input',
            name: 'name',
            message: 'Database name',
            default: this.appname
          }, function(answers) {
            this.databaseName = answers.name;

            done();
          }.bind(this));
        }
        else {
          done();
        }
      }.bind(this));
    },

    passport: function() {
      var done = this.async();
      this.prompt({
        type: 'confirm',
        name: 'authentication',
        message: 'Enable passport for authentication',
        default: true
      }, function(answers) {
        this.authentication = answers.authentication;

        done();
      }.bind(this));
    },

    local: function() {
      var done = this.async();
      if(this.authentication && this.database !== 'none') {
        this.prompt({
          type: 'confirm',
          name: 'authLocal',
          message: 'Enable local authentication strategy',
          default: true
        }, function(answers) {
          this.authLocal = answers.authLocal;

          done();
        }.bind(this));
      }
      else {
        done();
      }
    },

    strategies: function() {
      var done = this.async();
      if(this.authentication) {
        this.authFull = [];

        var choices = [
          { name: 'Facebook', value: 'passport-facebook', slug: 'facebook' },
          { name: 'Github', value: 'passport-github', slug: 'github' },
          { name: 'Google', value: 'passport-google-oauth', slug: 'google' },
          //{name: 'Twitter', value: 'passport-twitter'}
        ];

        this.prompt({
          type: 'checkbox',
          name: 'auth',
          message: 'Choose OAuth strategies',
          choices: choices,
          default: []
        }, function(answers) {
          this.auth = answers.auth;

          choices.map(function(item) {
            if(this.auth.indexOf(item.value) > -1) {
              this.authFull.push({
                npm: item.value,
                name: item.name,
                slug: item.slug
              });
            }
          }.bind(this));

          done();
        }.bind(this));
      }
      else {
        done();
      }
    },

    secret: function() {
      var done = this.async();
      if(this.authentication) {
        this.prompt({
          type: 'input',
          name: 'secret',
          message: 'Session secret',
          default: crypto.randomBytes(16).toString('hex')
        }, function(answers) {
          this.secret = answers.secret;

          done();
        }.bind(this));
      }
      else {
        done();
      }
    },

    /*
    store: function() {
      var done = this.async();
      if(this.authentication) {
        this.prompt({
          type: 'list',
          name: 'store',
          message: 'Choose a session store',
          choices: [
            {name: 'Memory', value: 'memory'},
            //{name: 'Mongoose', value: 'mongoose'}
          ],
          default: 0
        }, function(answers) {
          this.store = answers.store;

          if(this.store === 'mongoose') {
            this.database = 'mongoose';
          }

          done();
        }.bind(this));
      }
      else {
        done();
      }
    }
    */
  },

  writing: {
    yorc: function() {
      this.config.save();
    },

    projectfiles: function() {
      this.copy('.babelrc', '.babelrc');
      this.copy('.eslintrc', '.eslintrc');
      this.copy('.travis.yml', '.travis.yml');
      this.template('_package.json', 'package.json');
      this.template('_README.md', 'README.md');
    },

    gitfiles: function() {
      this.copy('gitignore', '.gitignore');
    },

    app: function() {
      this.template('src/_server.js', 'src/server.js');
      this.template('src/config/_main.json', 'src/config/main.json');
      this.copy('public/.placeholder', 'public/.placeholder');
    },

    tools: function() {
      this.copy('tools/lib/copy.js', 'tools/lib/copy.js');
      this.copy('tools/lib/watch.js', 'tools/lib/watch.js');
      this.copy('tools/build.js', 'tools/build.js');
      this.copy('tools/bundle.js', 'tools/bundle.js');
      this.copy('tools/clean.js', 'tools/clean.js');
      this.copy('tools/config.js', 'tools/config.js');
      this.copy('tools/copy.js', 'tools/copy.js');
      this.copy('tools/serve.js', 'tools/serve.js');
      this.copy('tools/start.js', 'tools/start.js');
    },

    lib: function() {
      this.copy('src/lib/items.js', 'src/lib/items.js');
      if(this.authLocal) {
        this.copy('src/lib/users.js', 'src/lib/users.js');
      }
    },

    schema: function() {
      this.copy('src/schema/items.js', 'src/schema/items.js');
      this.template('src/schema/_index.js', 'src/schema/index.js');
      if(this.authLocal) {
        this.copy('src/schema/users.js', 'src/schema/users.js');
      }
    },

    models: function() {
      if(this.database === 'mongoose') {
        this.copy('src/models/.placeholder', 'src/models/.placeholder');
      }

      if(this.authLocal) {
        this.copy('src/models/User.js', 'src/models/User.js');
      }
    },

    authentication: function() {
      if(this.authentication) {
        this.template('src/_passport.js', 'src/passport.js');

        if(this.auth.length > 0) {
          this.template('src/config/_passport.json', 'src/config/passport.json');
        }
      }
    }
  },

  install: function() {
    this.npmInstall([
      'babel',
      'express',
      'express-graphql',
      'graphql',
      'source-map-support',
      'webpack'
    ], {'save': true});

    this.npmInstall([
      'babel-core',
      'babel-polyfill',
      'babel-cli',
      'babel-eslint',
      'babel-loader',
      'babel-preset-es2015',
      'babel-preset-stage-1',
      'del',
      'eslint',
      'gaze',
      'json-loader',
      'lodash',
      'mkdirp',
      'ncp',
      'path',
      'replace',
    ], {'saveDev': true});

    if(this.database === 'mongoose') {
      this.npmInstall(['mongoose'], {'save': true});
    }

    if(this.session === 'mongoose') {
      this.npmInstall(['connect-mongoose'], {'save': true});
    }

    if(this.authentication) {
      this.npmInstall(['passport', 'express-session'], {'save': true});
      this.npmInstall(this.auth, {'save': true});
    }

    if(this.authLocal) {
      this.npmInstall([
        'passport-local',
        'body-parser',
        'bcrypt',
        'graphql-custom-types'
      ], {'save': true});
    }
  },

  end: {
    finished: function() {
      this.log(chalk.bold.green('\nGenerator setup finished.'));
      if(this.auth.length > 0) {
        this.log(chalk.bold.white('Do not forget to add your API credentials to src/config/passport.json'));
      }
      this.log('If you see no errors above, run the server:');
      this.log(chalk.bold.white('npm start'));
    }
  }
});
