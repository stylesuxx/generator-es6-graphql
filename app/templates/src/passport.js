import passport from 'passport';
<% if (authFull.length > 0) { %>import config from './passportConfig'<% } %><% authFull.forEach(function(auth){ %>
import passport<%- auth.name %> from '<%- auth.npm %>';<% }); %><%if (auth.length > 0) { %>
<% } %><% if (auth.indexOf('passport-github') > -1) { %>
const GithubStrategy = passportGithub.Strategy;<% } %><% if (auth.indexOf('passport-google-oauth') > -1) { %>
const GoogleStrategy = passportGoogle.OAuth2Strategy;<% } %><% if (auth.indexOf('passport-facebook') > -1) { %>
const FacebookStrategy = passportFacebook.Strategy;<% } %><% if (auth.indexOf('passport-local') > -1) { %>
const LocalStrategy = passportLocal.Strategy;<% } %><%if (auth.length > 0) { %>
<% } %>
<% authFull.forEach(function(auth){ if(auth.slug !== 'local') {%>passport.use(new <%- auth.name %>Strategy(
  {
    clientID: config.<%- auth.slug %>.id,
    clientSecret: config.<%- auth.slug %>.secret,
    callbackURL: config.<%- auth.slug %>.cb
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

<% } else {%>passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user || !user.validPassword(password)) {
        return done(null, false, { message: 'Username and password do not match.' });
      }
      return done(null, user);
    });
  }
));

<%} }); %>passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

export default passport;
