const jwt = require('jsonwebtoken');
const { resolve } = require('node:path');
class AuthService {

    async generateToken(id) {
        const secretKey = process.env.SECRET_KEY;
        const token = jwt.sign({id}, secretKey, { expiresIn: 60 * 60 });

        return token;
    }

    async checkToken(token) {
        const secretKey = process.env.SECRET_KEY;
        const ans = jwt.verify(token, secretKey);

        return ans;
    }
}

const authService = new AuthService();

module.exports = {authService}