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

// borrow
router.post('/borrow', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'INSERT INTO `borrow` (user_id, equipment_id, borrow_date) VALUES (?, ?, NOW())',
        [req.body.user_id, req.body.equipment_id],
        (err, results, fields) => {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json({ status: 'success' });
        }
    );
});

// return
router.put('/return/:id', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'UPDATE borrow SET return_date = NOW() WHERE borrow_id = ?',
        [req.params.id],
        (err, results, fields) => {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json({ status: 'success' });
        }
    );
});

module.exports = router;