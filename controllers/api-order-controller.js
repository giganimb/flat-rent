const Order = require("../models/order");

getOrders = (req, res) => {
    Order.find()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving orders."
            });
        });
}

createOrder = (req, res) => {
  const classes = ["bg-red-600 text-white", "bg-blue-500 text-white", "bg-indigo-500 text-white", 
                  "bg-teal-500 text-white", "bg-pink-500 text-white"];

  const order = new Order({
      name: req.body.name,
      surname: req.body.surname,
      patronymic: req.body.patronymic,
      phone: req.body.phone,
      range: req.body.range,
      shortInfo:{
        customData: {
          title: getFirstLetterInUpperCase(req.body.surname) + 
                 getFirstLetterInUpperCase(req.body.name) + 
                 getFirstLetterInUpperCase(req.body.patronymic),
          class: classes[getRandomInt(5)],
        },
        dates: {
            start: req.body.range.startDate,
            end: req.body.range.endDate,
        }
      }
  });

  order
    .save(order)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating a order."
      });
    });
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
};

function getFirstLetterInUpperCase(param){
  let str = "";
  str += param; 
  return str.charAt(0).toUpperCase();
};

module.exports = {
    getOrders,
    createOrder,
};