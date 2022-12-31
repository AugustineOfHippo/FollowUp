const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    status:String,
    name:String,
    phone:String,
    truck:String,
    part:String,
    price:Number,
    notes:String,
    date:Date,
    day:Number,
    month:Number,
    year:Number
})


module.exports = mongoose.model('Customer',customerSchema);
