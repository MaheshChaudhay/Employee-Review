const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://mahesh:GH1fFlywoKb0Armk@cluster0.mmzrk5t.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "database connection error: "));
db.once("open", function () {
  console.log("Connected to database successfully");
});

module.exports = db;

//GH1fFlywoKb0Armk
