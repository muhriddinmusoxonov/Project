class ResData {
    constructor(message, status, data = null) {
        this.message = message;
        this.status = status;
        this.data = data;
    }
}

module.exports = {ResData}