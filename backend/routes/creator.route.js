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

module.exports = creatorRoute;