class Controller {
    renderLogin(req,res,next) {
        try {
            res.render('login.ejs', {
                message: ''});
        } catch (error) {
            next(error);
        }
    }
}

const loginController = new Controller();

module.exports = {loginController}