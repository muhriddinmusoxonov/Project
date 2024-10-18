class Controller {
    renderRegister(req,res,next) {
        try {
            res.render('register.ejs', {
                message: ''});
        } catch (error) {
            next(error);
        }
    }
}

const registerController = new Controller();

module.exports = {registerController}