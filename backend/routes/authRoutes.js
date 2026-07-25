const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

const { signup } = require("../controllers/authController");

router.post("/signup", signup);

module.exports = router;
