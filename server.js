const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();
const path = require("path");

const app = express();


mongoose
    .connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to DB"))
    .catch((error) => console.log(error));


app.listen(process.env.PORT, (error) => {
    error ? console.log(error) : console.log(`Server is runnig on port ${process.env.PORT}`);
});


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan("dev"));