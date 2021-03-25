const express = require("express");
const app = express();
const mongoose = require("mongoose");

//Router handel
const noteRoute = require("./routes/notesRoutes");
const indexRoute = require("./routes/indexRoutes");
const userRoute = require("./routes/users");

// //Middleware
app.use(express.json());

//connection database
(async function () {
  try {
    await mongoose.connect("mongodb://localhost:27017/notes-app", {
      useNewUrlParser: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("Database connected successfully");
  } catch (err) {
    console.log(err);
  }
})();

// handeling routes;
app.use("/", noteRoute);
app.use("/users", userRoute);

app.use("/", indexRoute);

//server port runing
app.listen(9000, () => {
  console.log("server is created...");
});
