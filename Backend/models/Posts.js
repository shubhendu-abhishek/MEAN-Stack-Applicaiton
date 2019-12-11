const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const postSchems = new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    owner:{
        type:String,
        required:true
    },
    like:{
        type:Number
    }
},{timestamps:true});

module.exports = mongoose.model('Posts',postSchems);