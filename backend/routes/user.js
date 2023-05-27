const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

// Route pour l'inscription d'un nouvel utilisateur
router.post("/signup", userController.signup);

// Route pour la connexion d'un utilisateur
router.post("/login", userController.login);

module.exports = router;
