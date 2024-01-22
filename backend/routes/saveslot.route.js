const express = require('express');
const saveSlotRoute = express.Router();
// const formidable = require('formidable');
let saveSlotModel = require('../models/saveslot');

saveSlotRoute.route('/').get((req, res, next) => {
    saveSlotModel.find()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            return next(error);
        });
    });

saveSlotRoute.route('/create-saveSlot').post((req, res, next) => {
    saveSlotModel.create(req.body)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            next(error); 
        });
});

saveSlotRoute.route('/delete-saveSlot/:id').delete(async (req, res, next) => {
    try {
        const deletedsaveSlot = await saveSlotModel.findOneAndDelete({ _id: req.params.id }).exec();
  
        if (!deletedsaveSlot) {
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
  
saveSlotRoute.get('/edit-saveSlot/:id', async (req, res, next) => {
    try {
        const saveSlot = await saveSlotModel.findById(req.params.id);
        res.json(saveSlot);
    } catch (error) {
        next(error);
    }
});

saveSlotRoute.put('/update-saveSlot/:id', async (req, res, next) => {
    try {
        const updatedsaveSlot = await saveSlotModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body 
            },
            { new: true } // Return the updated document
        );
  
        res.json(updatedsaveSlot);
        console.log('Successfully updated');
    } catch (error) {
        next(error);
    }
  });

module.exports = saveSlotRoute;