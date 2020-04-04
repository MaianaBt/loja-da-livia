const jwt = require('jsonwebtoken');
const config = require('../../config/environment');

module.exports = function (req, res, next) {
    const { authorization } = req.headers;

    if (!authorization)
        return res.status(401).json({ error: 'Access denied. No token provided.' });

    const [type, token] = authorization.split(' ');

    if (!type || !token || type !== 'Bearer')
        return res.status(401).json({ error: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, config.JWT.secret);
        req.user = decoded;

        next();
    } catch (e) {
        res.status(400).json({ error: 'Invalid token.' });
    }
}