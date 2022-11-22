const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    for: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    feedback: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
