const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    surname:{
        type: String,
        required: true,
    },
    patronymic:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    range: {
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
    },
});

module.exports = mongoose.model("Order", orderSchema);