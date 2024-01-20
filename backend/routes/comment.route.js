const express = require('express');
const commentRoute = express.Router();
// const formidable = require('formidable');
let commentModel = require('../models/comment');

commentRoute.route('/').get((req, res, next) => {
    commentModel.find()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            return next(error);
        });
    });

commentRoute.route('/create-comment').post((req, res, next) => {
        commentModel.create(req.body)
            .then(data => {
                res.json(data);
            })
            .catch(error => {
                next(error); 
            });
    });

commentRoute.route('/delete-comment/:id').delete(async (req, res, next) => {
        try {
            const deletedcomment = await commentModel.findOneAndDelete({ _id: req.params.id }).exec();
      
            if (!deletedcomment) {
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
      
commentRoute.get('/edit-comment/:id', async (req, res, next) => {
        try {
            const comment = await commentModel.findById(req.params.id);
            res.json(comment);
        } catch (error) {
            next(error);
        }
      });
      
commentRoute.put('/update-comment/:id', async (req, res, next) => {
        try {
            const updatedcomment = await commentModel.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body 
                },
                { new: true } // Return the updated document
            );
      
            res.json(updatedcomment);
            console.log('Successfully updated');
        } catch (error) {
            next(error);
        }
      });

module.exports = commentRoute;