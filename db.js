const { MongoClient } = require('mongodb');

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
  const add = (collectionName, item) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, option, (error, client) => {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.insertOne(item, (error, results) => {
          resolve(results);
          client.close();
        });
      });
    });
  };
  const count = (collectionName) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, option, (error, client) => {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.countDocuments({}, (error, results) => {
          resolve(results);
          client.close();
        });
      });
    });
  };
  return {
    get,
    add,
    count,
  };
};
