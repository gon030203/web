// middleware/auth.middleware.js
module.exports = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Bạn chưa đăng nhập!' });
  }
  next();
};
