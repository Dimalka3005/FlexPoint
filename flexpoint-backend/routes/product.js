const express = require('express');
const connection = require('../connection');
const router = express.Router();

const auth = require('../services/authontication');
const checkRole = require('../services/checkRole');

//ADD PRODUCT API if not exist product this name
router.post('/add-product',auth.authenticateToken, checkRole.checkRole, (req, res) => {
    let product = req.body;
    const query = "SELECT * FROM product WHERE name = ?";
    connection.query(query, [product.name], (err, result) => {
        if (!err) {
            if (result.length == 0){
                const query = "INSERT INTO product (name, unit_price, stock, category_id, supplier_id, status) VALUES(?,?,?,?,?,1)";
                connection.query(query, [product.name,product.unit_price,product.stock,product.category_id,product.supplier_id], (err, result) => {
                    if (!err) {
                        if (result.affectedRows == 0){
                            return res.status(404).json({
                                success: false,
                                message: 'Couldn\'t register product'
                            });
                        }
                        else {
                            return res.status(200).json({
                                success: true,
                                message: 'Product registered successfully',
                                details: {
                                    id: result.insertId,
                                    name: product.name
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
            }
            else {
                return res.status(400).json({
                    success: false,
                    message: 'Product already exists'
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

// GET ALL PRODUCTS
router.get('/get-products',auth.authenticateToken, checkRole.checkRole, (req, res) => {
    const query = "SELECT id,name,unit_price,stock,category_id,supplier_id FROM product WHERE status = 1";
    connection.query(query, (err, result) => {
        if (!err) {
            return res.status(200).json({
                success: true,
                message: 'Products fetched successfully',
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

// GET PRODUCT BY ID
router.get('/get-product-by-id/:id',auth.authenticateToken, checkRole.checkRole, (req, res) => {
    let id = req.params.id;
    const query = "SELECT id,name,unit_price,stock,category_id,supplier_id FROM product WHERE id = ?";
    connection.query(query, [id], (err, result) => {
        if (!err) {
            return res.status(200).json({
                success: true,
                message: 'Product fetched successfully',
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

// GET PRODUCTS BY CATEGORY ID
router.get('/get-products-by-category-id/:id',auth.authenticateToken, checkRole.checkRole, (req, res) => {
    let id = req.params.id;
    const query = "SELECT id,name,unit_price,stock,category_id,supplier_id FROM product WHERE category_id = ?";
    connection.query(query, [id], (err, result) => {
        if (!err) {
            return res.status(200).json({
                success: true,
                message: 'Products fetched successfully',
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

// GET PRODUCTS BY SUPPLIER ID
router.get('/get-products-by-supplier-id/:id',auth.authenticateToken, checkRole.checkRole, (req, res) => {
    let id = req.params.id;
    const query = "SELECT id,name,unit_price,stock,category_id,supplier_id FROM product WHERE supplier_id = ?";
    connection.query(query, [id], (err, result) => {
        if (!err) {
            return res.status(200).json({
                success: true,
                message: 'Products fetched successfully',
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

// UPDATE PRODUCT
router.patch('/update-product',auth.authenticateToken, checkRole.checkRole, (req, res) => {
    let product = req.body;
    const query = "UPDATE product SET name=?,unit_price=?,stock=?,category_id=?,supplier_id=? WHERE id=?";
    connection.query(query, [product.name,product.unit_price,product.stock,product.category_id,product.supplier_id,product.id], (err, result) => {
        if (!err) {
            return res.status(200).json({
                success: true,
                message: 'Product updated successfully'
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

// DELETE PRODUCT
router.patch('/delete-product',auth.authenticateToken, checkRole.checkRole, (req, res) => {
    let product = req.body;
    const query = "UPDATE product SET status=0 WHERE id=?";
    connection.query(query, [product.id], (err, result) => {
        if (!err) {
            return res.status(200).json({
                success: true,
                message: 'Product deleted successfully'
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