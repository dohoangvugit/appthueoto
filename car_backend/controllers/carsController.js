const db = require('../db');

exports.getAllCars = async (req, res) => {
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
    console.error('Lỗi getAllCars:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
