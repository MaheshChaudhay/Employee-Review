const Employee = require("./../models/Employee");
const Review = require("./../models/Review");

async function getAllEmployees(req, res) {
  try {
    const employees = await Employee.find();
    return res.status(200).render("all_employees", { employees });
  } catch (err) {
    return res.status(500).send({
      error: err,
      message: "Internal Server Error",
    });
  }
}

async function getAssignTask(req, res) {
  try {
    const employees = await Employee.find({}, { username: 1 });
    return res.status(200).render("assign_task", { employees });
  } catch (err) {
    return res.status(500).send({
      error: err,
      message: "Internal Server Error",
    });
  }
}

async function assignTask(req, res) {
  let forEmployee = req.body.for;
  let fromEmployee = req.body.from;
  try {
    fromEmployee = await Employee.findOne({ username: fromEmployee });
    forEmployee = await Employee.findOne({ username: forEmployee });
    const pendingReview = {
      for: forEmployee._id,
      from: fromEmployee._id,
    };
    fromEmployee.pendingReviews.push(pendingReview);
    fromEmployee.save();
    return res.json({
      fromEmployee,
      message: "Task Assigned Successfully",
      error: false,
    });
  } catch (err) {
    console.log("Error>>>", err);
    return res.json({
      error: true,
      message: "Error in assigning task",
    });
  }
}

// create review
async function createReview(req, res) {
  const prendingReviewId = req.params.id;
  try {
    const fromEmployee = await Employee.findOne({
      username: req.body.fromReview,
    });
    const pendingReview = fromEmployee.pendingReviews.find((obj) => {
      return obj._id == prendingReviewId;
    });
    const forEmployee = await Employee.findById(pendingReview.for);
    const newReview = await Review.create({
      from: fromEmployee._id,
      feedback: req.body.feedback,
      for: forEmployee._id,
      rating: req.body.rating,
      from: fromEmployee._id,
    });
    fromEmployee.pendingReviews = fromEmployee.pendingReviews.filter(
      (item) => item._id != prendingReviewId
    );
    fromEmployee.save();
    forEmployee.reviews.push({
      content: newReview._id,
      from: fromEmployee._id,
    });
    forEmployee.save();
    return res.json({
      data: {
        id: prendingReviewId,
        newReview,
      },
      message: "review created ",
    });
  } catch (err) {
    console.log(err);
    return res.send("review created ");
  }
}

async function getEditUser(req, res) {
  const employeeId = req.params.id;
  const employee = await Employee.findById(employeeId);
  return res.render("edit_user", { employee });
}

async function editUser(req, res) {
  const updatedEmployee = await Employee.findByIdAndUpdate(req.body.id, {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  return res.redirect("all_employees");
}

function getAddEmployee(req, res) {
  return res.render("signup", { add: true });
}

async function addEmployee(req, res) {
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
        return res.redirect("/employees/all-employees");
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

async function deleteEmployee(req, res) {
  const employeeId = req.params.id;
  const employee = await Employee.findById(employeeId, {
    reviews: 1,
  });
  const employeeReviews = employee.reviews;
  const deletedReviews = await Review.deleteMany({
    _id: { $in: employeeReviews },
  });
  let updatedEmployees = await Employee.updateMany(
    {},
    {
      $pull: {
        pendingReviews: { for: employeeId },
        reviews: { from: employeeId },
      },
    }
  );
  employee.remove();

  return res.json({
    message: "employee deleted",
    id: req.params.id,
  });
}

async function makeAdmin(req, res) {
  const employeeId = req.params.id;
  const employee = await Employee.findByIdAndUpdate(employeeId, {
    isAdmin: true,
  });

  res.redirect("/employees/all-employees");
}

module.exports = {
  getAllEmployees,
  getAssignTask,
  assignTask,
  createReview,
  getEditUser,
  editUser,
  getAddEmployee,
  addEmployee,
  deleteEmployee,
  makeAdmin,
};
