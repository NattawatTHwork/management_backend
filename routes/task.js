var express = require('express');
var router = express.Router();
var connection = require('../database');
const checkUserAuthorization = require('./checkUserAuthorization');

// get all task
router.get('/', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'SELECT * FROM task WHERE deleted = 1',
        (err, results, fields) => {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json({ status: 'success', message: results })
        }
    );
});

// get this task
router.get('/:id', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'SELECT * FROM task WHERE deleted = 1 AND task_id = ?',
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

// create task
router.post('/create_task', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'INSERT INTO `task` (title, description, schedule) VALUES (?, ?, ?)',
        [req.body.title, req.body.description, req.body.schedule],
        (err, results, fields) => {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json({ status: 'success' });
        }
    );
});

// update task
router.put('/update_task/:id', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'UPDATE task SET title = ?, description = ?, schedule = ? WHERE task_id = ?',
        [req.body.title, req.body.description, req.body.schedule, req.params.id],
        function (err, results, fields) {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json({ status: 'success' });
        }
    );
});

// delete task
router.put('/delete_task/:id', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'UPDATE task SET deleted = 0 WHERE task_id = ?',
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

// get this responsible ** You coding 2 ways.
// router.get('/responsible/:id', express.json(), checkUserAuthorization, (req, res, next) => {
//     connection.execute(
//         'SELECT task_id, GROUP_CONCAT(user_id) AS user_ids, GROUP_CONCAT(status) AS statuses, GROUP_CONCAT(deleted) AS deleteds, GROUP_CONCAT(responsible_id) AS responsible_ids FROM responsible WHERE deleted = 1 AND task_id = ? GROUP BY task_id',
//         [req.params.id],
//         (err, results, fields) => {
//             if (err) {
//                 res.json({ status: 'error', message: err });
//                 return;
//             }

//             if (results.length === 0) {
//                 res.json({ status: 'success', message: {} });
//                 return;
//             }

//             const transformedResults = {
//                 task_id: results[0].task_id,
//                 user_id: results[0].user_ids.split(','),
//                 status: results[0].statuses.split(','),
//                 deleted: results[0].deleteds.split(','),
//                 responsible_id: results[0].responsible_ids.split(',')
//             };

//             res.json({ status: 'success', message: transformedResults });
//         }
//     );
// });
router.get('/responsible/:id', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'SELECT * FROM responsible INNER JOIN user ON responsible.user_id = user.user_id INNER JOIN rank ON user.rank = rank.rank_id INNER JOIN task ON responsible.task_id = task.task_id WHERE responsible.deleted = 1 AND responsible.task_id = ?',
        [req.params.id],
        (err, results, fields) => {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }

            if (results.length == 0) {
                res.json({ status: 'no_responsible' });
                return;
            }
            
            const transformedResults = {
                task_id: req.params.id,
                user_id: results.map(result => result.user_id),
                status: results.map(result => result.status),
                deleted: results.map(result => result.deleted),
                responsible_id: results.map(result => result.responsible_id),
                rank: results.map(result => result.rank),
                rank_s: results.map(result => result.rank_s),
                firstname: results.map(result => result.firstname),
                lastname: results.map(result => result.lastname),
                title: results[0].title,
            };

            res.json({ status: 'success', message: transformedResults });
        }
    );
});


// add responsible
router.post('/add_responsible', express.json(), checkUserAuthorization, (req, res, next) => {
    req.body.user_id.forEach((user_id) => {
        connection.execute(
            'INSERT INTO `responsible` (task_id, user_id) VALUES (?, ?)',
            [req.body.task_id, user_id],
            (err, results, fields) => {
                if (err) {
                    res.json({ status: 'error', message: err });
                    return;
                }
            }
        );
    });
    res.json({ status: 'success' });
});

// delete responsible
router.put('/delete_responsible/:id', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'UPDATE responsible SET deleted = 0 WHERE responsible_id = ?',
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

// get my task
router.get('/my_task/:id', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'SELECT * FROM task INNER JOIN responsible ON task.task_id = responsible.task_id WHERE task.deleted = 1 AND responsible.deleted = 1 AND user_id = ? ORDER BY schedule DESC',
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

// accept responsible
router.put('/accept_responsible/:id', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'UPDATE responsible SET status = 1 WHERE responsible_id = ?',
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