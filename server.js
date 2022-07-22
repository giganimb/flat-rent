const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const path = __dirname + '/app/dist/';

const app = express();

app.use(express.static(path));

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    allowedHeaders: 'Authorization,Accept,Accept-Language,Content-Language,Content-Type,Access-Control-Allow-Origin',
    exposedHeaders: 'Authorization,X-Refresh-Token',
    methods: 'GET,POST,PUT,DELETE,HEAD,OPTIONS,PATCH',
};

app.use("/", cors(corsOptions));

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