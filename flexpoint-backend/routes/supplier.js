const express = require('express');
const connection = require('../connection');
const router = express.Router();

const auth = require('../services/authontication');
const checkRole = require('../services/checkRole');

//REGISTER SUPPLIER API
router.post('/register',auth.authenticateToken, checkRole.checkRole, (req, res) => {
    let supplier = req.body;
    const query = "SELECT name,contact,status FROM supplier WHERE email = ?";
    connection.query(query, [supplier.email], (err, result) => {
        if (!err) {
            if (result.length <=0){
                const query = "INSERT INTO supplier(name,company_name,email,contact) VALUES(?,?,?,?)";
                connection.query(query, [supplier.name,supplier.company_name,supplier.email,supplier.contact], (err, result) => {
                    if (!err) {
                        return res.status(200).json({
                            success: true,
                            message: 'Supplier registered successfully'
                        })
                    }
                    else {
                        return res.status(500).json({
                            success: false,
                            message: 'Error in database'
                        })
                    }
                })
            }
            else {
                return res.status(400).json({
                    success: false,
                    message: 'Supplier already exists'
                })
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

// ACTIVATE SUPPLIER
router.patch('/activate-supplier',auth.authenticateToken, checkRole.checkRole, (req, res) => {
    let supplier = req.body;
    const query = "UPDATE supplier SET status=1 WHERE id=?";
    connection.query(query, [supplier.id], (err, result) => {
        if (!err) {
            if (result.affectedRows == 0){
                return res.status(404).json({
                    success: false,
                    message: 'Supplier not found'
                });
            }
            else {
                return res.status(200).json({
                    success: true,
                    message: 'Supplier status updated successfully'
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

// GET ALL SUPPLIERS
router.get('/get-active-suppliers',auth.authenticateToken, checkRole.checkRole, (req, res) => {
    const query = "SELECT id,name,company_name,email,contact,status FROM supplier WHERE status = 1";
    connection.query(query, (err, result) => {
        if (!err) {
            return res.status(200).json({
                success: true,
                message: 'Suppliers fetched successfully',
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

// GET SUPPLIER BY ID
router.get('/get-supplier-by-id/:id',auth.authenticateToken, checkRole.checkRole, (req, res) => {
    let id = req.params.id;
    const query = "SELECT id,name,company_name,email,contact,status FROM supplier WHERE id = ?";
    connection.query(query, [id], (err, result) => {
        if (!err) {
            return res.status(200).json({
                success: true,
                message: 'Supplier fetched successfully',
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

// UPDATE SUPPLIER
router.patch('/update-supplier',auth.authenticateToken, checkRole.checkRole, (req, res) => {
    let supplier = req.body;
    const query = "UPDATE supplier SET name=?,company_name=?,email=?,contact=? WHERE id=?";
    connection.query(query, [supplier.name,supplier.company_name,supplier.email,supplier.contact,supplier.id], (err, result) => {
        if (!err) {
            return res.status(200).json({
                success: true,
                message: 'Supplier updated successfully'
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

// DELETE SUPPLIER
router.patch('/delete-supplier',auth.authenticateToken, checkRole.checkRole, (req, res) => {
    let supplier = req.body;
    const query = "UPDATE supplier SET status=0 WHERE id=?";
    connection.query(query, [supplier.id], (err, result) => {
        if (!err) {
            return res.status(200).json({
                success: true,
                message: 'Supplier deleted successfully'
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