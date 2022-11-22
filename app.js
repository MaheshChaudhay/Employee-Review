const express = require("express");
const router = require("./routes/index");
const path = require("path");
const db = require("./config/mongoose");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 3000;

//setting middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cookieParser());

// setting up ejs engine
app.set("view engine", "ejs");
app.set("views", "views");

app.use("/", router);

app.listen(port, (err) => {
  if (err) {
    console.error("Error in running the app : ", err);
    return;
  }

  console.log("Server is listening on port : ", port);
});

// yellow = #ffd831
// dark green = #356a66
// cyan = #e1fffe
// black = #363a3b

// background color = #f2f7fa
