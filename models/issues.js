const db = require('../db.js')();
const ObjectId = require('mongodb').ObjectId;
const collection = 'issues';

module.exports = () => {
  const get = async (issueNumber = null) => {
    if (!issueNumber) {
      const result = await db.get(collection);
      return result;
    }
    const issues = await db.get(collection, { slug: issueNumber });
    return issues;
  };
  const getByProjectId = async (issueNumber) => {
    let expression = new RegExp(issueNumber);
    const byProject = await db.get(collection, { slug: expression });
    return byProject;
  };
  const add = async (slug, title, description, status, projectId) => {
    const counter = await db.count(collection);
    const results = await db.add(collection, {
      slug: `${slug}-${counter + 1}`,
      title: title,
      description: description,
      status: status,
      projectId: new ObjectId(projectId),
      comments: [],
    });
    return results.result;
  };

  return {
    get,
    add,
    getByProjectId,
  };
};
