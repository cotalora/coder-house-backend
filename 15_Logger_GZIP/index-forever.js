const minimist = require('minimist');
const express = require('express');
const routes = require('./src/routes/mainRoutes.routes');
const app = express();

const optionalArgs = {
    alias: {
        m: 'mode'
    },
    default: {
        m: 'FORK'
    }
}

const args = minimist(process.argv, optionalArgs);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('port', 8081);

app.use('/', routes);

app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')} in ${args.mode} mode - PID WORKER ${process.pid}`))
    .on('error', error => console.log('Server has an error: ', error));