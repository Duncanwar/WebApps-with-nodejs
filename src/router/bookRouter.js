const express = require('express');

const bookRouter = express.Router();

const sql = require('mssql');
// const debug = require('debug')('app:bookRouter');

function router(nav) {
  //

  bookRouter.route('/')
    .get((req, res) => {
      (async function query() {
        const request = new sql.Request();
        const result = await request.query('select * from books');
        res.render('bookViewList', {
          nav,
          title: 'Library',
          books: result.recordset,
        });
      }());
    });


  // for single route
  bookRouter.route('/:id')
    .all((req, res, next) => {
      (async function query() {
        const { id } = req.params;
        const request = new sql.Request();
        const { recordset } = await request.input('id', sql.Int, id)
          .query('select * from books where id= @id');
        [req.book] = recordset;
        next();
      }());
    })
    .get((req, res) => {
      res.render('bookView', {
        nav,
        title: 'Library',
        book: req.book
      });
    });

  return bookRouter;
}

module.exports = router;
