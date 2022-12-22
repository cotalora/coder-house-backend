const minimist = require('minimist');
const { app, server } = require('./src/services/server');

const optionalArgs = {
    alias: {
        p: 'port'
    },
    default: {
        p: 8080
    }
}

const args = minimist(process.argv, optionalArgs);

app.set('port', args.port);

server.listen(app.get('port'), () => console.log(`Listening on port ${args.port}`))
    .on('error', error => console.log('Server has an error: ', error));
