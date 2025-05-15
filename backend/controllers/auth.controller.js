// controllers/auth.controller.js
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc." });
    }
    
    // Kiểm tra email đã tồn tại
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã được sử dụng." });
    }
    
    // Hash mật khẩu trước khi lưu
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });
    
    res.status(201).json({ message: "Đăng ký thành công", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server." });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Thiếu thông tin đăng nhập." });
    }
    
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Thông tin đăng nhập không chính xác." });
    }
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Thông tin đăng nhập không chính xác." });
    }
    
    // Lưu thông tin phiên sau khi đăng nhập thành công
    req.session.userId = user.id;
    req.session.email = user.email;
    
    res.status(200).json({ message: "Đăng nhập thành công", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server." });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Lỗi khi đăng xuất.' });
    }
    res.clearCookie('connect.sid'); // Cookie mặc định của express-session
    res.status(200).json({ message: 'Đăng xuất thành công' });
  });
};

// auth.controller.js
exports.isAuthenticated = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Vui lòng đăng nhập" });
  }
  next();
};