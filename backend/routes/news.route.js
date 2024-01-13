const express = require('express');
const newsRoute = express.Router();
// const formidable = require('formidable');
let newsModel = require('../models/news');

newsRoute.route('/').get((req, res, next) => {
    newsModel.find()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            return next(error);
        });
    });

newsRoute.route('/create-news').post((req, res, next) => {
    newsModel.create(req.body)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            next(error); 
        });
});

module.exports = newsRoute;