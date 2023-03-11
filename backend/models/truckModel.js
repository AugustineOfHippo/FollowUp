const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Part = require('./partModel')

const truckSchema = new Schema({
    make:String,
    models: [{
        name:String,
        totalProfit:Number
    }],
    year:Number,
    totalProfit:Number
})


module.exports = mongoose.model('Truck',truckSchema);
