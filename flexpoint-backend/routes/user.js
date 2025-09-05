const express = require('express');
const connection = require('../connection');
const router = express.Router();

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

var auth = require('../services/authontication');
var checkRole = require('../services/checkRole');

// SIGNUP USER API
router.post('/signup', (req, res) => {
    let user = req.body;
    const query = "SELECT email,password,status FROM user WHERE email = ?";
    connection.query(query, [user.email], (err, result) => {
        if (!err) {
            if (result.length <=0){
                const query = "INSERT INTO user(name,email,contact,password,role,status) VALUES(?,?,?,?,?,0)";
                connection.query(query, [user.name,user.email,user.contact,user.password,user.role], (err, result) => {
                    if (!err) {
                        return res.status(200).json({
                            success: true,
                            message: 'User registered successfully'
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
                    message: 'User already exists'
                })
            }
        }
        else {
            return res.status(500).json({
                success: false,
                message: 'Error in database'
            })
        }
    })
})



// LOGIN USER API
router.post('/login', (req, res) => {
    let user = req.body;
    const query = "SELECT email,password,role,status FROM user WHERE email = ?";
    connection.query(query, [user.email], (err, result) => {
        if (!err) {
            if (result.length <=0 || result[0].password != user.password){
                return res.status(401).json({
                    success: false,
                    message: 'Incorrect email or password. Please check and try again'
                })
            }
            else if (result[0].status == 0){
                return res.status(401).json({
                    success: false,
                    message: 'User is not active. Wait for admin approval to login'
                })
            }
            else if(result[0].password == user.password){
                const response = {email: result[0].email, role: result[0].role}
                const accessToken = jwt.sign(response,process.env.ACCESS_TOKEN, {expiresIn: '1d'});
                res.status(200).json({
                    success: true,
                    message: 'User logged in successfully',
                    accessToken: accessToken
                })
            }
            else {
                return res.status(500).json({
                    success: false,
                    message: 'Something went wrong. Please try again'
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


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})
// FORGOT PASSWORD API
router.post('/forgot-password', (req, res) => {
    let user = req.body;
    const query = "SELECT email,password FROM user WHERE email = ?";
    connection.query(query, [user.email], (err, result) => {
        if (!err) {
            if (result.length <=0){
                return res.status(400).json({
                    success: false,
                    message: 'User does not exist'
                });
            }
            else {
                var mailOptions = {
                    from: process.env.EMAIL,
                    to: user.email,
                    subject: 'Flexpoint | Password Reset',
                    html: `<h3>Flexpoint User Account Details</h3><br>
                    <h4>Email: ${user.email}</h4><br>
                    <h4>Password: ${result[0].password}</h4>
                    <br><h3>Thank you for using Flexpoint Services</h3>`
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                return res.status(200).json({
                    success: true,
                    message: 'Password sent to your email'
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

// GET ALL USERS
router.get('/get-all-users',auth.authenticateToken, checkRole.checkRole, (req, res) => {
    const query = "SELECT id,name,role,status,user_category FROM user";
    connection.query(query, (err, result) => {
        if (!err) {
            return res.status(200).json({
                success: true,
                message: 'Users fetched successfully',
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

// Get user from user_category
router.get('/get-users-by-category',auth.authenticateToken, checkRole.checkRole, (req, res) => {
    const category = req.query.category;
    const query = "SELECT id,name,role,status,user_category FROM user WHERE user_category = ?";
    connection.query(query, [category], (err, result) => {
        if (!err) {
            return res.status(200).json({
                success: true,
                message: 'Users fetched successfully',
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


// SET USER STATUS
router.patch('/activate-status',auth.authenticateToken, checkRole.checkRole, (req, res) => {
    let user = req.body;
    const query = "UPDATE user SET status=? WHERE id=?";
    connection.query(query, [user.status,user.id], (err, result) => {
        if (!err) {
            if (result.affectedRows == 0){
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }
            else {
                return res.status(200).json({
                    success: true,
                    message: 'User status updated successfully'
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

// Check Token
router.get('/check-token', (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'Token is valid'
    });
})


// UPDATE USER
router.patch('/update-user',auth.authenticateToken, checkRole.checkRole, (req, res) => {
    let user = req.body;
    const query = "UPDATE user SET name=?, email=?, contact=?, password=?, role=? WHERE id=?";
    connection.query(query, [user.name,user.email,user.contact,user.password,user.role,user.id], (err, result) => {
        if (!err) {
            if (result.affectedRows == 0){
                return res.status(404).json({
                    success: false,
                    message: 'Couldn\'t find user'
                });
            }
            else {
                return res.status(200).json({
                    success: true,
                    message: 'User updated successfully'
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