# generator-es6-graphql
[![npm version](https://badge.fury.io/js/generator-es6-graphql.svg)](https://badge.fury.io/js/generator-es6-graphql) ![Amount of Downloads per month](https://img.shields.io/npm/dm/generator-es6-graphql.svg "Amount of Downloads") [![Build Status](https://secure.travis-ci.org/stylesuxx/generator-es6-graphql.png?branch=master)](https://travis-ci.org/stylesuxx/generator-es6-graphql) [![Dependency Status](https://david-dm.org/stylesuxx/generator-es6-graphql.svg)](https://david-dm.org/stylesuxx/generator-es6-graphql) [![devDependencies Status](https://david-dm.org/stylesuxx/generator-es6-graphql/dev-status.svg)](https://david-dm.org/stylesuxx/generator-es6-graphql?type=dev) ![Node Version](https://img.shields.io/node/v/generator-es6-graphql.svg "Node Version")

> This [yeoman](http://yeoman.io/) generator enables you to quickly create an [ES6 (ES2105)](http://es6-features.org/) [graphql](https://facebook.github.io/graphql/) enabled server with a lot of optional additions.

## Goal
The goal of this yeoman generator is to enable you to quickly set up an ES6 (ES2105) enabled GraphQL server without dependencies you do not need.

This means that the choice of for example *database* and *testing framework* is up to you, although some choices are available during setup to make your life easier:
* *mongoose* as database
* *passport* for authentication
* *local authentication* with basic user model skeleton
* *persistent sessions* if mongoose and authentication are enabled

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
If you chose to enable *GraphiQL* you can now browse to your [GraphQL endpoint](http://localhost:1234/graphql) and play around with the *Documentation Explorer* or invoke your own queries:

```
{
  getItem(id: 1){
    id,
    name
  }
}
```

### Authentication
If you chose to enable authentication and selected at least one OAuth strategy, do not forget to add your API credentials for the chosen services to *src/passportConfig.js*.

#### Local Authentication
If you chose to enable a database and local authentication, you will get a basic *User* model and routes for authentication.

##### User model
The *User* model is very basic and only has the following fields:
* \_id
* username
* password

The Model also provides functionality to check if passwords match and to store passwords encrypted via *bcrypt*.

##### /login (POST)
Parameters:
* username
* password

Returns:
* *200* if user could be logged
* *400* if parameters are missing
* *401* if credentials do not match

##### /logout (GET)
Logs out a user and destroys his session.

#### Usage
Open *GraphiQL* and run:
```
{
  users {_id, username, mail},
  self {_id, username, mail}
}
```

You will see that *users* is an empty array and *self is null*, this is because there are no users signed up yet and you are not logged in.

Sign up a user via mutation:
```
mutation {
  signup(username: "username", password: "password") {
    _id,
    username
  }
}
```

Now login via the route mentioned above and query the *user* and *self* again. The users array still has one user, but now self should contain information about the currently logged in user.

In a similar way you can now set your E-Mail address:
```
mutation {
  updateEmail(mail: "you@domain.com") {
    _id,
    username,
    mail
  }
}
```

If you open the logout route mentioned above and run the commands again, self is null again.

## Development
This generator is *work in progress*, feel free to submit issues if you have a problem or PR's if you want to contribute.

Tests are in place and may be run by invoking:

    npm run test

### Versioning
The version of the npm package reflects the current master branch. If you want to check out bleeding edge functionality check out the dev branch.
