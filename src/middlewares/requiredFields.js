const requiredFields = (error) => error;

module.exports = async (req, _res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw requiredFields({
     status: 400, message: 'Some required fields are missing',
  });
}
  next();
};
