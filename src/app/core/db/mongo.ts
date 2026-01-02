import { attachDatabasePool } from "@vercel/functions";
import { MongoClient } from "mongodb";

const client = new MongoClient(`${process.env.MONGODB_URI}`, {});
attachDatabasePool(client);

export const getCollection = async (collectionName: string) => {
  await client.connect();
  const db = client.db(`${process.env.MONGODB_DBNAME}`);
  return db.collection(collectionName);
};
