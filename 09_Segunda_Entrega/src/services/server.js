const express = require('express');
const app = express();
const routerRoot = require('../routes/root');
const routerNotFound = require('../routes/notFound');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', routerRoot);
app.use('/*', routerNotFound)

module.exports = app;
