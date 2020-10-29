const comments = require('../models/comments')();

module.exports = () => {
  const getALL = async (req, res) => {
    res.json(await comments.getAllComments(req.params.issueNumber));
  };
  const getComment = async (req, res) => {
    res.json(await comments.getSingleComment(req.params.commentsId));
  };
  const postComment = async (req, res) => {
    let issueNumber = req.params.issueNumber;
    let text = req.body.text;
    let author = req.body.author;

    const result = await comments.addComment(issueNumber, text, author);
    res.json(result);
  };
  return {
    getALL,
    getComment,
    postComment,
  };
};
