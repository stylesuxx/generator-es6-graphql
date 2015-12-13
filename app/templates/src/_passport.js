import passport from 'passport';
<% if (authFull.length > 0) { %>/*import config from './passportConfig'*/<% } %><% authFull.forEach(function(auth){ %>
import passport<%- auth.name %> from '<%- auth.npm %>';<% }); %><%if (auth.length > 0) { %>
<% } %><% if (authLocal) { %>import passportLocal from 'passport-local';
import Users from './lib/users';<% } %>
<% if (auth.indexOf('passport-github') > -1) { %>
const config = require('./config/passport.json');
const GithubStrategy = passportGithub.Strategy;<% } %><% if (auth.indexOf('passport-google-oauth') > -1) { %>
const GoogleStrategy = passportGoogle.OAuth2Strategy;<% } %><% if (auth.indexOf('passport-facebook') > -1) { %>
const FacebookStrategy = passportFacebook.Strategy;<% } %><% if (authLocal) { %>
const LocalStrategy = passportLocal.Strategy;
const users = new Users();<% } %><%if (auth.length > 0 || authLocal) { %>
<% } %>
<% authFull.forEach(function(auth){ %>passport.use(new <%- auth.name %>Strategy(
  {
    clientID: config.<%- auth.slug %>.id,
    clientSecret: config.<%- auth.slug %>.secret,
    callbackURL: config.<%- auth.slug %>.cb
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

<% }); if(authLocal) { %>passport.use(new LocalStrategy(
  function(username, password, done) {
    users.login(username, password, done);
  }
));

<% } %>passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

export default passport;
