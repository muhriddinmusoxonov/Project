const { hashPassword } = require('../../lib/hashPassword');
const { ResData } = require('../../lib/resData');
const { userService } = require('./service');
class UserController {
    #userService
    constructor(userService) {
        this.#userService = userService;
    }

    async getAll(req,res,next) {
        try {
            const data = await this.#userService.allUser();

            if (!data) {
                res.send('error');
            }

            const resData = new ResData('success', 200, data);


            res.render('home.ejs', resData);
        } catch (error) {
            next(error);
        }
    }

    async creatUser(req, res, next) {
        try {
            const { login, myPassword, districtId, address } = req.body;

            if (!login || !myPassword || !districtId || !address) {
                const resData = new ResData('all input is required', 400);
                return res.render('register.ejs', resData);
            }

            const checkLogin = await this.#userService.checkLogin(login);

            if (checkLogin) {
                const resData = new ResData('this login exist', 400);
                return res.render('register.ejs', resData);
            }

            const password = await hashPassword(myPassword);

            await this.#userService.creatUser({ login, password, districtId, address });

            res.redirect('/api/login');

        } catch (error) {
            next(error);
        }
    }

    async deleteUser(req, res, next) {
        try {
            let { id } = req.body;

            id = Number(id);

            if (isNaN(id)) {
                return res.render('error.ejs', new ResData('id is not a number', 400));
            }

            const data = await this.#userService.allUser();
            console.log(data);

            const userI = await data.findIndex((el) => el.id === id);

                if (userI === -1) {
                    const resData = new ResData('user is not found', 404);
                    return res.render('error.ejs', resData);
                }

            await this.#userService.deleteUser(userI);

            res.clearCookie('tokenName', { httpOnly: true });

            res.redirect('/');

        } catch (error) {
            next(error);
        }
    }
}

const userController = new UserController(userService);

module.exports = {userController};