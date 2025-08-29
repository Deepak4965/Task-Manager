const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { sign } = require('jsonwebtoken')
const { jwtAuthMiddleware, generateToken } = require('../utils/jwt')

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exist = await User.findOne({ email: email })
        if (exist) return res.status(400).json({ error: "Email is already in use" })

        const user = await User.create({
            name,
            email,
            password
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server Error" })

    }
})

//login routes
router.post('/login', async (req, res) => {
    try {
        //Extract email and password from request body
        const { email, password } = req.body;

        //find the user by addharCardNumber
        const user = await User.findOne({ email})

        //If user data not exist or passwoed does not match,return error
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ Error: "Invalid username or password" })
        }

        //generate Token
        const payload = {
            id: user.id,
        }
        const token = generateToken(payload);

        //rerurn token as response
        res.json({ token })

    } catch (error) {
        console.log(error);
        res.status(500).json({ Error: "Internal server Error " })
    }
})

module.exports = router