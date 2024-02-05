import { MongoClient } from "mongodb";

const clientDB = async () => {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    return client;
} catch (error) {
    console.error('Error in connection to MongoDB:', error);
    return null;
  }
}

export default clientDB;
