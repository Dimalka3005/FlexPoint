const express = require('express');
const connection = require('../connection');
const router = express.Router();

const auth = require('../services/authontication');
const checkRole = require('../services/checkRole');

//ADD CATEGORY API
router.post('/add-category',auth.authenticateToken, checkRole.checkRole, (req, res) => {
    let category = req.body;
    const query = "SELECT * FROM category WHERE name = ?";
    connection.query(query, [category.name], (err, result) => {
        if (!err) {
            if (result.length == 0) {
                const query = "INSERT INTO category (name, description, status) VALUES(?,?,1)";
                connection.query(query, [category.name,category.description], (err, result) => {
                    if (!err) {
                        if (result.affectedRows == 0){
                            return res.status(404).json({
                                success: false,
                                message: 'Couldn\'t add category'
                            });
                        }
                        else {
                            return res.status(200).json({
                                success: true,
                                message: 'Category added successfully'
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
                    message: 'Category already exists'
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

//GET ALL CATEGORIES
router.get('/get-categories',auth.authenticateToken, checkRole.checkRole, (req, res) => {
    const query = "SELECT id,name,description,status FROM category";
    connection.query(query, (err, result) => {
        if (!err) {
            return res.status(200).json({
                success: true,
                message: 'Categories fetched successfully',
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

//GET CATEGORY BY ID
router.get('/get-category-by-id/:id',auth.authenticateToken, checkRole.checkRole, (req, res) => {
    let id = req.params.id;
    const query = "SELECT id,name,description,status FROM category WHERE id = ?";
    connection.query(query, [id], (err, result) => {
        if (!err) {
            return res.status(200).json({
                success: true,
                message: 'Category fetched successfully',
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

//UPDATE CATEGORY
router.patch('/update-category',auth.authenticateToken, checkRole.checkRole, (req, res) => {
    let category = req.body;
    const query = "UPDATE category SET name=?,description=? WHERE id=?";
    connection.query(query, [category.name,category.description,category.id], (err, result) => {
        if (!err) {
            return res.status(200).json({
                success: true,
                message: 'Category updated successfully'
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

//DELETE CATEGORY
router.patch('/delete-category',auth.authenticateToken, checkRole.checkRole, (req, res) => {
    let category = req.body;
    const query = "UPDATE category SET status=0 WHERE id=?";
    connection.query(query, [category.id], (err, result) => {
        if (!err) {
            return res.status(200).json({
                success: true,
                message: 'Category deleted successfully'
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