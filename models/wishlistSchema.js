
//import mongoose
const mongoose = require('mongoose');

//define schema for wishlists collection to store data
const wishlistSchema = new mongoose.Schema({
    
    id:{
        type:Number,
        required:true,
        unique:true
    },

    title:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:true
    },

   

    image:{
        type:String,
        required:true
    },

 
})

//Create a model to store wishlists
const wishlists = new mongoose.model('wishlists', wishlistSchema)

//export model
module.exports = wishlists