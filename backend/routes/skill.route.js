const express = require('express');
const skillRoute = express.Router();
//skill
let skillModel = require('../models/skill');

skillRoute.route('/').get((req, res, next) => {
    skillModel.find()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            return next(error);
        });
    });

skillRoute.route('/create-skill').post((req, res, next) => {
    skillModel.create(req.body)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            next(error); 
        });
});

skillRoute.route('/delete-skill/:id').delete(async (req, res, next) => {
    try {
        const deletedskill = await skillModel.findOneAndDelete({ _id: req.params.id }).exec();

        if (!deletedskill) {
            res.status(404).json({
                msg: "Skill not found"
            });
            return;
        }

        res.status(200).json({
            msg: "Skill deleted successfully"
        });
    } catch (error) {
        next(error);
    }
});

skillRoute.get('/edit-skill/:id', async (req, res, next) => {
    try {
        const skill = await skillModel.findById(req.params.id);
        res.json(skill);
    } catch (error) {
        next(error);
    }
});

skillRoute.put('/update-skill/:id', async (req, res, next) => {
    try {
        const updatedskill = await skillModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body 
            },
            { new: true } // Return the updated document
        );

        res.json(updatedskill);
        console.log('Successfully updated');
    } catch (error) {
        next(error);
    }
});

skillRoute.put('/update-available-status/:id', async (req, res, next) => {
    try {
        const existingSkill = await skillModel.findById(req.params.id);

        if (existingSkill) {

            existingSkill.available_content = req.body.available_content;

            const updatedSkill = await existingSkill.save();

            res.json(updatedSkill);
            console.log('Available status updated successfully');
        } else {
            res.status(404).json({ message: 'Creator not found' });
        }
    } catch (error) {
        next(error);
    }
});
module.exports = skillRoute;