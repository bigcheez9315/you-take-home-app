const express = require('express');
// const dotenv = require('dotenv');

// dotenv.config();

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('You take-home app welcome page!');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});