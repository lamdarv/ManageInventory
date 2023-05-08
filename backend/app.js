const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const postRoute = require("./src/routes/post");
const app = express();
const PORT = process.env.PORT || 5000;
const DBNAME = process.env.DBNAME || "test";
const mongouri =
	process.env.MONGO_URI || `mongodb://127.0.0.1:27017/${DBNAME}?ssl=false`;
mongoose.connect(mongouri);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use("/api/post", postRoute);

app.get("/", (req, res) => {
	res.send("get");
	console.log(res);
});

app.listen(PORT, () => {
	console.log("run on " + PORT);
});
