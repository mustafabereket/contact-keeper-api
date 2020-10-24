const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.json({message: 'CONTACTS/POST'})
}) 

router.get('/', (req, res) => {
    res.json({message: 'CONTACTS/GET'})
}) 

router.put('/', (req, res) => {
    res.json({message: 'CONTACTS/PUT'})
}) 


router.delete('/', (req, res) => {
    res.json({message: 'CONTACTS/DELETE'})
}) 

module.exports = router;