const { app, server } = require('./src/services/server');

const PORT = 8080;

app.set('port', process.env.PORT || PORT);

server.listen(app.get('port'), () => console.log(`Listening on port ${PORT}`))
    .on('error', error => console.log('Server has an error: ', error));
