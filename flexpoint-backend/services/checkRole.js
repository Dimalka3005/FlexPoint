require('dotenv').config();

function checkRole(req, res, next) {
    if (res.locals.role == process.env.USER) {
        return res.status(401).json({
            success: false,
            access: 'Access Denied',
            message: 'Only Admins can access this resource'
        });
    }
    else {
        next();
    }
}

module.exports = {checkRole: checkRole}