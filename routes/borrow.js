var express = require('express');
var router = express.Router();
var connection = require('../database');
const checkUserAuthorization = require('./checkUserAuthorization');

// get all borrow
router.get('/', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'SELECT * FROM borrow WHERE deleted = 1',
        (err, results, fields) => {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json({ status: 'success', message: results })
        }
    );
});

// get this borrow
router.get('/:id', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'SELECT * FROM borrow WHERE deleted = 1 AND borrow_id = ?',
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

// get this equipment
router.get('/equipment/:id', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'SELECT * FROM borrow WHERE deleted = 1 AND equipment_id = ? ORDER BY borrow_id DESC LIMIT 1',
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

// create borrow
router.post('/create_borrow', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'INSERT INTO `borrow` (user_id, equipment_id, status) VALUES (?, ?, ?)',
        [req.body.user_id, req.body.equipment_id, req.body.status],
        (err, results, fields) => {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json({ status: 'success' });
        }
    );
});

// delete status
router.put('/delete_borrow/:id', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'UPDATE borrow SET deleted = 0 WHERE borrow_id = ?',
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