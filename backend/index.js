const express = require('express');
const cors = require('cors');
const newRegRouter = require('./routes/newreg');
const loginRouter = require('./routes/login');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/register', newRegRouter);
app.use('/login', loginRouter);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`🚀 PlanMaster Backend Server running on http://localhost:${PORT}`);
});