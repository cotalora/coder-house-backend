const os = require('os');

const information = (req, res) => {
    res.json({
        'Argumentos de entrada': process.argv.reduce((a, v) => ({ ...a, [v]: v}), {}) ,
        'Nombre de la plataforma': process.platform,
        'Versión de Node': process.version,
        'Memoria total reservada (rss)': process.memoryUsage().heapTotal,
        'Path de ejecución': process.execPath,
        'Process id': process.pid,
        'Carpetas del proyecto': process.cwd(),
        'Número de procesadores': os.cpus().length,
    })
}

module.exports = {
    information
};