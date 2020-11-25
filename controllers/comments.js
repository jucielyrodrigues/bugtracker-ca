const comments = require('../models/comments')();

module.exports = () => {
  const getALL = async (req, res) => {
    const { getComment, error } = await comments.getAllComments(
      req.params.issueNumber,
    );
    if (error) {
      res.status(500).json({
        error,
      });
    }
    if (error) {
      res.status(500).json({
        error,
      });
    }
    res.json(getComment);
  };
  const getComment = async (req, res) => {
    const { comments, error } = await comments.getSingleComment(
      req.params.commentsId,
    );
    res.json(comments);
  };
  const postComment = async (req, res) => {
    let issueNumber = req.params.issueNumber;
    let text = req.body.text;
    let author = req.body.author;

    const { results, error } = await comments.addComment(
      issueNumber,
      text,
      author,
    );
    if (error) {
      res.status(500).json({
        error,
      });
    }
    res.json(results);
  };
  return {
    getALL,
    getComment,
    postComment,
  };
};
