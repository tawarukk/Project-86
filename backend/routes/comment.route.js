const express = require('express');
const commentRoute = express.Router();
// const formidable = require('formidable');
let commentModel = require('../models/comment');

commentRoute.route('/').get((req, res, next) => {
    commentModel.find()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            return next(error);
        });
    });

    commentRoute.route('/create-comment').post((req, res, next) => {
        commentModel.create(req.body)
            .then(data => {
                res.json(data);
            })
            .catch(error => {
                next(error); 
            });
    });

module.exports = commentRoute;