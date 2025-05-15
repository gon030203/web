// controllers/pet.controller.js
const Pet = require('../models/pet.model');

exports.getAllPets = async (req, res) => {
  try {
    const pets = await Pet.findAll();
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.getPetById = async (req, res) => {
  try {
    const id = req.params.id;
    const pet = await Pet.findByPk(id);
    if (!pet) return res.status(404).json({ message: "Không tìm thấy thú cưng" });
    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.createPet = async (req, res) => {
  try {
    const { user_id, name, species, breed, age } = req.body;
    if (!user_id || !name) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });
    }
    const pet = await Pet.create({ user_id, name, species, breed, age });
    res.status(201).json({ message: "Thêm thú cưng thành công", pet });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.updatePet = async (req, res) => {
  try {
    const id = req.params.id;
    const pet = await Pet.findByPk(id);
    if (!pet) return res.status(404).json({ message: "Không tìm thấy thú cưng" });
    await pet.update(req.body);
    res.status(200).json({ message: "Cập nhật thú cưng thành công", pet });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

exports.deletePet = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Pet.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: "Không tìm thấy thú cưng" });
    res.status(200).json({ message: "Xoá thú cưng thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};
