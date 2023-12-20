var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

app.use('/login', require('./routes/login'));
app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/user'));
app.use('/rank', require('./routes/rank'));
app.use('/position', require('./routes/position'));
app.use('/office', require('./routes/office'));
app.use('/task', require('./routes/task'));
app.use('/leave', require('./routes/leave'));
app.use('/timeclock', require('./routes/timeclock'));

app.listen(3000, function () {
    console.log('CORS-enabled web server listening on port 3000');
});