const { UserModel } = require("./models/userSchema");

const createUser = async (user) => {
    try {
        return await UserModel.create(user);
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

module.exports = { createUser };