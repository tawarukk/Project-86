const express = require('express');
const productRoute = express.Router();

let productModel = require('../models/product');

productRoute.route('/').get((req, res, next) => {
    productModel.find()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            return next(error);
        });
    });

productRoute.route('/create-product').post((req, res, next) => {
    productModel.create(req.body)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            next(error); 
        });
});

productRoute.route('/delete-product/:id').delete(async (req, res, next) => {
    try {
        const deletedStudent = await productModel.findOneAndDelete({ _id: req.params.id }).exec();

        if (!deletedStudent) {
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

productRoute.get('/edit-product/:id', async (req, res, next) => {
    try {
        const product = await productModel.findById(req.params.id);
        res.json(product);
    } catch (error) {
        next(error);
    }
});

productRoute.put('/update-product/:id', async (req, res, next) => {
    try {
        const updatedproduct = await productModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body 
            },
            { new: true } // Return the updated document
        );

        res.json(updatedproduct);
        console.log('Successfully updated');
    } catch (error) {
        next(error);
    }
});

productRoute.put('/update-available-status/:id', async (req, res, next) => {
    try {
        const existingProduct = await productModel.findById(req.params.id);

        if (existingProduct) {

            existingProduct.available_content = req.body.available_content;

            const updatedProduct = await existingProduct.save();

            res.json(updatedProduct);
            console.log('Available status updated successfully');
        } else {
            res.status(404).json({ message: 'Creator not found' });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = productRoute;