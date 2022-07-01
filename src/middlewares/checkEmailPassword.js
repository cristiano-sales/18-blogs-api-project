const validateUserData = require('../schemas/emailPassword');

const eslintFix = (error) => error;

module.exports = async (req, res, next) => {
    try {
        await validateUserData.validateAsync(req.body);
    } catch ({ details }) {
        throw eslintFix({ status: 400, message: details[0].message });
    }
    next();
};
