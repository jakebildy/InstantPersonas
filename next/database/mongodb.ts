import mongoose from "mongoose";

const MONGO_URL: string | undefined = process.env.MONGODB_URI;

// Connect to mongo db.
export async function initMongoDB(): Promise<void> {
  if (!MONGO_URL) throw "MONGO_URL is undefined";
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Mongoose Connected');
  }
  catch(error) {
    console.error(`Unable to connect to database(${MONGO_URL}) ${error}`);
    throw error;
  }
}

