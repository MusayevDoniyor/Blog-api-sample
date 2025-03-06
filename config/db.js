const mongoose = require("mongoose");

const mongo_url = process.env.MONGO_CONNECT_URL.replace(
  "<db_password>",
  process.env.MONGO_CONNECT_PASSWORD
);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongo_url);

    console.log(`MongoDb connected: ${conn.connection.host} ✅`);
  } catch (error) {
    console.error(`MongoDB Error: ${error.message} ❌`);
    process.exit(1);
  }
};

module.exports = connectDB;
