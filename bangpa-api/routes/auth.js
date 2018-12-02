const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const { email, nick, password } = req.body;
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
      email,
      nick,
      password: hash,
    });
    res.status(301).json({ 
      code: 301,
      Location: '/',
      message: 'user created'
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
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
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      res.status(301).json({ 
        code: 301,
        Location: '/',
        message: 'session created'
      });
    });
  })(req, res, next);
});
router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  // redirect
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