const express = require('express');

const bookRouter = express.Router();

function router(nav) {
  const books = [
    {
      title: 'Duncan History',
      genre: 'History',
      author: 'Lev',
    },
    {
      title: 'Duncan History',
      genre: 'History',
      author: 'Lev ',
    },
    {
      title: 'Duncan History',
      genre: 'History',
      author: 'Lev ',
    },
    {
      title: 'Duncan History',
      genre: 'History',
      author: 'Lev ',
    },
  ];

  bookRouter.route('/')
    .get((req, res) => {
      res.render('bookViewList', {
        nav,
        title: 'Library',
        books,
      });
    });
  // for single route
  bookRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      res.render('bookView', {
        nav,
        title: 'Library',
        book: books[id]
      });
    });
  return bookRouter;
}

module.exports = router;
