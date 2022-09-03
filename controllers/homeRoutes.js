const router = require('express').Router();
const { User, Blog, Comments} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({ include: User, Comments })
        const blogs = blogData.map((blogs) => blogs.get({ plain: true }));

        res.render('home', {
            blogs,
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
    // If the user is not logged in, redirect them to signUp page
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('signUp');
});

router.get('/dashboard', (req, res) => {
    // If the user is already logged in, redirect them to dashboard
    if (req.session.logged_in) {
      res.render('dashboard');
      return;
    }
    res.redirect('/signUp');
});

// route to get all blogs
// router.get('/', async (req, res) => {
//     const blogData = await Blog.findAll().catch((err) => { 
//         res.json(err);
//       });
//         const blogs = blogData.map((blog) => blog.get({ plain: true }));
//         res.render('home', { blogs });
// });

module.exports = router;