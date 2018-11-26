var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var { User } = require('../models');

module.exports = (passport) => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8018/auth/google/callback",
    passReqToCallback   : true
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const exUser = await User.find({where: { snsId: profile.id, provider: 'google' } });
      if (exUser) {
        done(null, exUser);
      } else {
        const newUser = await User.create({
          email: profile.emails.value,        // 이메일 
          nick: profile.nickname,             // 닉네임
          snsId: profile.id,                  // id 존재하나?
          provider: 'google',                 // google
        });
        done(null, newUser);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }
  ));
};