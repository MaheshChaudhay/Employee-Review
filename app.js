const express = require("express");
const router = require("./routes/index");

const app = express();
const port = process.env.PORT || 3000;

app.use("/", router);

app.listen(port, (err) => {
  if (err) {
    console.error("Error in running the app : ", err);
    return;
  }

  console.log("Server is listening on port : ", port);
});
