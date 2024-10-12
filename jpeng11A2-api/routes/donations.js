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

module.exports = router;
