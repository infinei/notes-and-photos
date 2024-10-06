import { Db, MongoClient } from "mongodb";

let dbConnection: Db;

export const connectToDB = (cb: (err?: unknown) => unknown) => {
  MongoClient.connect(process.env.DB_CONNECTION_STRING!)
    .then((client) => {
      dbConnection = client.db();
      return cb();
    })
    .catch((err) => {
      console.log(err);
      return cb(err);
    });
};

export const getDB = () => dbConnection;
