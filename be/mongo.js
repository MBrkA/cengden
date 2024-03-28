const { customLogger } = require('./logger');

async function connectMongo(client) {
    // Use connect method to connect to the Server
    await client.connect();
    customLogger('Connected to the database');
}
async function closeMongo(client) {
    await client.close();
    customLogger('Closed the database connection');
}

async function listDatabases(client) {
    return await client.db().admin().listDatabases();
    //console.log("Databases:");
    //databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

module.exports = { connectMongo, listDatabases };
