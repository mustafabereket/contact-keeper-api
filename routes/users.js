const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

router.post('/addUser', [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'Please include valid email').isEmail(),
    check('password', 'Please use at least 5 char').isLength({min: 5})
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    try {
        
        const {name, email, password} = req.body;
        const user = new User({name, password, email});
        const userExist = await User.findOne({email: req.body.email});
        console.log(userExist);
        if(userExist){
            return res.status(400).json({msg: 'user already exist'})
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    
        let result = await user.save();

        const payload = {
            user: {
                id: result._id,
                name: result.name
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 3600}, (err, token) => res.json({token}));

        //res.json(result);
    } catch (err){
        console.log(err);
        res.status(500).json(err);
    }
}) 

router.get('/', (req, res) => {
    res.json({message: 'Users/GET'})
}) 

module.exports = router;