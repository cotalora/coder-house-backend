const path = require('path');
const { fork } = require('child_process');
const scriptPath = path.resolve(__dirname, '../../utils/calculo.js');
const { loggerError } = require("../../log4js.conf");

const random = (req, res) => {
    try {
        const compute = fork(scriptPath);
        compute.send({message: 'start', param: req.query.cant});
        compute.on('message', (result) => {
            res.json({ resultado: result })
        });
    } catch (error) {
        res.json({ error });
        loggerError.error(error);
    }
}

module.exports = { random }