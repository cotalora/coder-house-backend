const minimist = require('minimist');
const express = require('express');
const cluster = require('cluster');
const os = require('os');
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

app.set('port', 8081 || process.env.PORT);

const numCPUs = os.cpus().length;

if (cluster.isPrimary && args.mode === 'CLUSTER') {
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code) => {
        console.log(`Worker ${worker.process.pid} with code ${code}`);
        cluster.fork();
    });
} else {
    app.use('/', routes);
    
    app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')} in ${args.mode} mode - PID WORKER ${process.pid}`))
        .on('error', error => console.log('Server has an error: ', error));
}
