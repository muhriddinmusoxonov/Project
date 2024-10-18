const { generatorId } = require("../../lib/generatorId");
const { resolve } = require('node:path');
const { Repository } = require('../../lib/repository');

class RegionService {
    #repository;
    constructor(repository) {
        this.#repository = repository;
    }

    async createRegion(data) {
        const oldData = await this.#repository.read();

        const id = await generatorId(oldData);

        await oldData.push({ id, ...data });

        await this.#repository.write(oldData);
    }

    async allRegion() {
        const data = await this.#repository.read();

        return data;
    }

    async checkState(id) {
        const data = await this.#repository.read();

        const ans = await data.find((el) => el.id === id);

        return ans;
    }

    async deleteRegion(i) {
        const data = await this.#repository.read();

        await data.splice(i, 1);

        await this.#repository.write(data);

        return data;
    }
}

const dir = resolve('database', 'regions.json');

const repository = new Repository(dir);

const regionService = new RegionService(repository);

module.exports = {regionService}