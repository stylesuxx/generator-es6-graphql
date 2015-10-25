# generator-es6-graphql
[![npm version](https://badge.fury.io/js/generator-es6-graphql.svg)](https://badge.fury.io/js/generator-es6-graphql) [![Build Status](https://secure.travis-ci.org/stylesuxx/generator-es6-graphql.png?branch=master)](https://travis-ci.org/stylesuxx/generator-es6-graphql) [![Dependency Status](https://david-dm.org/stylesuxx/generator-es6-graphql.svg)](https://david-dm.org/stylesuxx/generator-es6-graphql)

With this [yeoman](http://yeoman.io/) generator you can quickly create an [ES6 (ES2105)](http://es6-features.org/) [graphql](https://facebook.github.io/graphql/) enabled server.

## Goal
The goal of this yeoman generator is to enable you to quickly set up an ES6 (ES2105) enabled graphql server without dependencies you do not need.

This means that the choice of for example *database* and *testing framework* is up to you, although some choices are available during setup.

## Installation
Install yo and the generator globally by running:

    sudo npm install -g yo generator-es6-graphql

Create a directory for your new project and run the generator:

    mkdir yourProject
    cd yourProject
    yo es6-graphql

To start your newly generated GraphQL server on port **1234** run:

    npm start

## First steps
If you chose to enable *GraphiQL* you can now browse to your GraphQL endpoint and play around with the *Documentation Explorer* or invoke your own queries:

```
{
  find(id: 1){
    id,
    name
  }
}
```

If you chose to enable authentification and selected at least one OAuth strategy, do not forget to add your API credentials for the chosen services to *src/passportConfig.js*.

## Included dependencies
After running the generator you will have a setup with the following dependencies:

* [babel](https://babeljs.io/)
* [express](http://expressjs.com/)
* [express-graphql](https://github.com/graphql/express-graphql)
* [graphql](https://github.com/graphql/graphql-js)
* [source-map-support](https://github.com/evanw/node-source-map-support)
* [webpack](https://webpack.github.io/)

## Optional dependencies
Depending on your choices during setup the following dependencies may be added:

### Database
* [mongoose](http://mongoosejs.com/)

### Authentication
* [passport](http://passportjs.org/)
* [express-session](https://github.com/expressjs/session)
* [passport-github](https://github.com/jaredhanson/passport-github)
* [passport-google-oauth](https://github.com/jaredhanson/passport-google-oauth)
* [passport-facebook](https://github.com/jaredhanson/passport-facebook)

## Development
This generator is *work in progress*, feel free to submit issues if you have a problem or PR's if you want to contribute.

Tests are in place and may be run by invoking:

    npm run test

### Versioning
The version of the npm package reflects the current master branch. If you want to check out bleeding edge functionality check out the dev branch.
