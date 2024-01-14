const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const database = require('./database');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const fileUpload = require('express-fileupload');
const path = require('path');


//controllers
const indexController = require('./controllers/indexControllers')

mongoose.Promise = global.Promise;
mongoose.connect(database.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected successfully');
}, error => {
    console.log('Cannot connect to database ' + error);
});

//const operatorAPI = require('../backend/routes/student.route');
const operatorAPI = require('./routes/operator.route');
const moduleAPI = require('./routes/module.route');
const skillAPI = require('./routes/skill.route');
const productAPI = require('./routes/product.route');
const memberAPI = require('./routes/member.route');
const creatorAPI = require('./routes/creator.route');
const newsAPI = require('./routes/news.route')
const sessionAPI = require('./routes/session.route');

const app = express();

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended : true }))
app.use(flash())
app.set('view engine','ejs')

app.get('/',indexController);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cors());

app.use('/api_operator', operatorAPI);
app.use('/api_module', moduleAPI);
app.use('/api_skill',skillAPI);
app.use('/api_product',productAPI);
app.use('/api_member',memberAPI);
app.use('/api_session',sessionAPI);
app.use('/api_creator',creatorAPI);
app.use('/api_news',newsAPI);

app.get('/favicon.ico', (req, res) => {
    res.status(204); // สถานะ No Content
});

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port);
});

app.use(function(err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});

app.get('/api/server-time', (request, response) => {
    let now = new Date();
    let time = {
        hour: now.getHours(),
        minute: now.getMinutes(),
        second: now.getSeconds()
    };
    response.json(time);
});

app.use(fileUpload());

app.post('/api_module/create-module-img', (req, res) => {
const file = req.files.img_cart_mod;

if (!file) {
    res.status(400).json({ error: 'ไม่พบไฟล์ที่อัพโหลด' });
    return;
}

if (file.size > 500 * 1024) {
    res.status(400).json({ error: 'ขนาดไฟล์ต้องไม่เกิน 500 KB' });
    return;
}

const newPath = path.join(__dirname, '../src/assets/images/Module', file.name);

file.mv(newPath, (error) => {
    if (error) {
        res.status(500).json({ error: 'เกิดข้อผิดพลาดในการบันทึกไฟล์' });
    } else {
        res.json({ message: 'อัพโหลดไฟล์รูปภาพสำเร็จ' });
    }
});
});

app.post('/api_product/create-product-img', (req, res) => {
    const file = req.files.img_portrait_product;
    
    if (!file) {
        res.status(400).json({ error: 'ไม่พบไฟล์ที่อัพโหลด' });
        return;
    }
    
      if (file.size > 500 * 1024) {
        res.status(400).json({ error: 'ขนาดไฟล์ต้องไม่เกิน 500 KB' });
        return;
    }
    
    const newPath = path.join(__dirname, '../src/assets/images/product', file.name);
    
    file.mv(newPath, (error) => {
        if (error) {
            res.status(500).json({ error: 'เกิดข้อผิดพลาดในการบันทึกไฟล์' });
        } else {
            res.json({ message: 'อัพโหลดไฟล์รูปภาพสำเร็จ' });
        }
    });
});

app.post('/api_operator/create-card-img', (req, res) => {
    const file = req.files.img_cart_oper;
    
    if (!file) {
        res.status(400).json({ error: 'ไม่พบไฟล์ที่อัพโหลด' });
        return;
    }
    
      if (file.size > 500 * 1024) {
        res.status(400).json({ error: 'ขนาดไฟล์ต้องไม่เกิน 500 KB' });
        return;
    }
    
    const newPath = path.join(__dirname, '../src/assets/images/Card', file.name);
    
    file.mv(newPath, (error) => {
        if (error) {
            res.status(500).json({ error: 'เกิดข้อผิดพลาดในการบันทึกไฟล์' });
        } else {
            res.json({ message: 'อัพโหลดไฟล์รูปภาพสำเร็จ' });
        }
    });
});

app.post('/api_operator/create-portrait-img', (req, res) => {
    const file = req.files.img_portrait_oper;
    
    if (!file) {
        res.status(400).json({ error: 'ไม่พบไฟล์ที่อัพโหลด' });
        return;
    }
    
      if (file.size > 500 * 1024) {
        res.status(400).json({ error: 'ขนาดไฟล์ต้องไม่เกิน 500 KB' });
        return;
    }
    
    const newPath = path.join(__dirname, '../src/assets/images/portrait', file.name);
    
    file.mv(newPath, (error) => {
        if (error) {
            res.status(500).json({ error: 'เกิดข้อผิดพลาดในการบันทึกไฟล์' });
        } else {
            res.json({ message: 'อัพโหลดไฟล์รูปภาพสำเร็จ' });
        }
    });
});

app.post('/api_creator/create-creator-img', (req, res) => {
    const file = req.files.img_card_con;
    
    if (!file) {
        res.status(400).json({ error: 'ไม่พบไฟล์ที่อัพโหลด' });
        return;
    }
    
      if (file.size > 3000 * 1024) {
        res.status(400).json({ error: 'ขนาดไฟล์ต้องไม่เกิน 3000 KB' });
        return;
    }
    
    const newPath = path.join(__dirname, '../src/assets/images/Creator', file.name);
    
    file.mv(newPath, (error) => {
        if (error) {
            res.status(500).json({ error: 'เกิดข้อผิดพลาดในการบันทึกไฟล์' });
        } else {
            res.json({ message: 'อัพโหลดไฟล์รูปภาพสำเร็จ' });
        }
    });
});

app.post('/api_news/create-news-img', (req, res) => {
    const file = req.files.img_card_con;
    
    if (!file) {
        res.status(400).json({ error: 'ไม่พบไฟล์ที่อัพโหลด' });
        return;
    }
    
      if (file.size > 3000 * 1024) {
        res.status(400).json({ error: 'ขนาดไฟล์ต้องไม่เกิน 3000 KB' });
        return;
    }
    
    const newPath = path.join(__dirname, '../src/assets/images/Topic', file.name);
    
    file.mv(newPath, (error) => {
        if (error) {
            res.status(500).json({ error: 'เกิดข้อผิดพลาดในการบันทึกไฟล์' });
        } else {
            res.json({ message: 'อัพโหลดไฟล์รูปภาพสำเร็จ' });
        }
    });
});

app.post('/api_news/create-paragraphs-img', (req, res) => {
    const file = req.files.img_card_con;
    
    if (!file) {
        res.status(400).json({ error: 'ไม่พบไฟล์ที่อัพโหลด' });
        return;
    }
    
      if (file.size > 3000 * 1024) {
        res.status(400).json({ error: 'ขนาดไฟล์ต้องไม่เกิน 3000 KB' });
        return;
    }
    
    const newPath = path.join(__dirname, '../src/assets/images/Paragraphs', file.name);
    
    file.mv(newPath, (error) => {
        if (error) {
            res.status(500).json({ error: 'เกิดข้อผิดพลาดในการบันทึกไฟล์' });
        } else {
            res.json({ message: 'อัพโหลดไฟล์รูปภาพสำเร็จ' });
        }
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('เกิดข้อผิดพลาด: ' + err.message);
});
