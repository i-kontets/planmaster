const express = require('express');
const router = express.Router();
const db = require('../db'); // 共通のDB接続を読み込む

// POST /login として呼び出される処理
router.post('/', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('❌ ログイン時DBエラー:', err);
      return res.status(500).json({ success: false, message: 'サーバーエラーが発生しました' });
    }

    if (results.length > 0) {
      // ログイン成功
      res.json({
        success: true,
        message: 'ログイン成功',
        token: 'dummy-token-' + Date.now(), // 後のステップで本物のJWTに変更可能です
        username: results[0].username
      });
    } else {
      // 認証失敗
      res.status(401).json({
        success: false,
        message: 'メールアドレスまたはパスワードが正しくありません'
      });
    }
  });
});

module.exports = router;