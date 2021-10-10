const Post = require('../models/Post');

// Create new Post
exports.createPost = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedpost = await newPost.save();
    res.status(200).json(savedpost);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update post
exports.updatePostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json('You can update only your posts!');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete post
exports.deletePostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json('Post deleted successfully!');
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json('You can delete only your posts!');
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get Post
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json('Post not found, create a new one!');
    }

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get All Posts
exports.getAllPosts = async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;

  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};
