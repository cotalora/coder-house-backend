const { Router } = require("express");
const passport = require("passport");
const { isLogged, login, register, renderLogin, renderLogout, renderRegister } = require("../controllers/login");

const router = Router();
const passportOptions = { badRequestMessage: 'falta email / password' };

router.get('/', isLogged, (req, res) => res.render('main', { layout: 'index.hbs', email: req.session.info?.email }));
router.get('/login', renderLogin);
router.post('/login', passport.authenticate('login', passportOptions), login);
router.get('/signup', renderRegister);
router.post('/signup', register);
router.get('/logout', renderLogout);

router.get('/*', (req, res) => {
    res.redirect('/')
});

module.exports = router;