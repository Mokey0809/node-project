let mongoose = require('mongoose');


// Order Schema
let orderSchema = mongoose.Schema({
    cust_id:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required : true
    },
    name: {
        type: String,
        required: true
    }

});



let Order = module.exports = mongoose.model('Order', orderSchema);
