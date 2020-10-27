const project = require('../models/project')();
module.exports = () => {
  const getUserController = async (req, res) => {
    res.json(await project.get());
  };
  const getBySlug = async (req, res) => {
    res.json(await project.get(req.params.slug));
  };
  const postUserController = async (req, res) => {
    let slug = req.body.slug;
    let name = req.body.name;
    let description = req.body.description;

    const result = await project.add(slug, name, description);
    res.json(result);
  };
  return {
    getUserController,
    getBySlug,
    postUserController,
  };
};
