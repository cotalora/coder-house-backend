const passport = require('passport');

const passportOptions = { badRequestMessage: 'falta email / password' };

const renderLogin = (req, res) => {
    !validateLogin(req.session.info) ? 
    res.render('loginForm', { layout: 'login.hbs' }) :
    res.redirect('/')
}

const login = (req, res) => {
    const { email } = req.body;
    req.session.info = { email };
    res.status(200).json({message: 'ok'})
}

const renderLogout = (req, res) => {
    if(!!req.session.info?.email) {
        res.render('logoutStructure', { layout: 'logout.hbs', email: req.session.info?.email });
        req.session.destroy()
    } else {
        res.redirect('/')
    }
}

const renderRegister = (req, res) => {
    !validateLogin(req.session.info) ? 
    res.render('registerForm', { layout: 'register.hbs' }) :
    res.redirect('/')
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

const isLogged = (req, res, next) => {
    validateLogin(req.session.info) ? next() : res.redirect('/login')
}

const validateLogin = (infoUser) => {
    return !!infoUser?.email;
}

module.exports = {
    renderLogin,
    isLogged,
    login,
    renderLogout,
    renderRegister,
    register
}