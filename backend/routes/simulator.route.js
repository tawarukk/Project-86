const express = require('express');
const simulatorRoute = express.Router();
// const formidable = require('formidable');
let simulatorModel = require('../models/simulator');


simulatorRoute.route('/').get((req, res, next) => {
    simulatorModel.find()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            return next(error);
        });
    });

simulatorRoute.route('/create-simulator').post(async (req, res, next) => {
        try {
            const { operator, comment, product_id, position } = req.body;

            let modifiedProductId;

            if (product_id === "Originium") {
                modifiedProductId = "6513151e50115c24bac8258b";
            } else if (product_id === "PureGold") {
                modifiedProductId = "6513171350115c24bac82592";
            } else {
                modifiedProductId = product_id;
            }
    
                const existingSimulator = await simulatorModel.findOne({
                    $and: [
                        { 'operator.operator_save_a': operator[0].operator_save_a },
                        { 'operator.operator_save_b': operator[0].operator_save_b },
                        { 'operator.operator_save_c': operator[0].operator_save_c },
                        { 'product_id': modifiedProductId  }
                    ]
                });
    
                if (existingSimulator) {
                    existingSimulator.comment.push(...comment);
                    existingSimulator.Share_count += 1;
    
                    const updatedSimulator = await existingSimulator.save();
                    res.json(updatedSimulator);
                } else {
                    const newSimulator = await simulatorModel.create({
                        operator,
                        comment,
                        product_id: modifiedProductId,
                        position,
                    });
                    res.json(newSimulator);
                }
            
        } catch (error) {
            next(error);
        }
    });

    

module.exports = simulatorRoute;