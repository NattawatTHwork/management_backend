var express = require('express');
var router = express.Router();
var connection = require('../database');
const checkUserAuthorization = require('./checkUserAuthorization');

// get super admin
router.get('/superadmin', express.json(), (req, res, next) => {
    connection.execute(
        'SELECT COUNT(*) AS total, ' +
        'SUM(CASE WHEN status = 1 THEN 1 ELSE 0 END) AS status_1_count, ' +
        'SUM(CASE WHEN status = 0 THEN 1 ELSE 0 END) AS status_0_count ' +
        'FROM user WHERE role = 1 AND deleted = 1',
        (err, results, fields) => {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json({ status: 'success', message: results })
        }
    );
});

// get admin
router.get('/admin', express.json(), (req, res, next) => {
    connection.execute(
        'SELECT COUNT(*) AS total, ' +
        'SUM(CASE WHEN status = 1 THEN 1 ELSE 0 END) AS status_1_count, ' +
        'SUM(CASE WHEN status = 0 THEN 1 ELSE 0 END) AS status_0_count ' +
        'FROM user WHERE role = 2 AND deleted = 1',
        (err, results, fields) => {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json({ status: 'success', message: results })
        }
    );
});

// get user
router.get('/user', express.json(), (req, res, next) => {
    connection.execute(
        'SELECT COUNT(*) AS total, ' +
        'SUM(CASE WHEN status = 1 THEN 1 ELSE 0 END) AS status_1_count, ' +
        'SUM(CASE WHEN status = 0 THEN 1 ELSE 0 END) AS status_0_count ' +
        'FROM user WHERE role = 3 AND deleted = 1',
        (err, results, fields) => {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json({ status: 'success', message: results })
        }
    );
});

// get today status
router.get('/today_status', express.json(), (req, res, next) => {
    const local_date = new Date().toLocaleDateString(); // This is the local date because mysql uses the DATE_FORMAT function to get the local date.
    connection.execute(
        'SELECT ' +
        '(SELECT COUNT(*) FROM user WHERE role = 3 AND deleted = 1) AS total_users, ' +
        '(SELECT COUNT(*) FROM leave_requests WHERE status = 1 AND CURDATE() BETWEEN start_date AND end_date) AS leave_requests_count, ' +
        '(SELECT COUNT(*) FROM timeclock WHERE DATE_FORMAT(clock_in, "%m/%d/%Y") = ?) AS timeclock_count',
        [local_date],
        (err, results, fields) => {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json({ status: 'success', message: results })
        }
    );
});

// get this rank
router.get('/:id', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'SELECT * FROM rank WHERE deleted = 1 AND rank_id = ?',
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

// create rank
router.post('/create_rank', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'INSERT INTO `rank` (rank, rank_s) VALUES (?, ?)',
        [req.body.rank, req.body.rank_s],
        (err, results, fields) => {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json({ status: 'success' });
        }
    );
});

// update rank
router.put('/update_rank/:id', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'UPDATE rank SET rank = ?, rank_s = ? WHERE rank_id = ?',
        [req.body.rank, req.body.rank_s, req.params.id],
        function (err, results, fields) {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json({ status: 'success' });
        }
    );
});

// delete rank
router.put('/delete_rank/:id', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'UPDATE rank SET deleted = 0 WHERE rank_id = ?',
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