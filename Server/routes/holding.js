const express = require('express');
//const app = express();
const routes = express.Router();
const Holding = require('../models/holding');

routes.route('/add').post((req, res) => {
  let holding = new Holding(req.body);
  holding
    .save()
    .then(holding => {
      res.status(200).json(holding + 'added');
    })
    .catch(err => {
      res.status(400).send('unable to save to database' + err);
    });
});

// Defined get data(index or listing) route
routes.route('/').get((req, res) => {
  Holding.find((err, items) => {
    if (err) {
      console.error(err);
    } else {
      res.json(items);
    }
  });
});

// Defined edit route
routes.route('/edit/:id').get((req, res) => {
  var id = req.params.id;
  Holding.findById(id, (err, holding) => {
    res.json(holding);
  });
});

//  Defined update route
routes.route('/update/:id').post((req, res, next) => {
  Holding.findById(req.params.id, (err, holding) => {
    if (!holding) return next(new Error('Could not load Document'));
    else {
      holding.name = req.body.name;
      holding.price = req.body.price;

      holding
        .save()
        .then(() => {
          res.json('Update complete');
        })
        .catch(() => {
          res.status(400).send('unable to update the database');
        });
    }
  });
});

// Delete holding
routes.route('/delete/:id').get(function(req, res) {
  Holding.findByIdAndRemove({ _id: req.params.id }, err => {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

module.exports = routes;
