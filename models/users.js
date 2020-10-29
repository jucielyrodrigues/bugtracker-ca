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
  const getByKey = async (key) => {
    if (!key) {
      console.log('01: no key');
      return null;
    }
    const users = await db.get(collection, { key });
    if (users.length !== 1) {
      console.log('02: bad key');
    }
    return users[0];
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
    getByKey,
  };
};
