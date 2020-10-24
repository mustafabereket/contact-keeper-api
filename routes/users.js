const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.json({message: 'Users/POST'})
}) 

router.get('/', (req, res) => {
    res.json({message: 'Users/GET'})
}) 

module.exports = router;