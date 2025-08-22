// src/utils/errorHandler.js
const logger = require('./logger');
const errorHandler = (err, req, res, next) => {
    logger.error(err);
    res.status(500).json({ error: 'Something went wrong.' });
};
module.exports = errorHandler;
