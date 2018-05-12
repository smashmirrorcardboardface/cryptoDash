const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./config'),
  port = process.env.PORT || 4000,
  holdingRoutes = require('./routes/holding');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB).then(
  () => {
    console.info('Database is connected');
  },
  err => {
    console.info('Can not connect to the database' + err);
  }
);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

app.use('/holding', holdingRoutes);

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the Server' });
});
app.listen(port, () => {
  console.info(`API listening on port ${port}`);
});
