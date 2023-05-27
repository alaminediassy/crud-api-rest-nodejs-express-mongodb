require("dotenv").config();
const { Router } = require("express");
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = Router(); // create router to create route bundle

//DESTRUCTURE ENV VARIABLES WITH DEFAULTS
const { SECRET = "secret" } = process.env;

// Signup route to create a new user
exports.signup = async (req, res) => {
    try {
        // hash the password
        req.body.password = await bcrypt.hash(req.body.password, 10);
        // create a new user
        const user = await User.create(req.body);
        // send new user as response
        res.json(user);
    } catch (error) {
        res.status(400).json({ error });
    }
};


// Login route to verify a user and get a token
exports.login = async (req, res) => {
    try {
        // check if the user exists
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            //check if password matches
            const result = await bcrypt.compare(req.body.password, user.password);
            if (result) {
                // sign token and send it in response
                const token = await jwt.sign({ username: user.username }, SECRET);
                res.json({ token, message: "Connexion réussie avec succès" });
            } else {
                res.status(400).json({ error: "le mot de passe ne correspond pas" });
            }
        } else {
            res.status(400).json({ error: "L'utilisateur n'existe pas" });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
};