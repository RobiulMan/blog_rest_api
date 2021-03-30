const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
//Router handel
const noteRoute = require("./routes/notesRoutes");
const indexRoute = require("./routes/indexRoutes");
const userRoute = require("./routes/users");

//config
require("dotenv").config({
  path: "./config/keys.env",
});
//port
const PORT = process.env.PORT || 9000;

// //Middleware
app.use(express.json());
app.use(cookieParser(process.env.COOKES_SECRET));

//connection database
(async function () {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hzuax.mongodb.net/myblog?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Database connected successfully");
  } catch (err) {
    console.log(err);
  }
})();

// handeling routes;
app.use("/notes", noteRoute);
app.use("/users", userRoute);

app.use("/", indexRoute);

//server port runing
app.listen(PORT, () => {
  console.log("server is running...");
});
