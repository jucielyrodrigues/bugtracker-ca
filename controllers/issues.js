const issues = require('../models/issues')();

module.exports = () => {
  const getController = async (req, res) => {
    const { issues, error } = await issues.get();
    if (error) {
      res.status(500).json({
        error,
      });
    }
    res.json(issues);
  };
  const getByProject = async (req, res) => {
    const { issues, error } = await issues.get(req.params.issueNumber);
    if (error) {
      res.status(500).json({
        error,
      });
    }
    res.json(issues);
  };
  const getByIssue = async (req, res) => {
    const { issues, error } = await issues.get(req.params.slug);
    if (error) {
      res.status(500).json({
        error,
      });
    }
    res.json(issues);
  };
  const postController = async (req, res) => {
    let slug = req.params.slug;
    let title = req.body.title;
    let description = req.body.description;
    let status = req.body.status;
    let projectId = req.body.projectId;

    const { results, error } = await issues.add(
      slug,
      title,
      description,
      status,
      projectId,
    );
    if (error) {
      res.status(500).json({
        error,
      });
    }
    res.json(results);
  };
  return {
    getController,
    getByIssue,
    getByProject,
    postController,
  };
};
