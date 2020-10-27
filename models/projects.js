const db = require('../db')();
const collection = 'projects';
module.exports = () => {
  const get = async (slug = null) => {
    if (!slug) {
      const result = await db.get(collection);
      return result;
    }
    const slugs = await db.get(collection, { slug });
    return slugs;
  };
  const add = async (slug, name, description) => {
    const results = await db.add(collection, {
      slug: slug,
      name: name,
      description: description,
    });
    return results.result;
  };
  return {
    get,
    add,
  };
};
