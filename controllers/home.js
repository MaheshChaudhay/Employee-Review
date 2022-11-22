const Employee = require("./../models/Employee");

async function homePage(req, res) {
  try {
    const employee = await Employee.findById(res.locals.employee._id)
      .populate({
        path: "reviews",
        populate: {
          path: "content",
          populate: [
            {
              path: "for",
              model: "Employee",
            },
            {
              path: "from",
              model: "Employee",
            },
          ],
        },
      })
      .populate({
        path: "pendingReviews",
        populate: [
          {
            path: "for",
            model: "Employee",
          },
          {
            path: "from",
            model: "Employee",
          },
        ],
      });
    return res.render("home", { employee });
  } catch (err) {
    console.log(err);
    return res.json({
      error: err,
      message: "Internal Server Error",
    });
  }
}

module.exports = {
  homePage,
};
