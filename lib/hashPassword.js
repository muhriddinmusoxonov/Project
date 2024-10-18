const bcrypt = require('bcrypt');

const hashPassword = async (myPassword) => {
    try {
        const salt = 10;
        const hashedPasword = await bcrypt.hash(myPassword, salt);
        return hashedPasword;
    } catch (error) {
        return error;
    }
}

const comparePassword = async (myPassword, hashPassword) => {
    try {
        const isMatch = await bcrypt.compare(myPassword, hashPassword);
        return isMatch;
    } catch (error) {
        return error;
    }
}

module.exports = { hashPassword, comparePassword };