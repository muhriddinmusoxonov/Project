const { ResData } = require('../../lib/resData');
const { stateService } = require('./service');

class StateController {
    #stateService;
    constructor(stateService) {
        this.#stateService = stateService;
    }

    async createState(req, res, next) {
        try {
            const { name } = req.body;

            if (!name) {
                const resData = new ResData('State is required', 400);
                return res.render('states.ejs', resData);
            }

            console.log(name);

            await this.#stateService.createState({ name });

            res.redirect('/api/state')
        } catch (error) {
            next(error);
        }
    }

    async deleteState(req,res,next) {
        let { name } = req.body;
        let states = await this.#stateService.allStates();

        if (!name) {
            return res.render('error.ejs', new ResData('input is required', 400));
        }

        const stateI = await states.findIndex((el) => el.name === name);

        if (stateI === -1) {
            return res.render('error.ejs', new ResData('State is not found', 404));
        }

        const data = await this.#stateService.deleteState(stateI);

        const resData = new ResData('deleted', 200, data);

        res.render('states.ejs', resData);
    }
}

const statesController = new StateController(stateService);

module.exports = {statesController}