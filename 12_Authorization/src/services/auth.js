const passport = require('passport');
const { initMongoDB } = require('../daos/connection');
const LocalStrategy = require('passport-local').Strategy;
const { UserModel } = require('../daos/models/userSchema');

const strategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
};

const signup = async (req, email, password, done) => {
    await initMongoDB();
    try {
        const newUser = await UserModel.create({ email, password });
        return done(null, newUser);
    } catch (error) {
        if (error.code === 11000) return done(null, false, { message: 'Usuario ya existe', status: 'fail' });
        console.log(error);
        return done(null, false, { message: 'Error inesperado', status: 'fail' });
    }
};
const login = async (req, email, password, done) => {
    await initMongoDB();
    const user = await UserModel.findOne({ email, password });
    if (!user) return done(null, false);
    return done(null, user);
};

const loginFunc = new LocalStrategy(strategyOptions, login);
const signUpFunc = new LocalStrategy(strategyOptions, signup);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
    const user = await UserModel.findById(userId);
    return done(null, user);
});

module.exports = { signUpFunc, loginFunc };
