var express = require('express');
var cors = require('cors');
var https = require('https');
var fs = require('fs');
require('dotenv').config(); // โหลดค่าจากไฟล์ .env

var app = express();

// สร้างตัวแปร port โดยใช้ค่าจาก .env หากไม่มีใช้ค่าเริ่มต้น 8443
const port = process.env.PORT || 8443;

// ใช้ CORS
app.use(cors());

// โหลดใบรับรอง SSL และ private key
var options = {
    key: fs.readFileSync('/etc/letsencrypt/live/thaicodelab.com/privkey.pem'), // เปลี่ยนเป็น path ของคุณ
    cert: fs.readFileSync('/etc/letsencrypt/live/thaicodelab.com/fullchain.pem') // เปลี่ยนเป็น path ของคุณ
};

// เส้นทางทั่วไป
app.get('/', function (req, res) {
    res.send('Hello World!');
});

// เส้นทางสำหรับ routing อื่นๆ
app.use('/login', require('./routes/login'));
app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/user'));
app.use('/rank', require('./routes/rank'));
app.use('/position', require('./routes/position'));
app.use('/office', require('./routes/office'));
app.use('/task', require('./routes/task'));
app.use('/leave', require('./routes/leave'));
app.use('/timeclock', require('./routes/timeclock'));
app.use('/timesheet', require('./routes/timesheet'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/equipment', require('./routes/equipment'));
app.use('/borrow', require('./routes/borrow'));

// สร้าง HTTPS server บนพอร์ตตามตัวแปร port
https.createServer(options, app).listen(port, function () {
    console.log(`CORS-enabled HTTPS server listening on port ${port}`);
});
