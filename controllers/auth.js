const Employee = require("./../models/Employee");
const jwt = require("jsonwebtoken");

function getLogin(req, res) {
  return res.render("login");
}

async function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const user = await Employee.findOne({ email: email });
  if (!user) {
    console.log("User not exist with this email");
    return res.redirect("/auth/login");
  } else {
    if (user.password != password) {
      console.log("password not matched");
      return res.redirect("/auth/login");
    } else {
      const token = jwt.sign({ id: user._id }, "employee review secret", {
        expiresIn: "1h",
      });
      res.cookie("jwt", token);
      return res.redirect("/");
    }
  }
}

function getSignup(req, res) {
  return res.render("signup", { add: false });
}

async function signup(req, res) {
  const username = req.body.username.trim().toLowerCase();
  const email = req.body.email.toLowerCase();
  const password = req.body.password;
  if (username.length == 0) {
    return res.json({
      message: "name cannot be empty",
    });
  } else {
    try {
      const employee = await Employee.create({
        username,
        email,
        password,
      });
      if (employee) {
        return res.redirect("auth/login");
      } else {
        return res.json({
          message: "Error in creating new employee",
        });
      }
    } catch (err) {
      let message = username + " username already registered";
      if (err.keyValue.email) {
        message = email + " email already registered";
      }
      console.log("Error >>>>>", err);
      return res.json({
        message,
        error: err,
      });
    }
  }
}

function logout(req, res) {
  res.clearCookie("jwt");
  return res.redirect("/auth/login");
}

module.exports = {
  login,
  getLogin,
  signup,
  getSignup,
  logout,
};
