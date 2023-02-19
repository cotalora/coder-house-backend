const minimist = require('minimist');
const express = require('express');
const infoRoutes = require('./src/routes/info.routes');
const productRoutes = require('./src/routes/products.routes');
const app = express();

const optionalArgs = {
    alias: {
        m: 'mode',
        p: 'port'
    },
    default: {
        m: 'FORK',
        p: 8081
    }
}

const args = minimist(process.argv, optionalArgs);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('port', args.port);

app.use('/info', infoRoutes);
app.use('/products', productRoutes);

app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')} in ${args.mode} mode - PID WORKER ${process.pid}`))
    .on('error', error => console.log('Server has an error: ', error));