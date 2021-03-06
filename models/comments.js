const db = require('../db.js')();
const ObjectId = require('mongodb').ObjectId;
const collection = 'issues';
module.exports = () => {
  const getAllComments = async (issueNumber) => {
    try {
      const PIPELINE = [
        { $match: { slug: issueNumber } },
        {
          $project: {
            comments: 1,
            _id: 0,
            issueNumber: 1,
          },
        },
      ];
      const getComment = await db.aggregate(collection, PIPELINE);
      return { getComment };
    } catch (err) {
      return { error: err };
    }
  };

  const getSingleComment = async (commentId) => {
    try {
      const PIPELINE = [
        { $match: { 'comments._id': ObjectId(commentId) } },
        {
          $project: {
            comments: {
              $filter: {
                input: '$comments',
                as: 'comment',
                cond: { $eq: ['$$comment._id', ObjectId(commentId)] },
              },
            },
            _id: 0,
            slug: 1,
          },
        },
      ];
      const comments = await db.aggregate(collection, PIPELINE);
      return { comments };
    } catch (err) {
      return { error: err };
    }
  };

  const addComment = async (issueNumber, text, author) => {
    if (!issueNumber || !text || !author) {
      return {
        error: 'Complete all the fields',
      };
    }

    try {
      const PIPELINE = [
        { slug: issueNumber },
        {
          $push: {
            comments: {
              _id: new ObjectId(),
              text: text,
              author: author,
            },
          },
        },
      ];
      const results = await db.update(collection, PIPELINE);
      return { results };
    } catch (err) {
      return { error: err };
    }
  };
  return {
    addComment,
    getAllComments,
    getSingleComment,
  };
};
