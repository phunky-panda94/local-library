const express = require('express');
const router = express.Router();

// Wiki home
router.get('/', (req, res, next) => {
    res.send('Wiki home page');
});

// Wiki about
router.get('/about', (req, res, next) => {
    res.send('Wiki about page');
});

module.exports = router;
