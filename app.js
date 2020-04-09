const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(morgan('tiny'));

// serving static files

app.use(express.static(path.join(__dirname, '/public/')));
// app.use(express.static(path(__dirname,'/node_modules/bootstrap/dist/css')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/', '/index.html'));
});


// how to listen

app.listen(3000, () => {
  debug(`Sever has started ${chalk.gray('3000')}`);
});
