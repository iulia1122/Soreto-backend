var express = require('express');

/* GET users listing. */
const {Client} = require('pg');
const config = require('../config/config');

var router = express.Router();

const client = new Client(config.pgConnection)

client.connect((err) => {
  if(err) {
    console.log(err);
  } else {
    console.log('Connected to the database.');
  }
})

/* GET home page. */
router.get('/', function(req, res, next) {
  client.query('SELECT * from friends', (err, response) => {
    if (err) {
      console.log(err);
      return ;
    }
    return res.send(response);
  })

});

router.post('/', function(req, res, next) {

  if (Object.keys(req.body).length === 0) {
   return res.send(422, "Please send user data.");
  }

  if(!req.body.name) {
   return res.send(422, "Please provide a name.");
  }

  client.query(
    'INSERT into friends (name, starred) VALUES ($1, false)', [req.body.name], (err, response) => {
      if (err) {
        console.log(err);
        return ;
      }
      return res.send(201);
    }
  )
})

router.post('/star', function(req, res, next) {

  if(!req.body.id) {
    return res.send(422, "Please provide a user id.");
  }

  client.query(
    'UPDATE friends SET starred = $1 where id = $2', [
      req.body.starred,
      req.body.id
    ], (err, response) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.send(200);
    }
  )
})

router.post('/delete', function (req, res, next) {
  if (req.body && Object.keys(req.body).length === 0) {
    return res.send(422, "Please send user data.");
  }

  if (!req.body.id) {
    return res.send(422, "Please provide friend id.");
  }

  client.query(
    'DELETE from friends where id = $1', [req.body.id], (err, response) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.send(200);
    }
  )
})

module.exports = router;
