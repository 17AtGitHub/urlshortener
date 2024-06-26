const mongoose = require("mongoose");

async function connectDB (connectionURL) {
  try {
    await mongoose.connect(connectionURL);
  } catch (error) {
    console.log("DB Connection Error: ", error);
    throw error;
  }
}

module.exports = connectDB;
