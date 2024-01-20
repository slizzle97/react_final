const mongoose = require("mongoose");

module.exports = async () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    const dbConnection = await mongoose.connect(
      process.env.DB,
      connectionParams
    );
    console.log("Connected to database successfully");
    return dbConnection;
  } catch (error) {
    console.error("Could not connect to the database!");
    console.error(error);
    throw error;
  }
};
