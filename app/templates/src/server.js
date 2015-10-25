import { ItemSchema } from './schema/itemSchema';
import graphqlHTTP from 'express-graphql';
import express from 'express';
import 'babel/polyfill';
import path from 'path';<% if (database === 'mongoose') { %>
import mongoose from 'mongoose';<% } %><% if (authentication) { %>
import passport from './passport';
import session from 'express-session';<% } %>

const port = (global.process.env.NODE_ENV == 'develop') ? 1234 : 8080;
const server = global.server = express();<% if (database === 'mongoose') { %>

mongoose.connect('mongodb://localhost/<%= databaseName %>');<% } %>

server.set('port', port);
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
server.use('<%= graphqlroute %>', graphqlHTTP({schema: ItemSchema, graphiql: <%= graphiql %>}));

server.listen(server.get('port'), () => {
  if (process.send) {
    process.send('online');
  } else {
    console.log('The server is running at http://localhost:' + server.get('port'));
  }
});
