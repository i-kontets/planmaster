const mysql = require('mysql2');
require('dotenv').config();

// データベース接続プールの作成
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 接続テスト用
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ DB接続失敗:', err.message);
  } else {
    console.log('✅ MySQLへの接続に成功しました！');
    connection.release();
  }
});

module.exports = pool.promise();