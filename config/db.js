const mongoose = require("mongoose");

exports.connect = async () => {
  mongoose
    .connect("mongodb+srv://root:getonERP%402021%23@cluster0.kywfd.mongodb.net/erp?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,        
        serverSelectionTimeoutMS: 5000,
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};