var express = require('express');
var router = express.Router();
var connection = require('../database');
const checkUserAuthorization = require('./checkUserAuthorization');

// // get all timeclock
// router.get('/', express.json(), checkUserAuthorization, (req, res, next) => {
//     connection.execute(
//         'SELECT * FROM timeclock WHERE deleted = 1',
//         (err, results, fields) => {
//             if (err) {
//                 res.json({ status: 'error', message: err });
//                 return;
//             }
//             res.json({ status: 'success', message: results })
//         }
//     );
// });

// // get this timeclock
// router.get('/:id', express.json(), checkUserAuthorization, (req, res, next) => {
//     connection.execute(
//         'SELECT * FROM timeclock WHERE deleted = 1 AND timeclock_id = ?',
//         [req.params.id],
//         (err, results, fields) => {
//             if (err) {
//                 res.json({ status: 'error', message: err });
//                 return;
//             }
//             res.json({ status: 'success', message: results })
//         }
//     );
// });

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
router.post('/my_timesheet/:id', express.json(), (req, res, next) => {
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

// // get my user clock in
// router.get('/check_clock_in/:id', express.json(), (req, res, next) => {
//     connection.execute(
//         'SELECT * FROM timeclock WHERE deleted = 1 AND user_id = ? AND DATE(clock_in) = CURDATE()',
//         [req.params.id],
//         (err, results, fields) => {
//             if (err) {
//                 res.json({ status: 'error', message: err });
//                 return;
//             }
//             res.json({ status: 'success', message: results })
//         }
//     );
// });

// // clock in
// router.post('/clock_in', express.json(), (req, res, next) => {
//     connection.execute(
//         'SELECT * FROM leave_requests WHERE status = 1 AND deleted = 1 AND CURDATE() BETWEEN start_date AND end_date',
//         (err, results, fields) => {
//             if (err) {
//                 res.json({ status: 'error', message: err });
//                 return;
//             }

//             if (results.length > 0) {
//                 res.json({ status: 'leave' });
//                 return;
//             }

//             connection.execute(
//                 'INSERT INTO `timeclock` (user_id, clock_in) VALUES (?, NOW())',
//                 [req.body.user_id],
//                 (err, results, fields) => {
//                     if (err) {
//                         res.json({ status: 'error', message: err });
//                         return;
//                     }
//                     res.json({ status: 'success' });
//                 }
//             );
//         }
//     );
// });

// // clock out
// router.put('/clock_out', express.json(), (req, res, next) => {
//     // connection.execute(
//     //     'SELECT * FROM office',
//     //     function (err, results, fields) {
//     //         if (err) {
//     //             res.json({ status: 'error', message: err });
//     //             return;
//     //         }

//     //         const endTimeString = results[0].end;
//     //         const endTime = new Date('1970-01-01T' + endTimeString);
//     //         const currentTime = new Date();

//     //         if (endTime.toLocaleTimeString() > currentTime.toLocaleTimeString()) {
//     //             res.json({ status: 'wait' });
//     //             return;
//     //         }

//     connection.execute(
//         'UPDATE timeclock SET clock_out = NOW() WHERE timeclock_id = ?',
//         [req.body.timeclock_id],
//         function (err, results, fields) {
//             if (err) {
//                 res.json({ status: 'error', message: err });
//                 return;
//             }
//             res.json({ status: 'success' });
//         }
//     );
//     //     }
//     // );
// });

// // update timeclock
// router.put('/update_timeclock/:id', express.json(), checkUserAuthorization, (req, res, next) => {
//     connection.execute(
//         'UPDATE timeclock SET clock_in = ?, clock_out = ? WHERE timeclock_id = ?',
//         [req.body.clock_in, req.body.clock_out, req.params.id],
//         function (err, results, fields) {
//             if (err) {
//                 res.json({ status: 'error', message: err });
//                 return;
//             }
//             res.json({ status: 'success' });
//         }
//     );
// });

// // delete timeclock
// router.put('/delete_timeclock/:id', express.json(), checkUserAuthorization, (req, res, next) => {
//     connection.execute(
//         'UPDATE timeclock SET deleted = 0 WHERE timeclock_id = ?',
//         [req.params.id],
//         function (err, results, fields) {
//             if (err) {
//                 res.json({ status: 'error', message: err });
//                 return;
//             }
//             res.json({ status: 'success' });
//         }
//     );
// });

module.exports = router;