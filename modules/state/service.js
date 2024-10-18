const { generatorId } = require("../../lib/generatorId");
const { resolve } = require('node:path');
const { Repository } = require("../../lib/repository");

class StateService {
    #repository
    constructor(repository) {
        this.#repository = repository;
    }

    async allStates() {
        const data = await this.#repository.read();

        return data;
    }

    async createState(state) {
        let data = await this.#repository.read();

        const id = await generatorId(data);

        await data.push({ id, ...state });

        await this.#repository.write(data);
    }

    async deleteState(i) {
        const data = await this.#repository.read();

        await data.splice(i, 1);

        await this.#repository.write(data);

        return data;
    }
}

const dir = resolve('database', 'states.json');

const repository = new Repository(dir);

const stateService = new StateService(repository);

module.exports = {stateService}