const express = require('express');
const app = express();
const routerRoot = require('../routes/root');
const routerNotFound = require('../routes/notFound');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const session = require('express-session');
const { signUpFunc, loginFunc } = require('./auth');

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
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session(StoreOptions));
app.use(passport.initialize());
app.use(passport.session());

passport.use('login', loginFunc);
passport.use('signup', signUpFunc);

app.use('/api', routerRoot);
app.use('/*', routerNotFound)

module.exports = app;
