// server.js
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const db = require('./db');


const app = express();
app.use(cors());
app.use(express.json());


// API danh sách xe
app.get('/cars', async (req, res) => {
  try {
    const sql = `
      SELECT c.id, c.model, cb.name AS brand,
             s.seats, c.price_per_day, ca.address
      FROM cars c
      JOIN car_brands cb ON cb.id = c.car_brand_id
      JOIN seats s ON s.id = c.seats_id
      JOIN car_addresses ca ON ca.id = c.car_address_id
      ORDER BY c.id;
    `;
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err) {
    console.error('Lỗi /cars:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// API đăng nhập
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await db.query(
      'SELECT * FROM users WHERE username=$1 AND password=$2',
      [username, password]
    );
    if (result.rows.length > 0) res.json(result.rows[0]);
    else res.status(401).json({ error: 'Sai tài khoản hoặc mật khẩu' });
  } catch (err) {
    console.error('Lỗi /login:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server chạy tại http://localhost:${PORT}`));
