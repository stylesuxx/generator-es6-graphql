import { ItemSchema } from './schema/itemSchema';
import graphqlHTTP from 'express-graphql';
import express from 'express';
import 'babel/polyfill';
import path from 'path';

<% if (database === 'mongoose') { %>import mongoose from 'mongoose';<% } %>
<% if (authentication) { %>import passport from './passport';
import session from 'express-session';<% } %>

const port = (global.process.env.NODE_ENV == 'develop') ? 1234 : 8080;
const server = global.server = express();

<% if (database === 'mongoose') { %>mongoose.connect('mongodb://localhost/<%= appname %>');<% } %>

server.set('port', port);
server.use(express.static(path.join(__dirname, 'public')));
<% if (authentication) { %>
server.use(passport.initialize());
server.use(passport.session());
server.use(session({
  secret: '<%= secret %>',
  resave: true,
  saveUninitialized: true
}));
<% } %>
<% authFull.forEach(function(auth) { %>server.get('/auth/<%= auth.slug %>', passport.authenticate('<%= auth.slug %>'));
server.get('/auth/<%= auth.slug %>/callback', passport.authenticate('<%= auth.slug %>', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

<% }); %>server.use('<%= graphqlroute %>', graphqlHTTP({schema: ItemSchema, graphiql: <%= graphiql %>}));

server.listen(server.get('port'), () => {
  if (process.send) {
    process.send('online');
  } else {
    console.log('The server is running at http://localhost:' + server.get('port'));
  }
});
