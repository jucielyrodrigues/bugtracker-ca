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
  const add = async (name, email, usertype, key) => {
    const results = await db.add(collection, {
      name: name,
      email: email,
      usertype: usertype,
      key: key,
    });
    return results.result;
  };
  return {
    get,
    add,
  };
};
