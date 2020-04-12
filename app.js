const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const sql = require('mssql');


const app = express();
const port = process.env.PORT || 3001;

const config = {
  user: 'Duncan',
  password: 'Warrior0819!',
  server: 'pslibraries.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
  database: 'PsLibrary',

  options: {
    encrypt: true
  }
};

sql.connect(config).catch((err) => debug(err));

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));
// app.use(express.static(path(__dirname,'/node_modules/bootstrap/dist/css')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [{ link: '/books', title: 'Books' },
  { link: '/authors', title: 'Authors' }];

const bookRouter = require('./src/router/bookRouter')(nav);


app.use('/books', bookRouter);

app.get('/', (req, res) => {
  res.render('index', {
    nav: [{ link: '/books', title: 'Books' },
      { link: '/authors', title: 'Authors' }],
    title: 'Library',
  });
});


// how to listen

app.listen(port, () => {
  debug(`Sever has started ${chalk.gray('3000')}`);
});
