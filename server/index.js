const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
require('dotenv').config();
const db_url = process.env.mongo_url;
const cors = require('cors');
    app.use(cors());


//Middle Ware
app.use(express.json());

//Connect DataBase
mongoose.connect(`${db_url}`)
.then(()=>{
    console.log('DB is connected');
}).catch((err)=>{
    console.log(err);
})

//Routes
app.use('/userAuth',require('./routes/userAuth'))

app.listen(port,()=>{
    console.log(`Connected on port ${port}`);
})
module.exports = app;