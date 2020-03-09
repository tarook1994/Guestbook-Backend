const User = require("../models/User");

exports.createUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(200).json({ user, token });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res.status(401).json({ error: "Login Failed" });
    }
    const token = await user.generateAuthToken();
    return res.status(200).json({ user, token });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.getUserProfile = async (req, res, next) => {
  res.status(200).json(req.user);
};

exports.changePassword = async (req, res, next) => {
  try {
    const { newPassword } = req.body;
    req.user.password = newPassword;
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.status(200).json({message:"Changed Password"});
  } catch(err) {
    res.status(500).json(err)
  }
};

exports.logout = async (req, res, next) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token != req.token;
    });
    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.logoutAll = async (req, res, next) => {
  try {
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
};
