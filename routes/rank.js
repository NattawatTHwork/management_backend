var express = require('express');
var router = express.Router();
var connection = require('../database');
const checkUserAuthorization = require('./checkUserAuthorization');

// get all rank
router.get('/', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'SELECT * FROM rank WHERE deleted = 1 ORDER BY rank.level',
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
        'INSERT INTO `rank` (rank, rank_s, level) VALUES (?, ?, ?)',
        [req.body.rank, req.body.rank_s, req.body.level],
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
        'UPDATE rank SET rank = ?, rank_s = ?, level = ? WHERE rank_id = ?',
        [req.body.rank, req.body.rank_s, req.body.level, req.params.id],
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