const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const mainRouter = require("./routes/router");
const session = require("express-session");

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
  .connect(
    "mongodb+srv://admin:admin@cluster0.8nlynj9.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("CONNECTED OK");
  })
  .catch((e) => {
    console.log("CONNECTION ERROR");
  });

app.use(express.json());

app.listen(4000);

app.use("/", mainRouter);
