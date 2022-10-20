const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const path = require('path');
const routerRoot = require('../routes/root');
const routerNotFound = require('../routes/notFound');
const routerProducts = require('../routes/renderProducts');

const viewsFolderPath = path.resolve(__dirname, '../../views');
const layoutsFolderPath = `${viewsFolderPath}/layouts`;
const partialsFolderPath = `${viewsFolderPath}/partials`;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'hbs');
app.set('views', viewsFolderPath);

app.engine('hbs', engine({
    layoutsDir: layoutsFolderPath,
    partialsDir: partialsFolderPath,
    extname: 'hbs',
}));

app.use('/api', routerRoot);
app.use('/productos', routerProducts);
app.use('/*', routerNotFound);

module.exports = app;

