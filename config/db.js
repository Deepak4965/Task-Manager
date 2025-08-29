const mongoose = require('mongoose')

//Define the MongoDB connection URL
const MongoDB_URL = process.env.MongoDB_URL

mongoose.connect(MongoDB_URL, {})

//Get the default connection
//Mongoose maintains a default connection object representing the MongoDB connection.
const db = mongoose.connection;

//Define event listerners for database connection
db.on('connect', () => {
    console.log("Connected to MongoDB server");
})

db.on('error', (err) => {
    console.log("MongoDB connection error", err);
})

db.on('disconnected', () => {
    console.log("MOngoDB disconnected");
})

//Export the database connection
module.exports = db