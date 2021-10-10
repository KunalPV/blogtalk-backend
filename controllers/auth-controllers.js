const bcrypt = require('bcrypt');
const User = require('../models/User');

// Register
exports.registerUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPw = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPw,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Login
exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      res.status(400).json('User does not exist, create a new user!');
    }

    const validate = await bcrypt.compare(req.body.password, user.password);

    if (!validate) {
      res.status(400).json('Password do not match!');
    }

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};
