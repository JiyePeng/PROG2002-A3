var express = require('express');
var router = express.Router();
var crowdfunding_db = require('../crowdfunding_db')

var connection = crowdfunding_db.getconnection();

/* GET fundraisers listing. */
router.get('/', function(req, res, next) {
  let query = 'SELECT * FROM FUNDRAISER JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID  WHERE `ACTIVE` = TRUE'

  const values = [];

  if (req.query.ORGANIZER) {
    query += ' AND FUNDRAISER.ORGANIZER LIKE ?';
    values.push(`%${req.query.ORGANIZER}%`);
  }

  if (req.query.CITY) {
    query += ' AND FUNDRAISER.CITY LIKE ?';
    values.push(`%${req.query.CITY}%`);
  }

  if (req.query.CATEGORY_ID) {
    query += ' AND FUNDRAISER.CATEGORY_ID = ?';
    values.push(req.query.CATEGORY_ID);
  }

  connection.query(
    query,
    values,
    function (err, results, fields) {
      if (err) {
        console.log(err);
      } else {
        res.json(results); // results contains rows returned by server
      }
    }
  );
});

/* GET fundraisers by ID. */
router.get('/:id', function(req, res, next) {
  const id = req.params.id;

  connection.query(
    'SELECT * FROM FUNDRAISER JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID  WHERE `ACTIVE` = TRUE AND FUNDRAISER_ID = ?',
    [id],
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
