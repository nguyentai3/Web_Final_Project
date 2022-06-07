import passport from'passport'
import config from '../config/config.json'


passport.use(new FacebookStrategy({
    clientID: config.facebook_api_key,
    clientSecret:config.facebook_api_secret ,
    callbackURL: config.callback_url
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      //Check whether the User exists or not using profile.id
      if(config.use_database) {
         //Further code of Database.
      }
      return done(null, profile);
    });
  }
));

exports = passport