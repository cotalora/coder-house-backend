const renderLogin = (req, res) => {
    !validateLogin(req.session.info) ? 
    res.render('loginForm', { layout: 'login.hbs' }) :
    res.redirect('/')
}

const login = (req, res) => {
    const { userName } = req.body;
    req.session.info = { userName };
    res.status(200).json({message: 'ok'})
}

const renderLogout = (req, res) => {
    if(!!req.session.info?.userName) {
        res.render('logoutStructure', { layout: 'logout.hbs', userName: req.session.info?.userName });
        req.session.destroy()
    } else {
        res.redirect('/')
    }
}

const isLogged = (req, res, next) => {
    validateLogin(req.session.info) ? next() : res.redirect('/login')
}

const validateLogin = (infoUser) => {
    return !!infoUser?.userName;
}

module.exports = {
    renderLogin,
    isLogged,
    login,
    renderLogout
}