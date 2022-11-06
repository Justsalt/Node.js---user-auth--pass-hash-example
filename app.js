const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const mainRouter = require("./routes/router");
const session = require("express-session");
const dotenv = require("dotenv").config();

app.use(
  session({
    secret: "fsdfsdfsdfsdfsdfsd",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    method: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("CONNECTED OK");
  })
  .catch((e) => {
    console.log("CONNECTION ERROR");
  });

app.use(express.json());

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("Server started on port ");
});

app.use("/", mainRouter);
