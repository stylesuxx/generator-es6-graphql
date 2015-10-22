# generator-es6-graphql

[![Build Status](https://secure.travis-ci.org/stylesuxx/generator-es6-graphql.png?branch=master)](https://travis-ci.org/stylesuxx/generator-es6-graphql) [![Dependency Status](https://david-dm.org/stylesuxx/generator-es6-graphql.svg)](https://david-dm.org/stylesuxx/generator-es6-graphql)

With this [yeoman](http://yeoman.io/) generator you can quickly create an [ES6 (ES2105)](http://es6-features.org/) [graphql](https://facebook.github.io/graphql/) enabled server.

## Goal
The goal of this yeoman generator is to enable you to quickly set up an ES6(ES2105) enabled graphql server without dependencies you do not need.

This means that the choice of for example *database* and *testing framework* is up to you.

## Installation
Install yo and the generator globally by running:

    sudo npm install -g yo generator-es6-graphql

Create a directory for your new project and run the generator:

    mkdir yourProject
    cd yourProject
    yo es6-graphql

To start your newly generated GraphQL server on port **1234** run:

    npm start

## Included dependencies
After running the generator you will have a setup with the following dependencies:

* babel
* express
* express-graphql
* graphql
* source-map-support
* webpack

## Development
This generator is a work in progress, feel free to submit issues for new features or PR's if you add something you want to share.

Tests are in place and may be run by invoking:

    npm run test
