const router = require('express').Router();
const userController = require('../controllers/user-controllers');

// Update User
router.put('/:id', userController.updateUserById);

// Delete User
router.delete('/:id', userController.deleteUserById);

// Get User
router.get('/:id', userController.getUserById);

module.exports = router;
