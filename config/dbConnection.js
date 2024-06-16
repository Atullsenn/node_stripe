const mongoose = require('mongoose');
require('dotenv').config();
const {DB_URL} = process.env


const db = async()=>{
    try{
        const connection = await mongoose.connect(DB_URL)
        console.log('DB CONNECTED SUCCESSFULLY')
    }
    catch(error){
        console.log(`ERROR CONNECTED TO DB ${error.message} `)
    }
}


module.exports = db;