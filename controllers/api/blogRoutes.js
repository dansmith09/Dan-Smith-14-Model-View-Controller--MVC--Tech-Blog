const router = require('express').Router();
const { Blog, User, Comments } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get all blog data 
router.get('/', async (req, res) => {
  try{
      const blogData = await Blog.findAll({
          include: [{ model: User, Comments}]
      });
      res.status(200).json(blogData);
  } catch(err) {
      res.status(500).json(err);
  }
});

// Get all blog data associated with user
router.get('/user', async (req, res) => {
  try{
      const UserBlogData = await Blog.findAll({
          include: [{ model: User}],
          where:{
              user_id: req.session.user_id
          }
      });
      res.status(200).json(UserBlogData);
  } catch(err) {
      res.status(500).json(err);
  }
});

// Get blog by ID
router.get('/:id', async (req,res) => {
  try {
      const blogData = await Blog.findByPk(req.params.id, {
        include:[
          {
            model: User,
            attributes: ['id','username']
          }
        ]
      });

      if (!blogData) {
          res.status(500).json({message: 'No blog entry found with that id!'});
          return;
      }
      res.status(200).json(blogData);
  } catch(err) {
      res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No Blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
