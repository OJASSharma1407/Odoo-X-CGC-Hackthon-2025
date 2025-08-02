require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {body,validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.jwt_secret;


// ========== SIGN-IN (REGISTER) ==========
router.post('/sign-in', [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password must be at least 8 characters").isLength({ min: 8 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "Email already registered" });
        }

        // ✅ Hash password here
        const secPass = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: secPass
        });

        const data = {
            user: {
                id: newUser.id
            }
        };

        const authToken = jwt.sign(data, secret);
        await newUser.save();

       res.json({ token: authToken });


    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// ========== LOGIN ==========

router.post('/log-in', [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password is required").notEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({ error: "Email not registered" });
        }

        // Compare password with hash
        const isMatch = await bcrypt.compare(password , user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Generate JWT
        const data ={
            user:{

                id:user.id
            }
        }
        const authToken = jwt.sign(data,secret);
        console.log(authToken);
       res.json({ token: authToken });

    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;