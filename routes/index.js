const express = require("express");
const homeController = require("./../controllers/home");
const { checkAuthentication, setEmployee } = require("./../utils");

const router = express.Router();

router.use("/auth", require("./auth"));
router.use("/employees", require("./employees"));
router.use("/", setEmployee, homeController.homePage);

module.exports = router;
