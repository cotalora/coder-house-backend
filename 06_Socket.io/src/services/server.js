const express = require('express');
const { engine } = require('express-handlebars');
const { initWsServer } = require('./socket');
const path = require('path');

const app = express();
const server = require('http').Server(app);

const viewsFolderPath = path.resolve(__dirname, '../../views');
const layoutsFolderPath = `${viewsFolderPath}/layouts`;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'hbs');
app.set('views', viewsFolderPath);

app.engine('hbs', engine({
    layoutsDir: layoutsFolderPath,
    extname: 'hbs',
}));

initWsServer(server);

app.use('/', (req, res) => res.render('main', { layout: 'index.hbs' }));

module.exports = { app, server };