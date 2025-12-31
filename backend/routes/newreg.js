const express = require('express');
const router = express.Router();
const db = require('../db'); // 先ほど作ったdb.jsを読み込む

// POST /register として呼び出される処理
router.post('/', (req, res) => {
  const { username, email, password } = req.body;

  // 重複チェック
  const checkQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkQuery, [email], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'DBエラー' });
    if (results.length > 0) {
      return res.status(400).json({ success: false, message: 'このメールアドレスは既に登録されています' });
    }

    // ユーザー登録
    const insertQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(insertQuery, [username, email, password], (err, result) => {
      if (err) return res.status(500).json({ success: false, message: '登録に失敗しました' });
      res.json({ success: true, message: '登録が完了しました！' });
    });
  });
});

module.exports = router;