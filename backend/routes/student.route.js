const express = require('express');
const studentRoute = express.Router();

//Student model
let StudentModel = require('../models/student');

studentRoute.route('/').get((req, res, next) => {
    StudentModel.find()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            return next(error);
        });
    });

//create
    studentRoute.route('/create-student').post((req, res, next) => {
        StudentModel.create(req.body)
            .then(data => {
                res.json(data);
            })
            .catch(error => {
                next(error);
            });
    });
    
//edit
studentRoute.get('/edit-student/:id', async (req, res, next) => {
    try {
        const student = await StudentModel.findById(req.params.id);
        res.json(student);
    } catch (error) {
        next(error);
    }
});

//update
studentRoute.put('/update-student/:id', async (req, res, next) => {
    try {
        const updatedStudent = await StudentModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body 
            },
            { new: true } // Return the updated document
        );

        res.json(updatedStudent);
        console.log('Successfully updated');
    } catch (error) {
        next(error);
    }
});

//delete
studentRoute.route('/delete-student/:id').delete(async (req, res, next) => {
    try {
        const deletedStudent = await StudentModel.findOneAndDelete({ _id: req.params.id }).exec();

        if (!deletedStudent) {
            res.status(404).json({
                msg: "Student not found"
            });
            return;
        }

        res.status(200).json({
            msg: "Student deleted successfully"
        });
    } catch (error) {
        next(error);
    }
});


module.exports =studentRoute;