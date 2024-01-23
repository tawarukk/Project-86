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

creatorRoute.put('/update-creator-rec/:id', async (req, res, next) => {
    try {
        const existingCreator = await creatorModel.findById(req.params.id);

        if (existingCreator) {
            // เพิ่มค่า recommend_count ขึ้น 1
            existingCreator.recommend_count += 1;

            // บันทึกการเปลี่ยนแปลง
            const updatedCreator = await existingCreator.save();

            res.json(updatedCreator);
            console.log('Successfully updated');
        } else {
            // ไม่พบผู้สร้าง
            res.status(404).json({ message: 'Creator not found' });
        }
    } catch (error) {
        next(error);
    }
});

creatorRoute.route('/delete-creator/:id').delete(async (req, res, next) => {
    try {
        const deletedcreator = await creatorModel.findOneAndDelete({ _id: req.params.id }).exec();

        if (!deletedcreator) {
            res.status(404).json({
                msg: "creator not found"
            });
            return;
        }

        res.status(200).json({
            msg: "creator deleted successfully"
        });
    } catch (error) {
        next(error);
    }
});

creatorRoute.get('/edit-creator/:id', async (req, res, next) => {
    try {
        const creator = await creatorModel.findById(req.params.id);
        res.json(creator);
    } catch (error) {
        next(error);
    }
});

creatorRoute.put('/update-creator/:id', async (req, res, next) => {
    try {
        const updatedcreator = await creatorModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body 
            },
            { new: true } // Return the updated document
        );

        res.json(updatedcreator);
        console.log('Successfully updated');
    } catch (error) {
        next(error);
    }
});

creatorRoute.put('/update-survey-status/:id', async (req, res, next) => {
    try {
        const existingCreator = await creatorModel.findById(req.params.id);

        if (existingCreator) {
            // Update survey status based on the request body
            existingCreator.survey_con = req.body.survey_con;

            // Save the updated creator
            const updatedCreator = await existingCreator.save();

            res.json(updatedCreator);
            console.log('Survey status updated successfully');
        } else {
            res.status(404).json({ message: 'Creator not found' });
        }
    } catch (error) {
        next(error);
    }
});

creatorRoute.put('/update-available-status/:id', async (req, res, next) => {
    try {
        const existingCreator = await creatorModel.findById(req.params.id);

        if (existingCreator) {
            // Update available status based on the request body
            existingCreator.available_con = req.body.available_con;

            // Save the updated creator
            const updatedCreator = await existingCreator.save();

            res.json(updatedCreator);
            console.log('Available status updated successfully');
        } else {
            res.status(404).json({ message: 'Creator not found' });
        }
    } catch (error) {
        next(error);
    }
});
module.exports = creatorRoute;