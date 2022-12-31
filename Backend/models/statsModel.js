const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statsSchema = new Schema({
    closedSales:Number,
    pendingSales:Number,
    lostSales:Number,
    closedCalls:Number,
    pendingCalls:Number,
    lostCalls:Number
})

module.exports = mongoose.model('Stats',statsSchema)