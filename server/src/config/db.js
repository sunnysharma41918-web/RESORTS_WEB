const mongoose = require('mongoose');
const dns = require('dns');

// Fix for Windows DNS resolution for MongoDB SRV records
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // Ignore if not supported
}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 8000,
    });

    console.log(`\x1b[32m✔ MongoDB Connected: ${conn.connection.host} (${conn.connection.name})\x1b[0m`);
    return conn;
  } catch (error) {
    console.error(`\x1b[31m✖ MongoDB Connection Error: ${error.message}\x1b[0m`);
    console.log('\x1b[33mℹ Note: If connecting to Atlas, make sure Network Access in MongoDB Atlas allows IP Address (0.0.0.0/0).\x1b[0m');
  }
};

module.exports = connectDB;
