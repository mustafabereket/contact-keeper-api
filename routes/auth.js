const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

router.post('/login', [
    check('email', 'Please provie email to login').isEmail(),
    check('password', 'Put in the password please').notEmpty()
], async (req, res) => {

    let errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(403).json({message: errors.array()});
    }

    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});
        if(!user) return res.status(403).json({message: "Invalid Credentials"});
        console.log(password)
        if(!await bcrypt.compare(password, user.password)) return res.status(403).json({message: "Invalid Credentials PASSWORD"});
    
        const payload = {
            user: {
                id: user._id,
                name: user.name
            }
        }
    
        jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 3600}, (err, token) => res.json({token}));
    } catch (err) {
        res.status(500).json({message: err});
    }
   
}) 

router.get('/', (req, res) => {
    res.json({message: 'CONTACTS/GET'})
}) 



module.exports = router;