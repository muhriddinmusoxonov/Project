const { Repository } = require("../../../lib/repository");
const { ResData } = require("../../../lib/resData");
const { resolve } = require('node:path');

class Controller {
    #repository
    constructor(repository) {
        this.#repository = repository;
    }

    async renderDistrict(req,res,next) {
        try {
            const data = await this.#repository.read();
            const resData = new ResData('success', 200, data);

            res.render('districts.ejs', resData);
        } catch (error) {
            next(error);
        }
    }
}

const dir = resolve('database', 'districts.json');

const repository = new Repository(dir);

const districtController = new Controller(repository);

module.exports = {districtController}