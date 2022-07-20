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
    shortInfo:{
        customData: {
            title: {
              type: String,
              required: true
            },
            class: {
              type: String,
              required: true
            },
        },
        dates: {
            start: {
            type: Date,
            required: true
            },
            end: {
            type: Date,
            required: true
            },
        }
    }
});

module.exports = mongoose.model("Order", orderSchema);