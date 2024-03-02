var express = require('express');
var router = express.Router();
var connection = require('../database');
const checkUserAuthorization = require('./checkUserAuthorization');

// get all equipment
router.get('/', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'SELECT * FROM equipment WHERE deleted = 1',
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
router.get('/:id', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'SELECT * FROM equipment WHERE deleted = 1 AND equipment_id = ?',
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
router.post('/create_equipment', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'INSERT INTO `equipment` (equipment) VALUES (?)',
        [req.body.equipment],
        (err, results, fields) => {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json({ status: 'success' });
        }
    );
});

// update equipment
router.put('/update_equipment/:id', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'UPDATE equipment SET equipment = ?, status = ? WHERE equipment_id = ?',
        [req.body.equipment, req.body.status, req.params.id],
        function (err, results, fields) {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json({ status: 'success' });
        }
    );
});

// delete status
router.put('/delete_equipment/:id', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'UPDATE equipment SET deleted = 0 WHERE equipment_id = ?',
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