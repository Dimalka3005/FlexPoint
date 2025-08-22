const express = require('express');
const connection = require('../connection');
const router = express.Router();

const auth = require('../services/authontication');
const checkRole = require('../services/checkRole');

// REGISTER CUSTOMER API
router.post('/register',auth.authenticateToken, checkRole.checkRole, (req, res) => {
    let customer = req.body;
    const query = "INSERT INTO customer (name, address, email, contact) VALUES(?,?,?,?)";
    connection.query(query, [customer.name,customer.address,customer.email,customer.contact], (err, result) => {
        if (!err) {
            if (result.affectedRows == 0){
                return res.status(404).json({
                    success: false,
                    message: 'Couldn\'t register customer'
                });
            }
            else {
                return res.status(200).json({
                    success: true,
                    message: 'Customer registered successfully',
                    details: {
                        id: result.insertId,
                        name: customer.name
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

// ACTIVATE STATUS
router.patch('/activate-status',auth.authenticateToken, checkRole.checkRole, (req, res) => {
    let customer = req.body;
    const query = "UPDATE customer SET status=1 WHERE id=?";
    connection.query(query, [customer.id], (err, result) => {
        if (!err) {
            if (result.affectedRows == 0){
                return res.status(404).json({
                    success: false,
                    message: 'Customer not found'
                });
            }
            else {
                return res.status(200).json({
                    success: true,
                    message: 'Customer activated successfully'
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


// GET ALL CUSTOMERS
router.get('/get-active-customers',auth.authenticateToken, checkRole.checkRole, (req, res) => {
    let customer = req.body;
    const query = "SELECT id,name,address,email,contact FROM customer WHERE status = 1";
    connection.query(query, (err, result) => {
        if (!err) {
            return res.status(200).json({
                success: true,
                message: 'Customers fetched successfully',
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

// GET CUSTOMER BY ID
router.get('/get-customer-by-id/:id',auth.authenticateToken, checkRole.checkRole, (req, res) => {
    let id = req.params.id;
    const query = "SELECT id,name,address,email,contact,status FROM customer WHERE id = ?";
    connection.query(query, [id], (err, result) => {
        if (!err) {
            return res.status(200).json({
                success: true,
                message: 'Customer fetched successfully',
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

// UPDATE CUSTOMER
router.patch('/update-customer',auth.authenticateToken, checkRole.checkRole, (req, res) => {
    let customer = req.body;
    const query = "UPDATE customer SET name=?, address=?, email=?, contact=? WHERE id=?";
    connection.query(query, [customer.name,customer.address,customer.email,customer.contact,customer.id], (err, result) => {
        if (!err) {
            if (result.affectedRows == 0){
                return res.status(404).json({
                    success: false,
                    message: 'Couldn\'t find customer'
                });
            }
            else {
                return res.status(200).json({
                    success: true,
                    message: 'Customer updated successfully'
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

// DELETE CUSTOMER
router.patch('/delete-customer',auth.authenticateToken, checkRole.checkRole, (req, res) => {
    let customer = req.body;
    const query = "UPDATE customer SET status=0 WHERE id=?";
    connection.query(query, [customer.id], (err, result) => {
        if (!err) {
            if (result.affectedRows == 0){
                return res.status(404).json({
                    success: false,
                    message: 'Couldn\'t find customer'
                });
            }
            else {
                return res.status(200).json({
                    success: true,
                    message: 'Customer deleted successfully'
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

module.exports = router;