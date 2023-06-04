const express = require('express');
const mongo = require('mongodb');
const { MongoClient } = require('mongodb');
const app = express();

// Connection URL
const url = 'mongodb://localhost:27017/'; // Replace with your MongoDB connection string

// Database and collection names
const dbName = 'FirstDatabase';
const collectionName = 'content';

// Create a new MongoClient
const client = new MongoClient(url);

// Connect to the MongoDB server
// client.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MongoDB:', err);
//         return;
//     }

//     // Connected successfully
//     console.log('Connected to MongoDB');

//     // Access the database
//     const db = client.db(dbName);
//     const collection = db.collection(collectionName);

//     // Perform database operations here
//     // var result = db.coll
//     // Close the connection
//     client.close();
// });
async function runQuery() {
    try {

        // Connect to the MongoDB server
        // await client.connect();
        // console.log('Connected to MongoDB');

        // Access the database and collection
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Run the query
        // const query = { name: 'messi' }; // Example query to find documents where age is greater than or equal to 25
        // const result = await collection.find(query).toArray();

        // var result = await collection.insertOne({
        //     "title": "sql",
        //     "content": "sequalize"
        // });
        var deleteData;
        // find item and delete it if does not exist then delete collection
        var findData = await collection.find({ title: 'sql' }).limit(1).toArray();
        if (findData && findData.length > 0) {
            console.log(findData[0]._id);
            deleteData = await collection.deleteOne({ _id: findData[0]._id });
        } else {
            let remove = await collection.drop();
            console.log(remove);
        }

        console.log('result:', deleteData);
    } catch (err) {
        console.error('Error running query:', err);
    } finally {
        await client.close();
        console.log('Connection closed');
    }
}

// Run the query function
runQuery();