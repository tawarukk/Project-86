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

memberRoute.route('/:id').get((req, res, next) => {
  const memberId = req.params.id;

  memberModel.findById(memberId)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      next(error);
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
    });
});

memberRoute.put('/update-profile-member/:id', async (req, res, next) => {
  try {
    // ค้นหาสมาชิกโดยใช้ ID
    const existingMember = await memberModel.findById(req.params.id);

    if (existingMember) {
      // อัปเดตฟิลด์ img_member ด้วยค่าจาก request body
      existingMember.img_member = req.body.profile_img;

      // บันทึกสมาชิกที่ได้รับการอัปเดตลงในฐานข้อมูล
      const updatedMember = await existingMember.save();

      // ส่งข้อมูลสมาชิกที่อัปเดตเป็นตอบกลับ
      res.json(updatedMember);
    } else {
      // ไม่พบสมาชิก
      res.status(404).json({ message: 'ไม่พบสมาชิก' });
    }
  } catch (error) {
    // จัดการข้อผิดพลาด
    next(error);
  }
});

memberRoute.route('/delete-member/:id').delete(async (req, res, next) => {
  try {
      const deletedmember = await memberModel.findOneAndDelete({ _id: req.params.id }).exec();

      if (!deletedmember) {
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

memberRoute.get('/edit-member/:id', async (req, res, next) => {
  try {
      const member = await memberModel.findById(req.params.id);
      res.json(member);
  } catch (error) {
      next(error);
  }
});

memberRoute.put('/update-member/:id', async (req, res, next) => {
  try {
      const updatedmember = await memberModel.findByIdAndUpdate(
          req.params.id,
          {
              $set: req.body 
          },
          { new: true } // Return the updated document
      );

      res.json(updatedmember);
      console.log('Successfully updated');
  } catch (error) {
      next(error);
  }
});

memberRoute.put('/update-available-status/:id', async (req, res, next) => {
  try {
      const existingMember = await memberModel.findById(req.params.id);

      if (existingMember) {

          existingMember.available_member = req.body.available_member;

          const updatedMember = await existingMember.save();

          res.json(updatedMember);
          console.log('Available status updated successfully');
      } else {
          res.status(404).json({ message: 'Creator not found' });
      }
  } catch (error) {
      next(error);
  }
});

module.exports = memberRoute;
