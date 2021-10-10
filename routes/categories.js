const router = require('express').Router();
const catController = require('../controllers/cat-controllers');

// Create category
router.post('/', catController.createCategory);

// Get all categories
router.get('/', catController.getAllCategories);

module.exports = router;
