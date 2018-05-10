import express from 'express';

const portfolioRoutes = express.Router();

import Portfolio from './portfolio';

// get all portfolios in the db

portfolioRoutes.route('/all').get((req, res, next) => {
  Portfolio.find((err, portfolios) => {
    if (err) {
      return next(new Error(err));
    }

    res.json(portfolios); // return all portfolios
  });
});

// create a portfolio item
portfolioRoutes.route('/add').post((req, res) => {
  Portfolio.create(
    {
      name: req.body.name,
      done: false
    },
    (error, portfolio) => {
      if (error) {
        res.status(400).send('Unable to create portfolio item');
      }
      res.status(200).json(portfolio);
    }
  );
});

// delete a portfolio item

portfolioRoutes.route('/delete/:id').get((req, res, next) => {
  const id = req.params.id;
  Portfolio.findByIdAndRemove(id, err => {
    if (err) {
      return next(new Error('portfolio was not found'));
    }
    res.json('Successfully removed');
  });
});

// perform update on portfolio item

portfolioRoutes.route('/update/:id').post((req, res, next) => {
  const id = req.params.id;
  Portfolio.findById(id, (error, portfolio) => {
    if (error) {
      return next(new Error('portfolio was not found'));
    } else {
      portfolio.name = req.body.name;
      portfolio.done = req.body.done;

      portfolio.save({
        function(error, portfolio) {
          if (error) {
            res.status(400).send('Unable to update portfolio');
          } else {
            res.status(200).json(portfolio);
          }
        }
      });
    }
  });
});

export default portfolioRoutes;
