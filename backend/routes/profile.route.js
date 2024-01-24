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

profileRoute.route('/delete-profile/:id').delete(async (req, res, next) => {
    try {
        const deletedprofile = await profileModel.findOneAndDelete({ _id: req.params.id }).exec();
  
        if (!deletedprofile) {
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
  
  profileRoute.get('/edit-profile/:id', async (req, res, next) => {
    try {
        const profile = await profileModel.findById(req.params.id);
        res.json(profile);
    } catch (error) {
        next(error);
    }
  });
  
  profileRoute.put('/update-profile/:id', async (req, res, next) => {
    try {
        const updatedprofile = await profileModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body 
            },
            { new: true } // Return the updated document
        );
  
        res.json(updatedprofile);
        console.log('Successfully updated');
    } catch (error) {
        next(error);
    }
  });

  profileRoute.put('/update-available-status/:id', async (req, res, next) => {
    try {
        const existingProfile = await profileModel.findById(req.params.id);

        if (existingProfile) {
            // Update available status based on the request body
            existingProfile.available_con = req.body.available_con;

            // Save the updated creator
            const updatedProfile = await existingProfile.save();

            res.json(updatedProfile);
            console.log('Available status updated successfully');
        } else {
            res.status(404).json({ message: 'Profile not found' });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = profileRoute;