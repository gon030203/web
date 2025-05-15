// controllers/user.controller.js
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "Không tìm thấy user" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    // Nếu có giá trị password mới thì hash lại
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    }
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "Không tìm thấy user" });
    
    await user.update(req.body);
    res.status(200).json({ message: "Cập nhật thành công", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await User.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: "Không tìm thấy user" });
    res.status(200).json({ message: "Xoá user thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || 'owner'
    });
    res.status(201).json({ message: "Tạo user mới thành công", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
