const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    const token = req.cookies['tokenName'];

    if (!token) {
        return res.redirect('/api/login');
    }

    try {
        const secretKey = process.env.SECRET_KEY;

        const verifyed = jwt.verify(token, secretKey);
        req.user = verifyed;

        next();
    } catch (error) {
        next(error);
    }
}

module.exports = {checkToken}