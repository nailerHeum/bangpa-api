const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');
const cors = require('cors');


const router = express.Router();
router.use(cors());
router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const { nick, email, password, snsId, job } = req.body;
  console.log(req);
  try {
    const exUser = await User.find({ where: { email } });
    if (exUser) {
      // 이미 가입된 회원일 경우
      res.status(301).json({
        code: 301,
        Location: '/',
        message: 'Already Registered User',
      });
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email: email,
      nick: nick,
      password: hash,
      job: job,
      snsId: snsId,
    });
    res.status(201).json({ 
      code: 201,
      message: 'user created'
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      code: 401,
      message: 'login 작업 실패',
    });
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', { session: false }, (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      res.status(401).json({
        code: 401,
        message: 'login failed',
      })
    }
    return req.login(user, { session: false }, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      const token = jwt.sign({ user }, process.env.JWT_SECRET, {expiresIn: '1d'});
      res.status(200).json({ user, token });
    });
  })(req, res, next);
});
router.get('/logout', passport.authenticate('jwt', {session: false}), (req, res) => {
  req.logout();
  req.session.destroy();
  
  res.status(200).json({
    code: 200,
    Location: '/',
    message: 'logout success',
  });
});

router.get('/kakao', passport.authenticate('kakao'));
router.get('/google', passport.authenticate('google', { scope: 'https://www.google.com/m8/feeds' }));
router.get('/naver', passport.authenticate('naver'));

// authenticate 작업 callback

router.get('/kakao/callback', 
  passport.authenticate('kakao', { failureRedirect: '/login', }),
    (req, res) => {
      res.status(301).json({ 
        code: 301,
        Location: '/' 
      });
  }
);

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login', }),
    (req, res) => {
      res.status(301).json({ 
        code: 301,
        Location: '/' });
    }
);

router.get('/naver/callback',
  passport.authenticate('naver', { failureRedirect: '/login', }),
    (req, res) => {
      res.status(301).json({
        'Location': '/' });
    }
)

module.exports = router;