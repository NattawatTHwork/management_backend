var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

app.get('/', function (req, res) {
    res.send('Hello World!');
  });

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

app.listen(5000, function () {
    console.log('CORS-enabled web server listening on port 5000');
});