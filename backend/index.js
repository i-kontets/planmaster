const express = require('express');
const cors = require('cors');
const db = require('./db'); // 先ほど作ったdb.jsを読み込む

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// 疎通確認用のルート
app.get('/test', async (req, res) => {
  try {
    // DBに現在の時刻を聞いてみるだけの簡単なクエリ
    const [rows] = await db.query('SELECT NOW() as now');
    res.json({ message: 'Backend is running!', dbTime: rows[0].now });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});