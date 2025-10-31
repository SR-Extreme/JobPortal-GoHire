const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
require('dotenv').config();

let gfs;
let bucket;
let conn;

const initGridFS = async () => {
  if (!conn) {
    const mongoURI = process.env.MONGO_URI_RECRUITERS || "mongodb://localhost:27017/recruiter_db";
    
    conn = mongoose.createConnection(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    conn.once('open', () => {
      console.log('✅ Admin GridFS connected');

      bucket = new GridFSBucket(conn.db, {
        bucketName: 'uploads'
      });

      gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'uploads'
      });
    });
  }
  
  return { gfs, bucket, conn };
};

module.exports = { initGridFS };

