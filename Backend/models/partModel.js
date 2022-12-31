const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const partSchema = new Schema({
    name:String,
    price:Number,
    timesSold:Number,
    make:String,
    model:String,
    year:Number
})


module.exports = mongoose.model('Part',partSchema);
