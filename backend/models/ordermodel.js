
const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true
    },
    orders: [{
        title: {
            type: String
           
        },
        quantity: {
            type: Number
    
        }
    }],
    capacity: {
        type: Number,
        required: true
    },
    state: {
      type: String
    },
    name:{
        type:String
    },
    phone:{
        type:String
    }
    
});

module.exports = mongoose.model('Table', tableSchema);
