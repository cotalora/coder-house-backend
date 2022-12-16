const express = require('express');
const passport = require('passport');
const { engine } = require('express-handlebars');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { initWsServer } = require('./socket');
const path = require('path');
const { signUpFunc, loginFunc } = require('./auth');
const routes = require('../routes/mainRoutes.routes');

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
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'hbs');
app.set('views', viewsFolderPath);

app.engine('hbs', engine({
    layoutsDir: layoutsFolderPath,
    extname: 'hbs',
}));

initWsServer(server);

passport.use('login', loginFunc);
passport.use('signup', signUpFunc);

app.use('/', routes);

module.exports = { app, server };