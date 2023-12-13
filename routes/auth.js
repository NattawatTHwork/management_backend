const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config()
const secret = process.env.SECRET_KEY;

router.post('/', express.json(), (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            res.json({ status: 'error', message: 'Unauthorized' });
            return;
        }

        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.json({ status: 'error', message: err.message });
                return;
            }
            res.json({ status: 'success', decoded });
        });
    } catch (err) {
        res.json({ status: 'error', message: err.message });
    }
});

module.exports = router;