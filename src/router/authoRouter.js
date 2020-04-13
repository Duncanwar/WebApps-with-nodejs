const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authoRouter');

const authoRouter = express.Router();

function router() {
  authoRouter.route('/signUp')
    .post((req, res) => {
      debug(req.body);
      res.json(req.body);
    });
  return authoRouter;
}

module.exports = router;
