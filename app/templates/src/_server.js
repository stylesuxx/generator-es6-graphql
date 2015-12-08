import { ItemSchema } from './schema/itemSchema';
import graphqlHTTP from 'express-graphql';
import express from 'express';
import 'babel-polyfill';
import path from 'path';<% if (database === 'mongoose') { %>
import mongoose from 'mongoose';<% } %><% if (authentication) { %>
import passport from './passport';
import session from 'express-session';<% } if (authLocal) { %>
import bodyParser from 'body-parser';
import validator from 'express-validator';
import User from './models/User';<% } %>

const port = (global.process.env.NODE_ENV == 'develop') ? 1234 : 8080;
const server = global.server = express();<% if (database === 'mongoose') { %>

mongoose.connect('mongodb://localhost/<%= databaseName %>');<% } %>

server.set('port', port);<% if (authLocal) { %>
server.use(bodyParser.urlencoded({ extended: true }));
server.use(validator());
server.use(bodyParser.json());<% } %>
server.use(express.static(path.join(__dirname, 'public')));<% if (authentication) { %>
server.use(passport.initialize());
server.use(passport.session());
server.use(session({
  secret: '<%= secret %>',
  resave: true,
  saveUninitialized: true
}));<% if (auth.indexOf('passport-github') > -1) { %>

server.get('/auth/github', passport.authenticate('github'));
server.get('/auth/github/callback', passport.authenticate('github', {
  successRedirect: '/',
  failureRedirect: '/login'
}));<% }; %><% if (auth.indexOf('passport-google-oauth') > -1) { %>

server.get('/auth/google', passport.authenticate('google', {scope: 'https://www.google.com/m8/feeds'}));
server.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
}));<% }; %><% if (auth.indexOf('passport-facebook') > -1) { %>

server.get('/auth/facebook', passport.authenticate('facebook'));
server.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/login'
}));<% }; %><% } %>

server.use('<%= graphqlroute %>', graphqlHTTP(request => ({
  schema: ItemSchema,
  rootValue: { session: request.session },
  graphiql: <%= graphiql %>
})));
<% if(authLocal) { %>
server.post('/signup', function(req, res) {
  req.assert('username', 'Username is required').notEmpty();
  req.assert('password', 'Password is required').notEmpty();

  var errors = req.validationErrors();
  if(errors) {
    res.status(400).json(errors);
    return;
  }

  var user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save().then((user) => {
    res.status(200).send();
    return;
  }, (err) => {
    res.status(400).json([{msg: 'Username is already taken'}]);
    return;
  });
});

server.post('/login', passport.authenticate('local'), function(req, res) {
  res.sendStatus(200);
});
<% } %>
server.listen(server.get('port'), () => {
  if (process.send) {
    process.send('online');
  } else {
    console.log('The server is running at http://localhost:' + server.get('port'));
  }
});
