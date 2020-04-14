const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');

const bookRouter = express.Router();
const debug = require('debug')('app:bookRouter');
const bookController = require('../controllers/bookController');
const bookService = require('../services/goodreadsService');

function router(nav) {
  const { getIndex, getIndexId, middleware } = bookController(bookService, nav);
  bookRouter.use(middleware);
  bookRouter.route('/')
    .get(getIndex);
  // for single route
  bookRouter.route('/:id')
    .get(getIndexId);
  return bookRouter;
}


module.exports = router;
