import passport from 'passport';
<% if (authFull.length > 0) { %>import config from './passportConfig'<% } %>
<% authFull.forEach(function(auth){ %>import passport<%- auth.name %> from '<%- auth.npm %>';
<% }); %>
<% authFull.forEach(function(auth){ %>const <%- auth.name %>Strategy = passport<%- auth.name %>.Strategy;
<% }); %>
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
<% }); %>
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

export default passport;
