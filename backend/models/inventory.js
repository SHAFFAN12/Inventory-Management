const mongoose = require('mongoose');
const inventorySchema = mongoose.Schema({
    productName: {
        type: String,
        required :true
    },
    admin :{
        type : String,
    },
    buyingPrice : {
        type:String,
        required :true
    },
    sellingPrice : {
        type:String,
        required :true
    },
    supplierName: {
        type:String,
        required :true},
    category : {
        type:String,
        required :true
    }
});

module.exports = mongoose.model('inventory',inventorySchema);