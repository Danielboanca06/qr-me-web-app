"use server";
import { GridFSBucket, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;

let gfs: GridFSBucket;

const initGridFS = async () => {
  if (!gfs) {
    const client = await MongoClient.connect(uri, {});

    const db = client.db(); // Get the MongoDB database instance
    gfs = new GridFSBucket(db, {
      bucketName: "images", // Specify your GridFS bucket name
    });
  }

  return gfs;
};

const getGridFS = async () => {
  if (!gfs) {
    await initGridFS();
  }

  return gfs;
};

export { initGridFS, getGridFS };
