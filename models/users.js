const db = require('../db.js')();
const collection = 'users';
module.exports = () => {
  const get = async (email = null) => {
    if (!email) {
      const result = await db.get(collection);
      return result;
    }
    const user = await db.get(collection, { email });
    return user;
  };
  return {
    get,
  };
};
