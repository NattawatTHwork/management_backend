var express = require('express');
var router = express.Router();
var connection = require('../database');
const checkUserAuthorization = require('./checkUserAuthorization');

// get all equipment
router.get('/', express.json(), (req, res, next) => {
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

// get all equipment status
router.get('/equipment_status', express.json(), (req, res, next) => {
    connection.execute(
        'SELECT e.*, b.borrow_id, b.user_id, b.borrow_date, b.return_date, u.rank_s, u.firstname, u.lastname FROM equipment e LEFT JOIN (SELECT borrow_id, user_id, equipment_id, borrow_date, return_date FROM borrow WHERE borrow_id IN (SELECT MAX(borrow_id) AS max_borrow_id FROM borrow GROUP BY equipment_id)) b ON e.equipment_id = b.equipment_id LEFT JOIN (SELECT user.user_id, rank.rank_s, user.firstname, user.lastname FROM user INNER JOIN rank ON user.rank = rank.rank_id) u ON b.user_id = u.user_id WHERE e.deleted != 0 ORDER BY e.equipment_id',
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