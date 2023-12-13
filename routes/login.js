var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var connection = require('../database');
var jwt = require('jsonwebtoken');
require('dotenv').config()
const secret = process.env.SECRET_KEY;

router.post('/', express.json(), (req, res, next) => {
    connection.execute(
        'SELECT * FROM user WHERE email = ?',
        [req.body.email],
        (err, users, fields) => {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }

            if (users.length == 0) {
                res.json({ status: 'nofound', message: 'No user found.' });
                return;
            }

            if (users[0].status == 0) {
                res.json({ status: 'disable', message: 'Disable' });
                return;
            }

            if (users[0].role == 1) {
                res.json({ status: 'norights', message: 'No rights' });
                return;
            }
            
            if (users[0].code_verify != req.body.code_verify) {
                res.json({ status: 'noverify', message: 'No Verify' });
                return;
            }

            bcrypt.compare(req.body.password, users[0].password, function (err, isLogin) {
                if (isLogin) {
                    var token = jwt.sign({ user_id: users[0].user_id, role: users[0].role }, secret, { expiresIn: '1h' });
                    res.json({ status: 'success', message: users[0].role, token });
                } else {
                    res.json({ status: 'failed', message: 'Login Failed' });
                }
            });
        }
    );
});

router.post('/adminlogin', express.json(), (req, res, next) => {
    connection.execute(
        'SELECT * FROM user WHERE email = ?',
        [req.body.email],
        (err, users, fields) => {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }

            if (users.length == 0) {
                res.json({ status: 'nofound', message: 'No user found.' });
                return;
            }

            if (users[0].status == 0) {
                res.json({ status: 'disable', message: 'Disable' });
                return;
            }

            if (users[0].role != 1) {
                res.json({ status: 'norights', message: 'No rights' });
                return;
            }

            bcrypt.compare(req.body.password, users[0].password, function (err, isLogin) {
                if (isLogin) {
                    var token = jwt.sign({ user_id: users[0].user_id, role: users[0].role }, secret, { expiresIn: '1h' });
                    res.json({ status: 'success', message: users[0].role, token });
                } else {
                    res.json({ status: 'failed', message: 'Login Failed' });
                }
            });
        }
    );
});

module.exports = router;
