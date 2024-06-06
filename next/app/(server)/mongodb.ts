import { IS_TEST_DEV_ENV } from "@/lib/utils";
import mongoose, { Connection } from "mongoose";

const MONGO_URL: string | undefined = process.env.MONGODB_URI;
//? Cache for database connection
let cachedConnection: Connection | null = null;

// Function to establish a connection to MongoDB
export async function initMongoDB(): Promise<Connection> {
  if (!MONGO_URL) throw "MONGO_URL is undefined";
  // If a cached connection exists, return it
  if (cachedConnection) {
    IS_TEST_DEV_ENV ? console.log("DEV: Using cached db connection") : null;
    return cachedConnection;
  }
  try {
    // If no cached connection exists, establish a new connection to MongoDB
    const cnx = await mongoose.connect(MONGO_URL);
    // Cache the connection for future use
    cachedConnection = cnx.connection;
    IS_TEST_DEV_ENV
      ? console.log("DEV: New mongodb connection established")
      : null;
    return cachedConnection;
  } catch (error) {
    // Will be logged in vercel logs
    console.log(error);
    throw error;
  }
}
