const fs = require("node:fs/promises");

class Repository {
    #dir
    constructor(dir) {
        this.#dir = dir;
    }

    async write(data) {
        fs.writeFile(this.#dir, JSON.stringify(data, null, 4));
    }

    async read() {
        let data = await fs.readFile(this.#dir);

        if (data) {
            data = JSON.parse(data);
        } else {
            data = [];
        }

        return data;
    }
}

module.exports = {Repository}