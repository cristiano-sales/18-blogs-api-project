const emailPassword = require('../schemas/emailPassword');

module.exports = async (req, _res, next) => {
    const response = await emailPassword.validateAsync(req.body);
    console.log(response);
    next();
};
