const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'library' }));

require('./src/config/passport.js')(app);

app.use(express.static(path.join(__dirname, '/public')));
// app.use(express.static(path(__dirname,'/node_modules/bootstrap/dist/css')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [{ link: '/books', title: 'Books' },
  { link: '/authors', title: 'Authors' }];

const bookRouter = require('./src/router/bookRouter')(nav);
const adminRouter = require('./src/router/adminRouter')(nav);
const authoRouter = require('./src/router/authoRouter')(nav);

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authoRouter);

app.get('/', (req, res) => {
  res.render('index', {
    nav: [{ link: '/books', title: 'Books' },
      { link: '/authors', title: 'Authors' }],
    title: 'Library',
  });
});

app.listen(port, () => {
  debug(`Sever has started ${chalk.gray('3000')}`);
  console.log('bb');
});
