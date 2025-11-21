// src/lib/db/index.ts
import mongoose from 'mongoose';
import { connectToMongo, getMongoUri } from './utils';

const MONGODB_URI = "mongodb+srv://manav25gohil:NBOFnjuXZ8XWPVHw@cluster0.7du3n.mongodb.net/harmonyhub"

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var mongoose: { conn: any; promise: Promise<any> | null } | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached!.promise = connectToMongo(MONGODB_URI, opts);
  }
  cached!.conn = await cached!.promise;
  return cached!.conn;
}

export default dbConnect;
