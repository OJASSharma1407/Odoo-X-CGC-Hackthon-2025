const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
const cors = require('cors');
    app.use(cors());


//Middle Ware
app.use(express.json());

//Connect DataBase
mongoose.connect('mongodb+srv://hello14sharma:N0YSkAp0WCVD2ek1@cluster0.0kabnvk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
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