var express = require('express');
var router = express.Router();
var connection = require('../database');
const checkUserAuthorization = require('./checkUserAuthorization');

// get my user timesheet
// router.post('/my_timesheet/:id', express.json(), (req, res, next) => {
//     connection.execute(
//         "SELECT user_id, NULL AS clock_in, NULL AS clock_out, DATE_ADD(start_date, INTERVAL t.n DAY) AS leave_date FROM leave_requests JOIN (SELECT n FROM (SELECT @row := @row + 1 AS n FROM information_schema.tables, (SELECT @row := -1) r LIMIT 100) numbers) t ON t.n <= DATEDIFF(end_date, start_date) WHERE user_id = ? AND MONTH(start_date) = ? AND YEAR(start_date) = ? AND deleted = 1 UNION SELECT user_id, clock_in, clock_out, NULL AS leave_date FROM timeclock WHERE user_id = ? AND MONTH(clock_in) = ? AND YEAR(clock_in) = ? AND deleted = 1 ORDER BY leave_date ,clock_in",
//         [req.params.id, req.body.month, req.body.year, req.params.id, req.body.month, req.body.year],
//         (err, results, fields) => {
//             if (err) {
//                 res.json({ status: 'error', message: err });
//                 return;
//             }
//             res.json({ status: 'success', message: results })
//         }
//     );
// });
router.post('/my_timesheet/:id', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'SELECT leave_type, description, DATE_ADD(start_date, INTERVAL t.n DAY) AS leave_date FROM leave_requests JOIN (SELECT n FROM (SELECT @row := @row + 1 AS n FROM information_schema.tables, (SELECT @row := -1) r LIMIT 100) numbers) t ON t.n <= DATEDIFF(end_date, start_date) WHERE user_id = ? AND MONTH(start_date) = ? AND YEAR(start_date) = ? AND deleted = 1 AND status = 1',
        [req.params.id, req.body.month, req.body.year],
        (err, results_leave, fields) => {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }

            connection.execute(
                'SELECT * FROM timeclock WHERE user_id = ? AND MONTH(clock_in) = ? AND YEAR(clock_in) = ? AND deleted = 1',
                [req.params.id, req.body.month, req.body.year],
                (err, results_timeclock, fields) => {
                    if (err) {
                        res.json({ status: 'error', message: err });
                        return;
                    }
                    res.json({ status: 'success', results_leave: results_leave, results_timeclock: results_timeclock })
                }
            );
        }
    );
});

module.exports = router;