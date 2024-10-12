var express = require('express');
var router = express.Router();
var crowdfunding_db = require('../crowdfunding_db')

var connection = crowdfunding_db.getconnection();

/* GET fundraisers listing. */
router.get('/', function(req, res, next) {
  let query = 'SELECT * FROM FUNDRAISER JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID  WHERE `ACTIVE` IS NOT NULL'

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

  if (!req.query.ACTIVE) {
    query += ' AND FUNDRAISER.ACTIVE = ?';
    values.push(true);
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

/* Create a fundraiser. */
router.post('/', function(req, res, next) {
  const organizer = req.body.organizer;
  const caption = req.body.caption;
  const target_funding = req.body.target_funding;
  const current_funding = req.body.current_funding;
  const city = req.body.city;
  const active = req.body.active;
  const category_id = req.body.category_id;

  if (!organizer) {
    res.status(400).send({ error: "organizer needed!" })
    return
  }

  if (!caption) {
    res.status(400).send({ error: "caption needed!" })
    return
  }

  if (!target_funding) {
    res.status(400).send({ error: "target_funding needed!" })
    return
  }

  if (!current_funding) {
    res.status(400).send({ error: "current_funding needed!" })
    return
  }

  if (!city) {
    res.status(400).send({ error: "city needed!" })
    return
  }

  if (active == null) {
    res.status(400).send({ error: "active needed!" })
    return
  }

  if (!category_id) {
    res.status(400).send({ error: "category_id needed!" })
    return
  }

  connection.query(
    'INSERT INTO FUNDRAISER(ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, ACTIVE, CATEGORY_ID) VALUES(?,?,?,?,?,?,?)',
    [organizer,caption,target_funding,current_funding,city,active,category_id],
    function (err, results, fields) {
      if (err) {
        console.log(err);
      } else {
        res.json(results); // results contains rows returned by server
      }
    }
  );
});

/* Update a fundraiser. */
router.put('/:id', function(req, res, next) {
  const id = req.params.id;

  const organizer = req.body.organizer;
  const caption = req.body.caption;
  const target_funding = req.body.target_funding;
  const current_funding = req.body.current_funding;
  const city = req.body.city;
  const active = req.body.active;
  const category_id = req.body.category_id;

  if (!organizer) {
    res.status(400).send({ error: "organizer needed!" })
    return
  }

  if (!caption) {
    res.status(400).send({ error: "caption needed!" })
    return
  }

  if (!target_funding) {
    res.status(400).send({ error: "target_funding needed!" })
    return
  }

  if (!current_funding) {
    res.status(400).send({ error: "current_funding needed!" })
    return
  }

  if (!city) {
    res.status(400).send({ error: "city needed!" })
    return
  }

  if (active == null) {
    res.status(400).send({ error: "active needed!" })
    return
  }

  if (!category_id) {
    res.status(400).send({ error: "category_id needed!" })
    return
  }

  connection.query(
    'UPDATE FUNDRAISER SET ORGANIZER = ?, CAPTION = ?, TARGET_FUNDING = ?, CURRENT_FUNDING = ?, CITY = ?, ACTIVE = ?, CATEGORY_ID = ? WHERE FUNDRAISER_ID = ?',
    [organizer,caption,target_funding,current_funding,city,active,category_id,id],
    function (err, results, fields) {
      if (err) {
        console.log(err);
      } else {
        res.json(results); // results contains rows returned by server
      }
    }
  );
});

/* Delete a fundraiser. */
router.delete('/:id', function(req, res, next) {
  const id = req.params.id;

  connection.query(
    'DELETE FROM FUNDRAISER WHERE FUNDRAISER_ID = ?',
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
