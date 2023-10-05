const { MongoClient } = require("mongodb");

async function connect() {
    const url = "mongodb://localhost:27017";
    const dbName = "job_postings";
    const client = new MongoClient(url, { useUnifiedTopology: true });

    await client.connect();

    return { client, db: client.db(dbName) };
}

module.exports = connect;
