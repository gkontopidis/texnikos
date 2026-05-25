import mongoose from "mongoose";
import dns from "dns";

// Fix for MongoDB Atlas SRV resolution issues in local environments
if (process.env.NODE_ENV === "development" || !process.env.VERCEL) {
  try {
    dns.setServers(["1.1.1.1", "8.8.8.8"]);
  } catch (e) {
    console.warn("Failed to set custom DNS servers:", e);
  }
}

// Sanitize the URI: trim spaces and remove accidental quotes
const MONGODB_URI = (process.env.MONGODB_URI || "").trim().replace(/^["']|["']$/g, "");

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env");
}

if (!MONGODB_URI.startsWith("mongodb")) {
  throw new Error("Invalid MONGODB_URI format. It should start with 'mongodb://' or 'mongodb+srv://'");
}

// Global cache for connection (critical for Vercel/serverless)
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      dbName: "texnikos",
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("MongoDB connected successfully");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null; // Reset promise on failure to allow retry
    throw e;
  }

  return cached.conn;
}
