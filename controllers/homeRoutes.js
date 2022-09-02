const router = require('express').Router();
const { User, Blog } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            include: [
                {
                    model: Blog,
                    attributes: ['title', 'content'],
                }
            ]
        })
        const users = userData.map((users) => users.get({ plain: true }));
        res.render('home', {
            users,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect them to dashboard
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    // If the user is already logged in, redirect them to dashboard
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('signUp');
});

module.exports = router;