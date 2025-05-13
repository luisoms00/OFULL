const path = require('path');
const asyncHandler = require('express-async-handler');
const notFound = (req, res, next) => {
    const error = new Error(`No se encontró la ruta: ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    });
};

const maintenance = (req, res, next) => {
    const isMaintenance = process.env.MAINTENANCE_MODE === 'true';
  
    if (isMaintenance) {
        console.log(`🔧 Sitio en mantenimiento. Ruta bloqueada: ${req.originalUrl}`);
        return res.sendFile(path.join(__dirname, '../../frontend', 'mantenimiento.html'));
      }
  
    next();
};


module.exports = {
    notFound,
    errorHandler,
    maintenance,
};
