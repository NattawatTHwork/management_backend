var express = require('express');
var router = express.Router();
var connection = require('../database');
const checkUserAuthorization = require('./checkUserAuthorization');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// get all user
router.get('/', express.json(), checkUserAuthorization, (req, res, next) => {
    if (req.decoded.role == 1) {
        connection.execute(
            'SELECT user_id, firstname, lastname, rank.rank as rank, rank_s, position.position as position, email, tel, code_verify, role, status, img_path FROM user INNER JOIN rank ON user.rank = rank.rank_id INNER JOIN position ON user.position = position.position_id WHERE user.deleted = 1 ORDER BY rank.level',
            (err, results, fields) => {
                if (err) {
                    res.json({ status: 'error', message: err });
                    return;
                }
                res.json({ status: 'success', message: results })
            }
        );
    } else {
        res.json({ status: 'norights', message: req.decoded.role });
        return;
    }
});

//get manage and employee
router.get('/user', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'SELECT user_id, firstname, lastname, rank.rank as rank, rank_s, position.position as position, email, tel, code_verify, role, status, img_path FROM user INNER JOIN rank ON user.rank = rank.rank_id INNER JOIN position ON user.position = position.position_id WHERE user.deleted = 1 AND user.role != 1 ORDER BY rank.level',
        (err, results, fields) => {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            res.json({ status: 'success', message: results })
        }
    );
});

// get this user
router.get('/user/:id', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'SELECT user_id, firstname, lastname, rank_id, rank.rank as rank, rank_s, position_id, position.position as position, email, tel, password_view, code_verify, role, status, img_path FROM user INNER JOIN rank ON user.rank = rank.rank_id INNER JOIN position ON user.position = position.position_id WHERE user_id = ? AND user.deleted = 1',
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

// create user
router.post('/create_user', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'SELECT * FROM user WHERE email = ? AND deleted = 1',
        [req.body.email],
        (err, results, fields) => {
            if (err) {
                res.json({ status: 'error', message: err });
                return;
            }

            if (results.length > 0) {
                res.json({ status: 'exists', message: 'E-mail already exists' });
                return;
            }

            const code_verify = Math.floor(100000 + Math.random() * 900000);

            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                connection.execute(
                    'INSERT INTO user (firstname, lastname, rank, position, email, tel, password, password_view, code_verify, role, img_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    [req.body.firstname, req.body.lastname, req.body.rank, req.body.position, req.body.email, req.body.tel, hash, req.body.password, code_verify, req.body.role, req.body.img_path],
                    (err, results, fields) => {
                        if (err) {
                            res.json({ status: 'error', message: err });
                            return;
                        }
                        res.json({ status: 'success' });
                    }
                );
            });
        }
    );
});

// update user
router.put('/update_user/:id', express.json(), checkUserAuthorization, (req, res, next) => {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        connection.execute(
            'UPDATE user SET firstname = ?, lastname = ?, rank = ?, position = ?, email = ?, tel = ?, password = ?, password_view = ?, role = ?, status = ?, img_path = ? WHERE user_id = ?',
            [req.body.firstname, req.body.lastname, req.body.rank_id, req.body.position_id, req.body.email, req.body.tel, hash, req.body.password, req.body.role, req.body.status, req.body.img_path, req.params.id],
            function (err, results, fields) {
                if (err) {
                    res.json({ status: 'error', message: err });
                    return;
                }
                res.json({ status: 'success' });
            }
        );
    });
});

// delete user
router.put('/delete_user/:id', express.json(), checkUserAuthorization, (req, res, next) => {
    connection.execute(
        'UPDATE user SET deleted = 0 WHERE user_id = ?',
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

// generate code verify all
router.put('/generate_code_verify/:id', express.json(), checkUserAuthorization, (req, res, next) => {
    const code_verify = Math.floor(100000 + Math.random() * 900000);

    connection.execute(
        'UPDATE user SET code_verify = ? WHERE user_id = ?',
        [code_verify, req.params.id],
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