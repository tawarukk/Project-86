const express = require('express');
const newsRoute = express.Router();
// const formidable = require('formidable');
let newsModel = require('../models/news');

newsRoute.route('/').get((req, res, next) => {
    newsModel.find()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            return next(error);
        });
    });

newsRoute.route('/create-news').post((req, res, next) => {
    newsModel.create(req.body)
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            next(error); 
        });
});

newsRoute.get('/edit-news/:id', async (req, res, next) => {
    try {
        const module = await newsModel.findById(req.params.id);
        res.json(module);
    } catch (error) {
        next(error);
    }
});

newsRoute.route('/delete-news/:id').delete(async (req, res, next) => {
    try {
        const deletedmodule = await newsModel.findOneAndDelete({ _id: req.params.id }).exec();

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

newsRoute.put('/update-news/:id', async (req, res, next) => {
    try {
        const updatedModule = await newsModel.findByIdAndUpdate(
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

newsRoute.get('/paragraphs/:id', async (req, res, next) => {
    try {
        const news = await newsModel.findById(req.params.id);
        res.json(news);
    } catch (error) {
        next(error);
    }
});

newsRoute.post('/paragraphs-add/:id', async (req, res, ) => {
        try {
        const newsId = req.params.id;
        const newParagraphsData = req.body.paragraphs || [];
    
        // ตรวจสอบว่า newParagraphsData เป็นอาร์เรย์หรือไม่
        if (!Array.isArray(newParagraphsData)) {
            return res.status(400).json({ message: 'Invalid paragraphs data format' });
        }
    
        // ค้นหา News ด้วย ID
        const news = await newsModel.findById(newsId);
    
        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }
    
        // สร้าง index ใหม่และเพิ่มข้อมูล paragraphs ใหม่
        const newIndex = news.paragraphs.length + 1;
        const newParagraph = {
            heading: newParagraphsData[0].heading,
            image: newParagraphsData[0].image,
            content: newParagraphsData[0].content,
            status: newParagraphsData[0].status,
        };
    
        news.paragraphs.push({ index: newIndex, ...newParagraph });
    
        // บันทึกการเปลี่ยนแปลง
        await news.save();
    
        res.status(200).json({ message: 'Paragraph added successfully', news });
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
        }
});

newsRoute.route('/delete-paragraphs/:newsId/:paragraphId').delete(async (req, res, next) => {
    try {
        const newsId = req.params.newsId;
        const paragraphId = req.params.paragraphId;

        const news = await newsModel.findById(newsId);

        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }

        const indexToDelete = news.paragraphs.findIndex(p => p._id == paragraphId);

        if (indexToDelete === -1) {
            return res.status(404).json({ message: 'Paragraph not found' });
        }

        news.paragraphs.splice(indexToDelete, 1);

        // Save the changes
        await news.save();

        res.status(200).json({ message: 'Paragraph deleted successfully', news });
    } catch (error) {
        next(error);
    }
});

newsRoute.route('/edit-paragraphs/:id/:ParagraphsID').get(async (req, res, next) => {
    try {
        const newsId = req.params.id;
        const paragraphId = req.params.ParagraphsID;

        const news = await newsModel.findById(newsId);

        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }

        const paragraph = news.paragraphs.find(p => p._id == paragraphId);

        if (!paragraph) {
            return res.status(404).json({ message: 'Paragraph not found' });
        }

        res.status(200).json(paragraph);
    } catch (error) {
        next(error);
    }
});

newsRoute.put('/update-paragraphs/:id/:ParagraphsID', async (req, res, next) => {
    try {
        const newsId = req.params.id;
        const paragraphId = req.params.ParagraphsID;

        const news = await newsModel.findById(newsId);

        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }

        const indexToUpdate = news.paragraphs.findIndex(p => p._id == paragraphId);

        if (indexToUpdate === -1) {
            return res.status(404).json({ message: 'Paragraph not found' });
        }

        // อัปเดตข้อมูล paragraphs
        news.paragraphs[indexToUpdate].heading = req.body.paragraphs.heading;
        news.paragraphs[indexToUpdate].image = req.body.paragraphs.image;
        news.paragraphs[indexToUpdate].content = req.body.paragraphs.content;

        // บันทึกการเปลี่ยนแปลง
        await news.save();

        res.status(200).json({ message: 'Paragraph updated successfully', news });
    } catch (error) {
        next(error);
    }
});

newsRoute.put('/update-view/:id', async (req, res, next) => {
    try {
        const updatedNews = await newsModel.findByIdAndUpdate(
            req.params.id,
            {
                $inc: { view_count: 1 }, // ใช้ $inc เพื่อเพิ่มค่า view_count ขึ้น 1
            },
            { new: true } // Return the updated document
        );

        res.json(updatedNews);
    } catch (error) {
        next(error);
    }
});

newsRoute.put('/update-available-status/:id', async (req, res, next) => {
    try {
        const existingNews = await newsModel.findById(req.params.id);

        if (existingNews) {
            // Update available status based on the request body
            existingNews.available_con = req.body.available_con;

            // Save the updated creator
            const updatedNews = await existingNews.save();

            res.json(updatedNews);
            console.log('Available status updated successfully');
        } else {
            res.status(404).json({ message: 'News not found' });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = newsRoute;