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
    // If the user is already logged in, redirect them to home
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    // If the user is already logged in, redirect them to home
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('signUp');
});

router.get('/dashboard', (req, res) => {
    // Render the dashboard if the user is logged in
    if (req.session.logged_in) {
        res.render('dashboard', { logged_in: req.session.logged_in });
        return;
    }
    // If the user is not logged in, redirect them to signUp page
    res.redirect('/signUp');
});
  
router.get('/blog/:id', async (req, res) => {
    try {
      const blogData = await Blog.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      const blog = blogData.get({ plain: true });
  
      res.render('blog', {
        ...blog,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;