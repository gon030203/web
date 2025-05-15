const express = require('express');
const cors = require('cors');
const router = express.Router();
const authController = require('../controllers/auth.controller');

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};

router.post('/register', cors(corsOptions), authController.register);
router.post('/login', cors(corsOptions), authController.login);
router.post('/logout', cors(corsOptions), authController.logout);

// **Thêm endpoint kiểm tra session**
router.get('/session', cors(corsOptions), (req, res) => {
  if (req.session && req.session.userId) {
    res.json({ loggedIn: true, email: req.session.email });
  } else {
    res.status(401).json({ loggedIn: false });
  }
});

module.exports = router;
