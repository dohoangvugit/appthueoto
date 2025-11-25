const db = require('../db');

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const sql = `SELECT * FROM users WHERE username=$1 AND password=$2`;
    const result = await db.query(sql, [username, password]);

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(401).json({ error: 'Sai tài khoản hoặc mật khẩu' });
    }
  } catch (err) {
    console.error('Lỗi loginUser:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
