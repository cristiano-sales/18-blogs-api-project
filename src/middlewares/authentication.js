const { authToken } = require('../jwt');

module.exports = async (req, res, next) => {
    const token = req.headers.authorization;
    const user = authToken(token);

    res.locals.user = user;
    next();
};
