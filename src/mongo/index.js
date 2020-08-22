const Connect = require("./connect.js");

const mongoHost = process.env.MONGO_HOST || "mongodb://localhost:27017";
const mongoDatabase = process.env.MONGO_DB || "inventory_app";

module.exports = async () => {
    const database = await Connect(mongoHost, mongoDatabase);
    const computers = database.collection("computers");
    return {
        list: (fields = undefined) => {
            fields = { _id: 1, ...fields };
            return new Promise((resolve, reject) => {
                computers.find({}, { projection: fields }).toArray((err, docs) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(docs);
                    }
                });
            });
        },
        update: (id, body) => {
            return new Promise((resolve, reject) => {
                computers.update({ _id: id}, body, { upsert: true }, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        },
        find: (id) => {
            return new Promise((resolve, reject) => {
                computers.findOne({ _id: id }, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        }
    };
};
