const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;
const db = require('./config/dbConnection');

// db

db().then();

// express app

const app = express()

// middilwares

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());



// controller

const userRouter = require('./routes/userRoute')

app.use('/api', userRouter);


app.listen(port, ()=>{
    console.log(`SERVER RUNNING ON PORT ${port}`)
})