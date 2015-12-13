import { Schema } from './schema';
import graphqlHTTP from 'express-graphql';
import express from 'express';
import 'babel-polyfill';
import path from 'path';<% if (database === 'mongoose') { %>
import mongoose from 'mongoose';<% } %><% if (authentication) { %>
import passport from './passport';
import session from 'express-session';<% } if (authLocal) { %>
import bodyParser from 'body-parser';
import User from './models/User';<% } %>

const config = require('./config/main.json');
const port = (!global.process.env.PORT) ? 1234 : global.process.env.PORT;
const server = global.server = express();<% if (database === 'mongoose') { %>

mongoose.connect(config.mongoDB);<% } %>

server.set('port', port);
server.use(express.static(path.join(__dirname, 'public')));<% if (authLocal) { %>
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());<% } %><% if (authentication) { %>
server.use(passport.initialize());
server.use(passport.session());
server.use(session({
  secret: config.sessionSecret,
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
  schema: Schema,
  rootValue: { session: request.session },
  graphiql: <%= graphiql %>
})));
<% if(authLocal) { %>
server.post('/login', passport.authenticate('local'), function(req, res) {
  res.sendStatus(200);
});

server.get('/logout', function(req, res) {
  req.logout();
  req.session.destroy();
  res.sendStatus(200);
});
<% } %>
server.listen(server.get('port'), () => {
  console.log('The server is running at http://localhost:' + server.get('port'));
});
