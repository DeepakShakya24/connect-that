const mongoose = require("mongoose");

const db = require("./keys").MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Database connect successfully");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;
