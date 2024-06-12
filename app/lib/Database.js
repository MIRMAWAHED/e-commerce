import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;

const ConnectDB = async () => {
  try {
    await mongoose.connect(
MONGODB_URI,      {
        dbName: "user_data",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
  return true;
};

export default ConnectDB;
