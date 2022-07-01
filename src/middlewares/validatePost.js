const eslintFix = (error) => error;

module.exports = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title || !content || !categoryIds) {
    throw eslintFix({
     status: 400, message: 'Some required fields are missing',
  });
}
  next();
};
