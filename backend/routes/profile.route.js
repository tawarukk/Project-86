const express = require('express');
const profileRoute = express.Router();
// const formidable = require('formidable');
let profileModel = require('../models/profile');

profileRoute.route('/').get((req, res, next) => {
    profileModel.find()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            return next(error);
        });
    });

    profileRoute.route('/create-profile').post((req, res, next) => {
        profileModel.create(req.body)
            .then(data => {
                res.json(data);
            })
            .catch(error => {
                next(error); 
            });
    });

module.exports = profileRoute;