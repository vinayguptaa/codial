const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codial_developement');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "error connecting to mongoDB ❌"));

db.once('open', function() {
    console.log('Successfully connected to the mongoDB 🚀');
});

module.exports = db;