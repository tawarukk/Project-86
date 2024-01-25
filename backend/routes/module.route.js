const express = require('express');
const moduleRoute = express.Router();
// const formidable = require('formidable');
let moduleModel = require('../models/module');

moduleRoute.route('/').get((req, res, next) => {
    moduleModel.find()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            return next(error);
        });
    });

moduleRoute.route('/create-module').post((req, res, next) => {
    moduleModel.create(req.body)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            next(error); 
        });
});

moduleRoute.route('/delete-module/:id').delete(async (req, res, next) => {
    try {
        const deletedmodule = await moduleModel.findOneAndDelete({ _id: req.params.id }).exec();

        if (!deletedmodule) {
            res.status(404).json({
                msg: "Module not found"
            });
            return;
        }

        res.status(200).json({
            msg: "Module deleted successfully"
        });
    } catch (error) {
        next(error);
    }
});

moduleRoute.get('/edit-module/:id', async (req, res, next) => {
    try {
        const module = await moduleModel.findById(req.params.id);
        res.json(module);
    } catch (error) {
        next(error);
    }
});

moduleRoute.put('/update-module/:id', async (req, res, next) => {
    try {
        const updatedModule = await moduleModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body 
            },
            { new: true } // Return the updated document
        );

        res.json(updatedModule);
        console.log('Successfully updated');
    } catch (error) {
        next(error);
    }
});

moduleRoute.put('/update-available-status/:id', async (req, res, next) => {
    try {
        const existingModule = await moduleModel.findById(req.params.id);

        if (existingModule) {

            existingModule.available_content = req.body.available_content;

            const updatedModule = await existingModule.save();

            res.json(updatedModule);
            console.log('Available status updated successfully');
        } else {
            res.status(404).json({ message: 'Creator not found' });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = moduleRoute;