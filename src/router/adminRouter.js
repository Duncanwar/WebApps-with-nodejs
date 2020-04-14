const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRouter');

const adminRouter = express.Router();

const books = [
  {
    title: 'IOT',
    author: 'Lev',
    bookId: 656
  },
  {
    title: 'Data',
    author: 'Thomas',
    bookId: 24280
  },
  {
    title: 'Embedded',
    author: 'Kevin'
  }
];

function router() {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';
      // asynchroneous function for db connection
      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);

          const response = await db.collection('books').insertMany(books);
          res.json(response);
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    //    res.send('Hello Admin');
    });
  return adminRouter;
}

module.exports = router;
