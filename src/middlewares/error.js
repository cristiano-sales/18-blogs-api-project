module.exports = (error, req, res, _next) => 
  res.status(error.status || 500).json({ message: error.message || 'Erro inesperado' }); 
