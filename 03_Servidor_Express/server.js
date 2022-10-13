const express = require('express');
const app = express();
const generalRouter = require('./routes/general.routes');

const PORT = 8080;

app.set('port', process.env.PORT || PORT);

app.use('/', generalRouter);

const server = app.listen(app.get('port'), () => console.log(`Listening on port ${PORT}`));
server.on('error', error => console.log('Server has an error: ', error));