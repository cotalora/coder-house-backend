const express = require('express');
const { engine } = require('express-handlebars');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { initWsServer } = require('./socket');
const path = require('path');
const { login, isLogged, renderLogin, renderLogout, info } = require('../controllers/login');

const app = express();
const server = require('http').Server(app);

const viewsFolderPath = path.resolve(__dirname, '../../views');
const layoutsFolderPath = `${viewsFolderPath}/layouts`;

const StoreOptions = {
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_CONNECTION,
        ttl: 180000,
        autoRemoveInterval: 1000,
        crypto: {
            secret: 'secret'
        }
    }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 180000
    }
}

app.use(express.json());
app.use(cookieParser());
app.use(session(StoreOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'hbs');
app.set('views', viewsFolderPath);

app.engine('hbs', engine({
    layoutsDir: layoutsFolderPath,
    extname: 'hbs',
}));

initWsServer(server);

app.get('/', isLogged, (req, res) => res.render('main', { layout: 'index.hbs', userName: req.session.info?.userName }));
app.get('/login', renderLogin);
app.post('/login', login);
app.get('/logout', renderLogout);

app.get('/*', (req, res) => {
    res.redirect('/')
});

module.exports = { app, server };