const express = require('express');
const operatorRoute = express.Router();
//Operator
let operatorModel = require('../models/operator');

operatorRoute.route('/').get((req, res, next) => {
    operatorModel.find()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            return next(error);
        });
    });

operatorRoute.route('/create-operator').post((req, res, next) => {
    operatorModel.create(req.body)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            next(error); 
        });
});    

operatorRoute.route('/delete-operator/:id').delete(async (req, res, next) => {
    try {
        const deletedoperator = await operatorModel.findOneAndDelete({ _id: req.params.id }).exec();

        if (!deletedoperator ) {
            res.status(404).json({
                msg: "operator  not found"
            });
            return;
        }

        res.status(200).json({
            msg: "operator  deleted successfully"
        });
    } catch (error) {
        next(error);
    }
});

operatorRoute.get('/edit-operator/:id', async (req, res, next) => {
    try {
        const module = await operatorModel.findById(req.params.id);
        res.json(module);
    } catch (error) {
        next(error);
    }
});

operatorRoute.put('/update-operator/:id', async (req, res, next) => {
    try {
        const updatedoperator = await operatorModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body 
            },
            { new: true } // Return the updated document
        );

        res.json(updatedoperator);
        console.log('Successfully updated');
    } catch (error) {
        next(error);
    }
});
module.exports = operatorRoute;