const Order = require("../models/order");
const OrderCreationHelper = require("../utils/orderCreationHelper");

getOrders = (req, res) => {
    Order.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving orders."
            });
        });
}

createOrder = (req, res) => {
    let isDateBooked = false;
    Order.find()
         .then(data => {
          for(order of data){
            let requestStartDate = new Date(req.body.range.startDate);
            let requestEndDate = new Date(req.body.range.endDate);
            if(!(order.range.startDate > requestStartDate && requestEndDate < order.range.endDate ||
              order.range.startDate < requestStartDate && requestEndDate > order.range.endDate)){
              isDateBooked = true;
            }
          }
        })
        .then(() => {
          if(!isDateBooked){
            const order = new Order({
              name: req.body.name,
              surname: req.body.surname,
              patronymic: req.body.patronymic,
              phone: req.body.phone,
              range: req.body.range,
              shortInfo:{
                customData: {
                  title: OrderCreationHelper.getFirstLetterInUpperCase(req.body.surname) + 
                         OrderCreationHelper.getFirstLetterInUpperCase(req.body.name) + 
                         OrderCreationHelper.getFirstLetterInUpperCase(req.body.patronymic),
                  class: OrderCreationHelper.classes[OrderCreationHelper.getRandomInt(5)],
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
              res.send(data);
            })
            .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while creating a order."
              });
            });
          }
          else{
            res.send({errorMessage: "Failed to save the order, the date you have chosen is already reserved"});
          }
        })
};


module.exports = {
    getOrders,
    createOrder,
};