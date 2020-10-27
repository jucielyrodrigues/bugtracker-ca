const users = require('../models/users')();

module.exports = () => {
  const getUserController = async (req, res) => {
    res.json(await users.get());
  };
  const getByEmail = async (req, res) => {
    res.json(await users.get(req.params.email));
  };
  const postUserController = async (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let usertype = req.body.usertype;
    let key = req.body.key;

    const result = await users.add(name, email, usertype, key);
    res.json(result);
  };
  return {
    getUserController,
    getByEmail,
    postUserController,
  };
};
