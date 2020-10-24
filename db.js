const uri = process.env.MONGO_URI;
const mongoClient = require('mongodb').MongoClient;
const option = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};
const dbName = 'mydb';
module.exports = () => {
  const get = (collectionName, query = {}) => {
    return new Promise((resolve, reject) => {
      mongoClient.connect(uri, option, (error, client) => {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.find(query).toArray((error, docs) => {
          resolve(docs);
          client.close();
        });
      });
    });
  };
  return {
    get,
  };
};
