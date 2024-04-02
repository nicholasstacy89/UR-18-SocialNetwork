const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const port = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(port, () => {
    console.log(`Social Network Server is running on port : ${port}!`);
  });
});
