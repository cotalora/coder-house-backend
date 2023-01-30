const server = require('./src/services/server');

const PORT = 8080;

server.set('port', process.env.PORT || PORT);

server.listen(server.get('port'), () => console.log(`Listening on port ${PORT}`))
    .on('error', error => console.log('Server has an error: ', error));
