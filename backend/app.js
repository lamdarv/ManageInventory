const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require('./src/routes/user')

require("dotenv").config();

const postRoute = require("./src/routes/post");
const app = express();

//connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.use("/api/post", postRoute);
app.use('/api/user', userRoutes)

app.get("/", (req, res) => {
  res.send("get");
  console.log(res);
});
