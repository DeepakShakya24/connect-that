const mongoose = require("mongoose");

const db='mongodb://mongo:27017/UserData'

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
