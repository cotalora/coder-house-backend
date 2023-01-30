const passport = require('passport');

const passportOptions = { badRequestMessage: 'falta email / password' };

const login = (req, res) => {
    const { email } = req.body;
    req.session.info = { email };
    res.status(200).json({message: 'ok'})
}

const register = (req, res, next) => {
    passport.authenticate('signup', passportOptions, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user)  return res.status(401).json(info)
        res.json({message: 'ok'})
    })(req, res, next);
}

module.exports = {
    login,
    register
}