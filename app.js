const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
// app.use(express.static(path(__dirname,'/node_modules/bootstrap/dist/css')));
app.set('views','./src/views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index');
});


// how to listen

app.listen(3000, () => {
  debug(`Sever has started ${chalk.gray('3000')}`);
});
