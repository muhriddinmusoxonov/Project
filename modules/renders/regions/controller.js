const { Repository } = require("../../../lib/repository");
const { ResData } = require("../../../lib/resData");
const { resolve } = require('node:path');

class Controller {
    #repository
    constructor(repository) {
        this.#repository = repository;
    }

    async renderRegion(req,res,next) {
        try {
            const data = await this.#repository.read();
            const resData = new ResData('success', 200, data);

            res.render('regions.ejs', resData);
        } catch (error) {
            next(error);
        }
    }
}

const dir = resolve('database', 'regions.json');

const repository = new Repository(dir);

const regionController = new Controller(repository);

module.exports = {regionController}