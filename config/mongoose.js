// COnnect to library
const mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb://localhost/contacts_listdb');

// Acquire the connection {to cheeck if it is successful)
const db = mongoose.connection;

// error
db.on("error",console.error.bind(console , 'error connecting rto db'));

// up and running then run this message
db.once('open' , function(){
    console.log('Successfully connected to database');
});