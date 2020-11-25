const db = require('../db')();
const collection = 'projects';

module.exports = () => {
  const get = async (slug = null) => {
    if (!slug) {
      try {
        const slug = await db.get(collection);
        return { slug };
      } catch (err) {
        console.log(err);
        return {
          error: err,
        };
      }
    }
    try {
      const slug = await db.get(collection, { slug });
      return { slug };
    } catch (err) {
      console.log(err);
      return {
        error: err,
      };
    }
  };

  const add = async (slug, name, description) => {
    if (!slug || !name || !description) {
      return {
        error: 'Complete all the fields',
      };
    }
    try {
      const slugName = await db.get(collection, {
        slug: slug,
      });
      if (slugName.length > 0) {
        return {
          results: 'Project already exist',
        };
      }
      const results = await db.add(collection, {
        slug: slug,
        name: name,
        description: description,
      });
      return { results };
    } catch (err) {
      console.log(err);
      return {
        error: err,
      };
    }
  };
  return {
    get,
    add,
  };
};
