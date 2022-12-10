const { MessageModel } = require("./models/messageSchema");

const createMessage = async (message) => {
    try {
        return await MessageModel.create(message);
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

const getMessages = async () => {
    try {
        return await MessageModel.find();
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

module.exports = { createMessage, getMessages };