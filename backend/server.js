// server.js
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const petRoutes = require('./routes/pet.routes');

const app = express();

// Cấu hình CORS
app.use(cors({
  origin: 'http://localhost:3000', // Chỉ cho phép frontend từ địa chỉ này (thay đổi theo môi trường production)
  credentials: true, // Cho phép gửi cookie/session qua CORS
}));

app.use(express.json());

// Cấu hình session (MemoryStore chỉ dùng cho phát triển; production nên dùng store như Redis, MySQL, v.v.)
app.use(session({
  secret: 'yourSecretKey', // Nên lưu secret dưới biến môi trường trong production
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, // true nếu sử dụng HTTPS
    maxAge: 1000 * 60 * 60 // 1 giờ
  }
}));

// Gán route cho API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/pets', petRoutes);

// Route gốc để test server
app.get('/', (req, res) => {
  res.send('Backend server is running with sessions!');
});

const PORT = process.env.PORT || 3001;

sequelize.sync()
  .then(() => {
    console.log('Database connected successfully!');
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });