const express = require('express');
const connection = require('../connection');
const router = express.Router();

const auth = require('../services/authontication');
const checkRole = require('../services/checkRole');

//ADD ORDER API
router.post('/add-order',auth.authenticateToken, checkRole.checkRole, (req, res) => {
    let order = req.body;
    const query = "INSERT INTO orders(customerId,productDetails,totalAmount,paymentMethod,status,saleBy) VALUES(?,?,?,?,1,?)";
    connection.query(query, [order.customerId,order.productDetails,order.totalAmount,order.paymentMethod,order.saleBy], (err, result) => {
        if (!err) {
            if (result.affectedRows == 0){
                return res.status(404).json({
                    success: false,
                    message: 'Couldn\'t add order'
                });
            }
            else {
                return res.status(200).json({
                    success: true,
                    message: 'Order added successfully',
                    details: {
                        id: result.insertId,
                        customerId: order.customerId,
                        totalAmount: order.totalAmount
                    }
                });
            }
        }
        else {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong. Please try again'
            });
        }
    })
})

// GET ACTIVE ORDERS
router.get('/get-active-orders',auth.authenticateToken, checkRole.checkRole, (req, res) => {
    const query = "SELECT id,customerId,productDetails,totalAmount,paymentMethod,status,saleBy FROM orders WHERE status = 1";
    connection.query(query, (err, result) => {
        if (!err) {
            return res.status(200).json({
                success: true,
                message: 'Orders fetched successfully',
                data: result
            });
        }
        else {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong. Please try again'
            });
        }
    })
})

// GET ORDER BY ID
router.get('/get-order-by-id/:id',auth.authenticateToken, checkRole.checkRole, (req, res) => {
    let id = req.params.id;
    const query = "SELECT id,customerId,productDetails,totalAmount,paymentMethod,status,saleBy FROM orders WHERE id = ?";
    connection.query(query, [id], (err, result) => {
        if (!err) {
            return res.status(200).json({
                success: true,
                message: 'Order fetched successfully',
                data: result[0]
            });
        }
        else {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong. Please try again'
            });
        }
    })
})

// UPDATE ORDER
router.patch('/update-order',auth.authenticateToken, checkRole.checkRole, (req, res) => {
    let order = req.body;
    const query = "UPDATE orders SET customerId=?,productDetails=?,totalAmount=?,paymentMethod=? WHERE id=?";
    connection.query(query, [order.customerId,order.productDetails,order.totalAmount,order.paymentMethod,order.id], (err, result) => {
        if (!err) {
            return res.status(200).json({
                success: true,
                message: 'Order updated successfully'
            });
        }
        else {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong. Please try again'
            });
        }
    })
})

// DELETE ORDER
router.patch('/delete-order',auth.authenticateToken, checkRole.checkRole, (req, res) => {
    let order = req.body;
    const query = "UPDATE orders SET status=0 WHERE id=?";
    connection.query(query, [order.id], (err, result) => {
        if (!err) {
            return res.status(200).json({
                success: true,
                message: 'Order deleted successfully'
            });
        }
        else {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong. Please try again'
            });
        }
    })
})

module.exports = router;