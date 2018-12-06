const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const google = require('./googleStrategy');
const naver = require('./naverStrategy');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const { User } = require('../models');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.find({ where: { id } })
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : process.env.JWT_SECRET,
  },
  function (jwtPayload, done) {

      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      return User.findOneById(jwtPayload.id)
          .then(user => {
              return done(null, user);
          })
          .catch(err => {
              return done(err);
          });
  }
  ));

  local(passport);
  kakao(passport);
  google(passport);
  naver(passport);
};