const mongoose = require('mongoose');


// MongoDB connection URI
const mongoURI = "mongodb://127.0.0.1:27017/lab6";

// Function to connect to MongoDB
const connectToMongo = async () => {
    try {
        console.log("Initiating connection!");
        // Establish connection to MongoDB
        await mongoose.connect(mongoURI);
        console.log(`Connected to ${mongoURI}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = connectToMongo;
