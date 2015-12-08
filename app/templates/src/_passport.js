import passport from 'passport';
<% if (authFull.length > 0) { %>import config from './passportConfig'<% } %><% authFull.forEach(function(auth){ %>
import passport<%- auth.name %> from '<%- auth.npm %>';<% }); %><%if (auth.length > 0) { %>
<% } %><% if (authLocal) { %>import passportLocal from 'passport-local';
import User from './models/User'<% } %>
<% if (auth.indexOf('passport-github') > -1) { %>
const GithubStrategy = passportGithub.Strategy;<% } %><% if (auth.indexOf('passport-google-oauth') > -1) { %>
const GoogleStrategy = passportGoogle.OAuth2Strategy;<% } %><% if (auth.indexOf('passport-facebook') > -1) { %>
const FacebookStrategy = passportFacebook.Strategy;<% } %><% if (authLocal) { %>
const LocalStrategy = passportLocal.Strategy;<% } %><%if (auth.length > 0 || authLocal) { %>
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
    var user = {};
    var findUser = User.findOne({ username: username }).exec();
    findUser.then((data) => {
      user = data;
      return user.validPassword(password);
    }).then(()=> {
      var data = {
        _id: user._id,
        username: user.username
      };

      return done(null, data);
    }, (err)=> {
      return done(null, false, { message: 'Username and password do not match.' });
    });
  }
));

<% } %>passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

export default passport;
