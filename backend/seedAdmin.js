// seedAdmin.js
const sequelize = require('./config/db.config');
const User = require('./models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function seedAdmin() {
  try {
    // Kiểm tra xem đã có admin hay chưa
    const admin = await User.findOne({ where: { role: 'admin' } });
    if (admin) {
      console.log('Admin đã tồn tại, không tạo lại.');
      process.exit();
    }

    // Dữ liệu admin có thể lấy từ biến môi trường hoặc secret
    const adminSecret = 'yourAdminSecretKey'; // Ví dụ secret được cung cấp
    // Kiểm tra secret nếu muốn (ở đây chỉ là ví dụ đơn giản)
    if (process.argv[2] !== adminSecret) {
      console.error('Secret không đúng, không thể seed admin.');
      process.exit(1);
    }

    const hashedPassword = await bcrypt.hash('123', saltRounds);
    const newAdmin = await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin'
    });

    console.log(`Seed admin thành công: ${newAdmin.email}`);
    process.exit();
  } catch (error) {
    console.error('Seed admin gặp lỗi:', error);
    process.exit(1);
  }
}

seedAdmin();
