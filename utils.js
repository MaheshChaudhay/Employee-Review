const Employee = require("./models/Employee");
const jwt = require("jsonwebtoken");

async function checkAuthentication(req, res, next) {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "employee review secret", function (err, decodedToken) {
      if (err) {
        console.log(err);
        return res.status(403).redirect("/auth/login");
      } else {
        return next();
      }
    });
  } else {
    res.status(403).redirect("/auth/login");
  }
}

async function setEmployee(req, res, next) {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(
      token,
      "employee review secret",
      async function (err, decodedToken) {
        if (err) {
          return res.status(403).redirect("/auth/login");
        } else {
          const empId = decodedToken.id;
          const employee = await Employee.findById(empId);
          res.locals.employee = employee;
          return next();
        }
      }
    );
  } else {
    res.status(403).redirect("/auth/login");
  }
}

function notAuthenticated(req, res, next) {
  if (!req.cookies.jwt) {
    return next();
  } else {
    res.redirect("/");
  }
}

module.exports = {
  checkAuthentication,
  setEmployee,
  notAuthenticated,
};
