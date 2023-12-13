var express = require('express');
var router = express.Router();
var connection = require('../database');
const checkUserAuthorization = require('./checkUserAuthorization');

// get all position
router.get('/', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'SELECT * FROM position WHERE deleted = 1',
        (err, results, fields) => {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json({ status: 'success', message: results })
        }
    );
});

// get this position
router.get('/:id', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'SELECT * FROM position WHERE deleted = 1 AND position_id = ?',
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

// create position
router.post('/create_position', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'INSERT INTO `position` (position) VALUES (?)',
        [req.body.position],
        (err, results, fields) => {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json({ status: 'success' });
        }
    );
});

// update position
router.put('/update_position/:id', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'UPDATE position SET position = ? WHERE position_id = ?',
        [req.body.position, req.params.id],
        function (err, results, fields) {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json({ status: 'success' });
        }
    );
});

// delete position
router.put('/delete_position/:id', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'UPDATE position SET deleted = 0 WHERE position_id = ?',
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