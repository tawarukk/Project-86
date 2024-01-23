const express = require('express');
const manualRoute = express.Router();
// const formidable = require('formidable');
let manualModel = require('../models/manual-link');

manualRoute.route('/').get((req, res, next) => {
    manualModel.find()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            return next(error);
        });
    });

    manualRoute.route('/create-manual').post((req, res, next) => {
        manualModel.create(req.body)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            next(error); 
        });
});

manualRoute.route('/delete-manual/:id').delete(async (req, res, next) => {
    try {
        const deletedmanual = await manualModel.findOneAndDelete({ _id: req.params.id }).exec();
  
        if (!deletedmanual) {
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
  
  manualRoute.get('/edit-manual/:id', async (req, res, next) => {
    try {
        const manual = await manualModel.findById(req.params.id);
        res.json(manual);
    } catch (error) {
        next(error);
    }
  });
  
  manualRoute.put('/update-manual/:id', async (req, res, next) => {
    try {
        const updatedmanual = await manualModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body 
            },
            { new: true } // Return the updated document
        );
  
        res.json(updatedmanual);
        console.log('Successfully updated');
    } catch (error) {
        next(error);
    }
  });

module.exports = manualRoute;