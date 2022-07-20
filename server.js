const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();
const path = __dirname + '/app/dist/';

const app = express();

app.use(express.static(path));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan("dev"));


mongoose
    .connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to DB"))
    .catch((error) => console.log(error));

app.get('/', function (req,res) {
    res.sendFile(path + "index.html");
});

app.use(require("./routes/order-routes"));
app.use(require("./routes/api-order-routes"));

app.listen(process.env.PORT, (error) => {
    error ? console.log(error) : console.log(`Server is runnig on port ${process.env.PORT}`);
});