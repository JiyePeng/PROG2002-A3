var express = require('express');
var router = express.Router();
var crowdfunding_db = require('../crowdfunding_db')

var connection = crowdfunding_db.getconnection();

/* GET donations by fundraiser ID. */
router.get('/:fundraiserid', function(req, res, next) {
  const fundraiserid = req.params.fundraiserid;

  connection.query(
    'SELECT * FROM DONATION  WHERE AND FUNDRAISER_ID = ?',
    [fundraiserid],
    function (err, results, fields) {
      if (err) {
        console.log(err);
      } else {
        res.json(results); // results contains rows returned by server
      }
    }
  );
});

/* Create a donation. */
router.post('/', function(req, res, next) {
  const amount = req.body.amount;
  const giver = req.body.giver;
  const fundraiserid = req.body.fundraiserid;

  if (!amount) {
    res.status(400).send({ error: "amount needed!" })
    return
  }

  if (amount < 5) {
    res.status(400).send({ error: "amount should over 5 aud!" })
    return
  }

  if (!giver) {
    res.status(400).send({ error: "giver needed!" })
    return
  }

  if (!fundraiserid) {
    res.status(400).send({ error: "fundraiserid needed!" })
    return
  }

  connection.query(
    'INSERT INTO DONATION(DATE, AMOUNT, GIVER, FUNDRAISER_ID) VALUES(?,?,?,?)',
    [new Date(),amount,giver,fundraiserid],
    function (err, results, fields) {
      if (err) {
        console.log(err);
      } else {
        res.json(results); // results contains rows returned by server
      }
    }
  );
});

module.exports = router;
