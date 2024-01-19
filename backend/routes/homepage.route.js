const express = require('express');
const homepageRoute = express.Router();
// const formidable = require('formidable');
let homepageModel = require('../models/homepage');

homepageRoute.route('/').get((req, res, next) => {
    homepageModel.find()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            return next(error);
        });
    });

    homepageRoute.route('/create-homepage').post((req, res, next) => {
        homepageModel.create(req.body)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            next(error); 
        });
});

homepageRoute.route('/delete-homepage/:id').delete(async (req, res, next) => {
    try {
        const deletedhomepage = await homepageModel.findOneAndDelete({ _id: req.params.id }).exec();
  
        if (!deletedhomepage) {
            res.status(404).json({
                msg: "Member not found"
            });
            return;
        }
  
        res.status(200).json({
            msg: "Member deleted successfully"
        });
    } catch (error) {
        next(error);
    }
  });
  
  homepageRoute.get('/edit-homepage/:id', async (req, res, next) => {
    try {
        const homepage = await homepageModel.findById(req.params.id);
        res.json(homepage);
    } catch (error) {
        next(error);
    }
  });
  
  homepageRoute.put('/update-homepage/:id', async (req, res, next) => {
    try {
        const updatedhomepage = await homepageModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body 
            },
            { new: true } // Return the updated document
        );
  
        res.json(updatedhomepage);
        console.log('Successfully updated');
    } catch (error) {
        next(error);
    }
  });

module.exports = homepageRoute;