const db = require('../db.js')();
const ObjectId = require('mongodb').ObjectId;
const collection = 'issues';

module.exports = () => {
  const get = async (issueNumber = null) => {
    try {
      if (!issueNumber) {
        const issues = await db.get(collection);
        return { issues };
      }
      const issues = await db.get(collection, { slug: issueNumber });
      return { issues };
    } catch (err) {
      return {
        error: err,
      };
    }
  };

  const getByProjectId = async (issueNumber) => {
    let expression = new RegExp(issueNumber);
    try {
      const byProject = await db.get(collection, { slug: expression });
      return byProject;
    } catch (err) {
      return {
        error: err,
      };
    }
  };

  const add = async (slug, title, description, status, projectId) => {
    if (!slug || title || description || status) {
      return {
        error: 'Complete all the fields',
      };
    }

    try {
      const counter = await db.count(collection);
      const results = await db.add(collection, {
        slug: `${slug}-${counter + 1}`,
        title: title,
        description: description,
        status: status,
        projectId: new ObjectId(projectId),
        comments: [],
      });
      return { results };
    } catch (err) {
      return {
        error: err,
      };
    }
  };

  return {
    get,
    add,
    getByProjectId,
  };
};
