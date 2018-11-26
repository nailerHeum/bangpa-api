const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/profile', isLoggedIn, (req, res) => {
  res.json(req.user);
}); // 프로필 페이지에서 유저 정보 넘기기 유저와 관련된 스터디 그룹 정보도 넘겨야하지 않을까

router.get('/join', isNotLoggedIn, (req, res) => {
  res.json(req.user);
}); //미심쩍은 부분

router.get('/', (req, res, next) => {
  res.json(req.user);
});

module.exports = router;