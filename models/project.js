const db = require('../db.js')();
const collection = 'projects';
module.exports = () => {
  const get = async (slug = null) => {
    if (!slug) {
      const allSlug = await db.get(collection);
      return result;
    }
    const slug = await db.get(collection, { slug });
    return slug;
  };
  const add = async (slug, name, decription) => {
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
