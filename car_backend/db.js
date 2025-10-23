//db.js
const { Pool } = require('pg');

const db = new Pool({
  user: 'postgres',      
  password: 'emiuemiu',    
  host: 'localhost',     
  port: 5432,            
  database: 'car_db1'    
});

module.exports = db;