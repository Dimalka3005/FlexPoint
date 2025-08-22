const express = require('express');
const connection = require('../connection');
const router = express.Router();

const auth = require('../services/authontication');
const checkRole = require('../services/checkRole');


router.get('/details',auth.authenticateToken, (req, res, next) => {

    var categoryCount;
    var productCount;
    var orderCount;
    var userCount;
    var customerCount;
    var supplierCount;

    var query = "select count(id) as userCount from user";
    connection.query(query, (err, result) => {
        if (!err) {
            userCount = result[0].userCount;
        }
        else {
            return res.status(500).json(err);
        }
    })

    var query = "select count(id) as customerCount from customer";
    connection.query(query, (err, result) => {
        if (!err) {
            customerCount = result[0].customerCount;
        }
        else {
            return res.status(500).json(err);
        }
    })

    var query = "select count(id) as supplierCount from supplier";
    connection.query(query, (err, result) => {
        if (!err) {
            supplierCount = result[0].supplierCount;
        }
        else {
            return res.status(500).json(err);
        }
    })

    var query = "select count(id) as categoryCount from category";
    connection.query(query, (err, result) => {
        if (!err) {
            categoryCount = result[0].categoryCount;
        }
        else {
            return res.status(500).json(err);
        }
    })

    var query = "select count(id) as productCount from product";
    connection.query(query, (err, result) => {
        if (!err) {
            productCount = result[0].productCount;
        }
        else {
            return res.status(500).json(err);
        }
    })

    var query = "select count(id) as orderCount from orders";
    connection.query(query, (err, result) => {
        if (!err) {
            orderCount = result[0].orderCount;
            var data ={
                category: categoryCount,
                product: productCount,
                order: orderCount,
                user: userCount,
                customer: customerCount,
                supplier: supplierCount
            };
            return res.status(200).json(data);
        }
        else {
            return res.status(500).json(err);
        }
    })

})

module.exports = router;