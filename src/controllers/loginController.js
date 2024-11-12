const Login = require('../models/loginModel')

//Home
exports.index = (req, res) => {

    if (!req.session.user) {
        res.render('login')
    }
    else {
        res.redirect('/')
    }
    return;
}

exports.register = async (req,res) => {
    try {
        const login = new Login(req.body);
        await login.register();
        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function() {
                return res.redirect('index');
            });
            return;
        }
    
        req.flash('success', 'User Created!!');
        req.session.save(function() {
            return res.redirect('index');
        });

    } catch(e) {
        console.log(e);
        res.render('404');
    } 
}

exports.login = async (req,res) => {
    try {
        const login = new Login(req.body);
        await login.login();
        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function() {
                return res.redirect('index');
            });
            return;
        }
    
        req.flash('success', 'User Logged!!');
        req.session.user = login.user;
        req.session.save(function() {
            return res.redirect('/');
        });

    } catch(e) {
        console.log(e);
        res.render('404');
    } 
}

exports.logout = (req,res) => {
    req.session.destroy();
    res.redirect('/login/index');
}