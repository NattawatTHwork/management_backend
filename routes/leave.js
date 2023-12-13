var express = require('express');
var router = express.Router();
var connection = require('../database');
const checkUserAuthorization = require('./checkUserAuthorization');

// get all leave
router.get('/', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'SELECT * FROM leave_requests WHERE deleted = 1',
        (err, results, fields) => {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json({ status: 'success', message: results })
        }
    );
});

// get this leave
router.get('/:id', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'SELECT * FROM leave_requests WHERE deleted = 1 AND leave_requests_id = ?',
        [req.params.id],
        (err, results, fields) => {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json({ status: 'success', message: results })
        }
    );
});

// get my user leave
router.get('/my_leave/:id', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'SELECT * FROM leave_requests WHERE deleted = 1 AND user_id = ?',
        [req.params.id],
        (err, results, fields) => {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json({ status: 'success', message: results })
        }
    );
});

// create leave
router.post('/create_leave', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'INSERT INTO `leave_requests` (user_id, leave_type, description, start_date, end_date) VALUES (?, ?, ?, ?, ?)',
        [req.body.user_id, req.body.leave_type, req.body.description, req.body.start_date, req.body.end_date],
        (err, results, fields) => {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json({ status: 'success' });
        }
    );
});

// update leave
router.put('/update_leave/:id', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'UPDATE leave_requests SET leave_type = ?, description = ?, start_date = ?, end_date = ?, status = ? WHERE leave_requests_id = ?',
        [req.body.leave_type, req.body.description, req.body.start_date, req.body.end_date, req.body.status, req.params.id],
        function (err, results, fields) {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json({ status: 'success' });
        }
    );
});

// delete leave
router.put('/delete_leave/:id', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'UPDATE leave_requests SET deleted = 0 WHERE leave_requests_id = ?',
        [req.params.id],
        function (err, results, fields) {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json({ status: 'success' });
        }
    );
});

module.exports = router;