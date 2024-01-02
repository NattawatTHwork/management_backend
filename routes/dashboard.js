var express = require('express');
var router = express.Router();
var connection = require('../database');
const checkUserAuthorization = require('./checkUserAuthorization');

// get super admin
router.get('/superadmin', express.json(), checkUserAuthorization, (req, res, next) => {
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
router.get('/admin', express.json(), checkUserAuthorization, (req, res, next) => {
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
router.get('/user', express.json(), checkUserAuthorization, (req, res, next) => {
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
router.get('/today_status', express.json(), checkUserAuthorization, (req, res, next) => {
    const local_date = new Date().toLocaleDateString(); // This is the local date because mysql uses the DATE_FORMAT function to get the local date.
    connection.execute(
        'SELECT ' +
        '(SELECT COUNT(*) FROM user WHERE role = 3 AND status = 1 AND deleted = 1) AS total_users, ' +
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

// get today task
router.get('/today_task/:id', express.json(), checkUserAuthorization, (req, res, next) => {
    const local_date = new Intl.DateTimeFormat('en-TH', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
    connection.execute(
        'SELECT ' +
        'responsible_id, task.task_id, title, description, schedule FROM responsible INNER JOIN task ON responsible.task_id = task.task_id ' +
        'WHERE user_id = ? AND responsible.deleted = 1  AND task.status = 1 AND task.deleted = 1 AND DATE_FORMAT(schedule, "%m/%d/%Y") = ?',
        [req.params.id, local_date],
        (err, results, fields) => {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json({ status: 'success', message: results })
        }
    );
});

module.exports = router;