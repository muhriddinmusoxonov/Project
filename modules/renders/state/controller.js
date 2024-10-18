const { Repository } = require("../../../lib/repository");
const { ResData } = require("../../../lib/resData");
const { resolve } = require('node:path');

class Controller {
    #repository
    constructor(repository) {
        this.#repository = repository;
    }
    async renderState(req,res,next) {
        try {
            const data = await this.#repository.read();
            const resData = new ResData('success', 200, data);
            res.render('states.ejs', resData);
        } catch (error) {
            next(error);
        }
    }
}

const dir = resolve('database', 'states.json');

const repository = new Repository(dir);

const stateController = new Controller(repository);

module.exports = {stateController}