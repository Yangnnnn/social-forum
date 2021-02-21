const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cors = require('cors');
// connect to database
connectDB();
app.get('/', (req, res) => res.send('API Running'));
//Middleware
app.use(cors());
app.use(express.json({ extended: false }));
//
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));

app.get('/api/users', (req, res) => {
  res.send('Connected');
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
