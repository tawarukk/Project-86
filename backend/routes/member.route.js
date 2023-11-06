const express = require('express');
const memberRoute = express.Router();
const memberModel = require('../models/member');

memberRoute.route('/').get((req, res, next) => {
  memberModel.find()
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      next(error); // ให้ผ่าน error ไปยัง middleware ของ Express สำหรับการจัดการข้อผิดพลาด
    });
});

memberRoute.route('/create-member').post((req, res, next) => {
  memberModel.create(req.body)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      next(error); // ให้ผ่าน error ไปยัง middleware ของ Express สำหรับการจัดการข้อผิดพลาด
    });
});

memberRoute.get('/check-username/:username', (req, res, next) => {
  const { username } = req.params;
  memberModel.findOne({ name_member: username })
    .then(user => {
      res.json({ isUnique: !user });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'เกิดข้อผิดพลาดในการตรวจสอบชื่อผู้ใช้' });
    });
});

memberRoute.get('/check-email/:email', (req, res, next) => {
  const { email } = req.params;
  memberModel.findOne({ email_member: email })
    .then(user => {
      res.json({ isUnique: !user });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'เกิดข้อผิดพลาดในการตรวจสอบอีเมล' });
    });
});

module.exports = memberRoute;
