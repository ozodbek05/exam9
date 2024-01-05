import { connect } from "mongoose";

async function dbConnection() {
  try {
    await connect("mongodb://127.0.0.1:27017/imtixon");
    console.log("db is connected");

    return true;
  } catch (err: any) {
    console.error(err);
    return false;
  }
}

export { dbConnection };