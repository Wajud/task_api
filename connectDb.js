const mongoose = require("mongoose");

const connectDb = () => {
  return mongoose.connect(
    "mongodb+srv://WajudTodos:uI74iB4CvZbom8Ae@testcluster1.lrt5ysx.mongodb.net/newTodos"
  );
};

module.exports = connectDb;
