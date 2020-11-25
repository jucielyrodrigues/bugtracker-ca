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
      mongoClient.connect(uri, option, (err, client) => {
        if (err) {
          console.log(err);
          return reject('connection failed');
        }

        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.find(query).toArray((err, docs) => {
          if (err) {
            console.log(err);
            return reject('Failed in the find fuction');
          }
          resolve(docs);
          client.close();
        });
      });
    });
  };
  const add = (collectionName, item) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, option, (err, client) => {
        if (err) {
          console.log(err);
          return reject('connection failed');
        }
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.insertOne(item, (err, results) => {
          if (err) {
            console.log(err);
            return reject(' failed the fuction add');
          }
          resolve(results);
          client.close();
        });
      });
    });
  };
  const count = (collectionName) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, option, (err, client) => {
        if (err) {
          console.log(err);
          return reject('connection failed');
        }
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.countDocuments({}, (error, results) => {
          if (err) {
            console.log(err);
            return reject('count funciton has failed');
          }
          resolve(results);
          client.close();
        });
      });
    });
  };
  const update = (collectionName, pipeline) => {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, option, (error, client) => {
        if (err) {
          console.log(err);
          return reject('connection failed');
        }
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.updateOne(pipeline[0], pipeline[1], (err, results) => {
          if (err) {
            console.log(err);
            return reject('upadate failed');
          }
          resolve(results);
          client.close();
        });
      });
    });
  };

  const aggregate = (collectionName, pipeline = {}) => {
    return new Promise((resolve, reject) => {
      mongoClient.connect(uri, option, (err, client) => {
        if (err) {
          console.log(err);
          return reject('connection failed');
        }
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.aggregate(pipeline).toArray((err, docs) => {
          if (err) {
            console.log(err);
            return reject(' aggregate fucntion has failed');
          }
          resolve(docs);
          client.close();
        });
      });
    });
  };
  return {
    get,
    add,
    count,
    update,
    aggregate,
  };
};
