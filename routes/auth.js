const express = require("express");
const authcontroller = require("./../controllers/auth");
const { notAuthenticated } = require("./../utils");

const router = express.Router();

router.get("/login", notAuthenticated, authcontroller.getLogin);
router.post("/login", authcontroller.login);
router.get("/signup", notAuthenticated, authcontroller.getSignup);
router.post("/signup", authcontroller.signup);
router.get("/logout", authcontroller.logout);

module.exports = router;
