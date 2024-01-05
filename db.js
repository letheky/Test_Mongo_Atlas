const {
    MongoClient
} = require('mongodb')
require('dotenv').config()
const uri = process.env.MONGODB_URI
let dbConnection

module.exports = {
    connectToDb: (callback) => {
        MongoClient.connect(uri)
            .then((client) => {
                //specific database name that you want to connect to
                dbConnection = client.db('sample_airbnb')
                return callback()
            })
            .catch((err) => {
                console.log("An error occurs", err)
                return callback(err)
            })
    },
    getDb: () => dbConnection
}