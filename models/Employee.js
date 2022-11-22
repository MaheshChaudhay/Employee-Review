const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    pendingReviews: [
      {
        for: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Employee",
          required: true,
        },
        from: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Employee",
          required: true,
        },
      },
    ],
    reviews: [
      {
        content: { type: mongoose.Schema.Types.ObjectId, ref: "Review" },
        from: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Employee",
          required: true,
        },
      },
    ],
  },
  {
    timestanps: true,
  }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
