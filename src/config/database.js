const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
"mongodb+srv://admin:admin@namastenode.cynfh3s.mongodb.net/devTinder"  );
};


module.exports = connectDB
