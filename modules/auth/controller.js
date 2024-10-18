const { userService } = require('../users/service');
const { ResData } = require('../../lib/resData');
const { comparePassword } = require('../../lib/hashPassword');
const { authService } = require('./service');

class AuthController {
    #authService;
    #userService;
    constructor(authService, userService) {
        this.#authService = authService;
        this.#userService = userService;
    }

    async generateToken(req, res, next) {
        try {
            const { login, password } = req.body;

            const checkLogin = await this.#userService.checkLogin(login);

            if (!checkLogin) {
                const resData = new ResData('this login is not found', 404);
                return res.render('login.ejs', resData);
            }

            const checkPassword = await comparePassword(password, checkLogin.password);

            if (!checkPassword) {
                const resData = new ResData('passwor is incorrect', 400);
                return res.render('login.ejs', resData);
            }

            const token = await this.#authService.generateToken(checkLogin.id);

            res.cookie('tokenName', token, { httpOnly: true });

            res.redirect('/');

        } catch (error) {
            next(error);
        }
    }
}

const authController = new AuthController(authService, userService);

module.exports = {authController}