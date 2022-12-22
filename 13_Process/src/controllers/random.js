const path = require('path');
const { fork } = require('child_process');
const scriptPath = path.resolve(__dirname, '../../utils/calculo.js')

const random = (req, res) => {
    const compute = fork(scriptPath);
    compute.send({message: 'start', param: req.query.cant});
    compute.on('message', (result) => {
        res.json({ resultado: result })
    });
}

module.exports = { random }