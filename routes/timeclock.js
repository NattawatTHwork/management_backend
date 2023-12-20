var express = require('express');
var router = express.Router();
var connection = require('../database');
const checkUserAuthorization = require('./checkUserAuthorization');

// get all timeclock
router.get('/', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'SELECT * FROM timeclock WHERE deleted = 1',
        (err, results, fields) => {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json({ status: 'success', message: results })
        }
    );
});

// get this timeclock
router.get('/:id', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'SELECT * FROM timeclock WHERE deleted = 1 AND timeclock_id = ?',
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

// get my user timeclock
router.get('/my_timeclock/:id', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'SELECT * FROM timeclock WHERE deleted = 1 AND user_id = ?',
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

// get my user clock in
router.get('/check_clock_in/:id', express.json(), (req, res, next) => {
    connection.execute(
        'SELECT * FROM timeclock WHERE deleted = 1 AND user_id = ? AND DATE(clock_in) = CURDATE()',
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

// clock in
router.post('/clock_in', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'INSERT INTO `timeclock` (user_id, clock_in) VALUES (?, ?)',
        [req.body.user_id, req.body.clock_in],
        (err, results, fields) => {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json({ status: 'success' });
        }
    );
});

// clock out
router.put('/clock_out/:id', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'UPDATE timeclock SET clock_out = ? WHERE timeclock_id = ?',
        [req.body.clock_out, req.params.id],
        function (err, results, fields) {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json({ status: 'success' });
        }
    );
});

// update timeclock
router.put('/update_timeclock/:id', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'UPDATE timeclock SET clock_in = ?, clock_out = ? WHERE timeclock_id = ?',
        [req.body.clock_in, req.body.clock_out, req.params.id],
        function (err, results, fields) {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json({ status: 'success' });
        }
    );
});

// delete timeclock
router.put('/delete_timeclock/:id', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'UPDATE timeclock SET deleted = 0 WHERE timeclock_id = ?',
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