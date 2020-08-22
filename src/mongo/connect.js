const Client = require("mongodb").MongoClient;

module.exports = (mongoHost, mongoDatabase) => {
    return new Promise((resolve, reject) => {
        Client.connect(mongoHost, { useUnifiedTopology: true }, (err, client) => {
            if (err) {
                reject(err);
            } else {
                resolve(client.db(mongoDatabase));
            }
        });
    });
};