const router = require('express').Router();
const postController = require('../controllers/post-controllers');

// Create new post
router.post('/', postController.createPost);

// Update new post
router.put('/:id', postController.updatePostById);

// Delete post
router.delete('/:id', postController.deletePostById);

// Get post
router.get('/:id', postController.getPostById);

// Get All posts
router.get('/', postController.getAllPosts);

module.exports = router;
