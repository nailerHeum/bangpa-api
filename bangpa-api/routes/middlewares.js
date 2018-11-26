const jwt = require('jsonwebtoken');

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({
      code: 403,
      message: '로그인이 필요합니다.', 
    });
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');      // 뭐로 바꾸징
  }
};

exports.verifyToken = (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    if (error.name == 'TokenExpiredError') {
      return res.status(419).json({
        code: 419,
        message: 'Token Expired',
      });
    }
    return res.status(401).json({
      code: 401,
      message: 'Invalid Token',
    });
  }
};

// 향후 버전 업데이트 시
exports.deprecated = (req, res) => {
  res.status(410).json({
    code: 410,
    message: 'New version available. Please user new version',
  })
};