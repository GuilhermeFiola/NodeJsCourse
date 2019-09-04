const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isAuthenticated: false
    });
};

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        isAuthenticated: false
    });
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    bcrypt
        .hash(password, 12)
        .then(hashPassword => {
            return User.findOne({ email: email, password: hashPassword });
        })
        .then(user => {
            if (user) {
                req.session.isLoggedIn = true;
                req.session.user = user;
                req.session.save(err => {
                    console.log(err);
                    res.redirect('/');
                });
            } else {
                res.redirect('/login');
            }
        })
        .catch(err => console.log(err));

    // User.findById('5d2e71de4cfcc3466c8389e4')
    //     .then(user => {
    //         req.session.isLoggedIn = true;
    //         req.session.user = user;
    //         req.session.save(err => {
    //             console.log(err);
    //             res.redirect('/');
    //         });
    //     })
    //     .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    User.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) return res.redirect('/signup');

            return bcrypt.hash(password, 12);
        })
        .then(hashPassword => {
            const user = new User({
                email: email,
                password: hashPassword,
                cart: { items: [] }
            });
            return user.save();
        })
        .then(result => {
            return res.redirect('/login');
        })
        .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};
