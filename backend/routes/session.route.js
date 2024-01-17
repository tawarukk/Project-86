const express = require('express');
const sessionRoute = express.Router();
const sessionModel = require('../models/member');
const jwt = require('jsonwebtoken'); 

sessionRoute.route('/').get((req, res, next) => {
    sessionModel.find()
      .then(data => {
        res.json(data);
      })
      .catch(error => {
        next(error);
      });
});

sessionRoute.route('/login').post(async (req, res, next) => {
    const { name_member, password_member } = req.body;    
    // ตรวจสอบการเข้าสู่ระบบของผู้ใช้ที่มีชื่อผู้ใช้และรหัสผ่านตรงกันในฐานข้อมูล
    sessionModel.findOne({ name_member, password_member })
    .then(user => {
        if (!user) {
        return res.status(401).json({ success: false});
        }
        const token = jwt.sign({ 
          id: user._id,
          name_member: user.name_member,
          email_member: user.email_member,
          code_member: user.code_member,
          img_member: user.img_member,
          tier_member: user.tier_member,
          role_member :user.role_member,
          available_member: user.available_member,
          uploadedAt: user.uploadedAt
        }, 'your_secret_key', {
            expiresIn: '4h' 
        });
        return res.json({ success: true, message: 'เข้าสู่ระบบสำเร็จ', token });
    })
    .catch(error => {
        console.error(error);
        return res.status(500).json({ success: false});
    });

});



module.exports = sessionRoute;
