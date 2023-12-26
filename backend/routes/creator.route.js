const express = require('express');
const creatorRoute = express.Router();
// const formidable = require('formidable');
let creatorModel = require('../models/creator');

creatorRoute.route('/').get((req, res, next) => {
    creatorModel.find()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            return next(error);
        });
    });

creatorRoute.route('/create-creator').post((req, res, next) => {
    creatorModel.create(req.body)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            next(error); 
        });
});

module.exports = creatorRoute;