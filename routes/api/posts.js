const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const User = require('../../models/User');

//@route POST api/posts
//@desc Create a post
//@access Private
router.post(
  '/',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });
      const post = await newPost.save();
      res.send(post);
    } catch (error) {
      res.status(500).send('Server error');
    }
  }
);

//@route GET api/posts
//@desc Get all posts
//@access Public
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

//@route GET api/posts/:post_id
//@desc Get a post by id
//@access Public
router.get('/:post_id', async (req, res) => {
  try {
    const posts = await Post.findById(req.params.post_id);
    if (!posts) {
      return res.status(404).json({ msg: 'Post not exist' });
    }
    res.json(posts);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not exist' });
    }
    console.log(error);
    res.status(500).send('Server error');
  }
});

//@route DELETE api/posts/:post_id
//@desc Delete a post by id
//@access Private
router.delete('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ msg: 'Post does not exist' });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await post.remove();
    res.json('Post is removed');
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post does not exist' });
    }

    res.status(500).send('Server error');
  }
});
//@route PUT api/posts/like/:post_id
//@desc Like a post
//@access Private
router.put('/like/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ msg: 'Post does not exist' });
    }
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'User already liked the post' });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.send('post liked');
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post does not exist' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;
