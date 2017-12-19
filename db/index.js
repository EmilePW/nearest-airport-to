const { Client } = require("pg");
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});
client.connect();
const models = require("./models/");
const Q = require("./helpers/queryInterface")(client, models);

module.exports = {
  Q
};
