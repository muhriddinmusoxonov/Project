const { generatorId } = require("../../lib/generatorId");
const { resolve } = require('node:path');
const { Repository } = require('../../lib/repository');

class DistrictService {
    #repository;
    constructor(repository) {
        this.#repository = repository;
    }

    async allDistricts() {
        const data = await this.#repository.read();

        return data;
    }

    async createDistrict(data) {
        const oldData = await this.#repository.read();

        const id = await generatorId(oldData);

        await oldData.push({ id, ...data });

        await this.#repository.write(oldData);
    }

    async checkRegion(id) {
        const data = await this.#repository.read();

        const ans = await data.find((el) => el.id === id);

        return ans;
    }

    async deleteDistricts(i) {
        const data = await this.#repository.read();

        await data.splice(i, 1);

        await this.#repository.write(data);

        return data;
    }
}

const dir = resolve('database', 'districts.json');

const repository = new Repository(dir);

const districtService = new DistrictService(repository);

module.exports = {districtService}