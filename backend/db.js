const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3308,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'planmaster_db'
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL接続失敗:', err);
    return;
  }
  console.log('✅ MySQL接続成功 (Shared)');
});

module.exports = db;