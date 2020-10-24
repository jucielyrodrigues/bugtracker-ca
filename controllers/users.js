const users = require('../models/users')();
module.exports = () => {
  const getUserController = async (req, res) => {
    res.json(await users.get());
  };
  const getByEmail = async (req, res) => {
    res.json(await users.get(req.params.email));
  };
  return {
    getUserController,
    getByEmail,
  };
};
