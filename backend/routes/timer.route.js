const express = require('express');
const timerRoute = express.Router();
let timerModel = require('../models/timer');

timerRoute.route('/').get((req, res, next) => {
    timerModel.find()
      .then(data => {
        // แปลงเวลาให้อยู่ใน Timezone ที่ต้องการก่อนส่ง response กลับ
        const convertedData = data.map(item => ({
          ...item._doc,
          startDate: item.startDate.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }),
          endDate: item.endDate.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }),
        }));
        res.json(convertedData);
      })
      .catch(error => {
        return next(error);
      });
});

timerRoute.route('/create-timer').post((req, res, next) => {
    // ตรวจสอบและแปลงเวลาให้อยู่ใน Timezone ที่ต้องการก่อนบันทึกลง MongoDB
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    const timerData = {
      ...req.body,
      startDate,
      endDate,
    };
  
    timerModel.create(timerData)
      .then(data => {
        res.json(data);
      })
      .catch(error => {
        next(error);
      });
  });

timerRoute.route('/update-timer/:id').post(async (req, res, next) => {
  try {
    const timerId = req.params.id;
    const timerDataToUpdate = req.body;

    // อัพเดทค่าในฐานข้อมูลโดยใช้ findByIdAndUpdate
    const updatedTimer = await timerModel.findByIdAndUpdate(timerId, timerDataToUpdate, { new: true });

    res.json(updatedTimer);
  } catch (error) {
    next(error);
  }
});

timerRoute.route('/prepare-timer/:id').get(async (req, res, next) => {
    try {
      const timerId = req.params.id;

      const timerData = await timerModel.findById(timerId);
  
      if (!timerData) {
        return res.status(404).json({ message: 'ไม่พบข้อมูล timer ที่ต้องการ' });
      }

      res.json(timerData);
    } catch (error) {
      next(error);
    }
});

module.exports = timerRoute;