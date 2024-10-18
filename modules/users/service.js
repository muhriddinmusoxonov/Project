const { resolve } = require('node:path');
const { Repository } = require('../../lib/repository');
const { generatorId } = require('../../lib/generatorId');
const { ResData } = require('../../lib/resData');

class ServiceUser {
    #repository
    constructor(repository) {
        this.#repository = repository;
    }

    async allUser() {
        const data = await this.#repository.read();

        return data;
    }

    async creatUser(newData) {
        const data = await this.#repository.read();

        const id = await generatorId(data);

        data.push({ id, ...newData });

        await this.#repository.write(data);
    }

    async checkLogin(login) {
        const data = await this.#repository.read();

        const n = data.find((el) => el.login === login);

        return n;
    }

    async deleteUser(i) {
        const data = await this.#repository.read();

        await data.splice(i, 1);

        await this.#repository.write(data);
    }
}

const dir = resolve('database', 'users.json');

const repository = new Repository(dir);

const userService = new ServiceUser(repository);

module.exports = {userService}