const eslintFix = (error) => error;

module.exports = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw eslintFix({
     status: 400, message: 'Some required fields are missing',
  });
}
  next();
};
