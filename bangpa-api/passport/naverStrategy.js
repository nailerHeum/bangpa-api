var NaverStrategy = require('passport-naver').Strategy;

module.exports = (passport) => {
  passport.use(new NaverStrategy({
    clientID: process.env.NAVER_CLIENT_ID,
    clientSecret: process.env.NAVER_CLIENT_SECRET,
    callbackURL: 'http://localhost:2018/auth/naver/callback',
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({
        'naver.id': profile.id
    }, function(err, user) {
        if (!user) {
            user = new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                username: profile.displayName,
                provider: 'naver',
                naver: profile._json
            });
            user.save(function(err) {
                if (err) console.log(err);
                return done(err, user);
            });
        } else {
            return done(err, user);
        }
    });
  }
  ));
};