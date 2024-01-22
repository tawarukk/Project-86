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
            const { operator, comment, product_id, position , Name_product , Time_Remaining } = req.body;

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
                        Name_product,
                        Time_Remaining,
                        position,
                    });
                    res.json(newSimulator);
                }
            
        } catch (error) {
            next(error);
        }
    });

simulatorRoute.put('/update-view/:id', async (req, res, next) => {
        try {
            const updatedsimulator = await simulatorModel.findByIdAndUpdate(
                req.params.id,
                {
                    $inc: { view_count: 1 }, // ใช้ $inc เพื่อเพิ่มค่า view_count ขึ้น 1
                },
                { new: true } // Return the updated document
            );
    
            res.json(updatedsimulator);
        } catch (error) {
            next(error);
        }
    });

    simulatorRoute.put('/update-rate/:id', async (req, res, next) => {
        try {
            const simulatorId = req.params.id;
            const rateToAdd = req.body.rate; // รับค่า rate ที่ส่งมาจาก request body
    
            // อัปเดตค่า Rate_count และ Rate
            const updatedSimulator = await simulatorModel.findByIdAndUpdate(
                simulatorId,
                {
                    $inc: { Rate_count: 1, Rate: rateToAdd },
                },
                { new: true }
            );

            const rateCalculated = (updatedSimulator.Rate || 0) / (updatedSimulator.Rate_count || 1);

        // อัปเดตค่า Rate_cal
        const updatedSimulatorWithRateCal = await simulatorModel.findByIdAndUpdate(
            simulatorId,
            {
                $set: { Rate_cal: rateCalculated },
            },
            { new: true }
        );

        res.json(updatedSimulatorWithRateCal);
        } catch (error) {
            next(error);
        }
    });
    
    

simulatorRoute.get('/edit-simulator/:id', async (req, res, next) => {
        try {
            const simulator = await simulatorModel.findById(req.params.id);
            res.json(simulator);
        } catch (error) {
            next(error);
        }
    });

    simulatorRoute.route('/delete-comment/:simulatorId/:commentId').delete(async (req, res, next) => {
        try {
            const simulatorId = req.params.simulatorId;
            const commentId= req.params.commentId;
    
            const simulator = await simulatorModel.findById(simulatorId);
    
            if (!simulator) {
                return res.status(404).json({ message: 'simulator not found' });
            }
    
            const indexToDelete = simulator.comment.findIndex(p => p._id == commentId);
    
            if (indexToDelete === -1) {
                return res.status(404).json({ message: 'comment not found' });
            }
    
            simulator.comment.splice(indexToDelete, 1);
    
            // Save the changes
            await simulator.save();
    
            res.status(200).json({ message: 'comment deleted successfully', simulator });
        } catch (error) {
            next(error);
        }
    });

module.exports = simulatorRoute;