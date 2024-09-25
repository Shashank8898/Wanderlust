const express = require('express');
const app = express();
const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');
// Basic Mongoos connection code
async function main(){
    mongoose.connect('mongodb://127.0.0.1:27017/Wanderlust');//Always mention the name of your database here
    }
    main().then(()=>{
        console.log('Connected to MongoDB');
    }).catch((err)=>{
        console.log('Error connecting', err);
    })

const initDb = async()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner:"66f285cee5cb88ab19a05981"}))
    await Listing.insertMany(initData.data);
    console.log('Database initialized with sample data');
}
initDb();