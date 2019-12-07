const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema(
    {
        imageSRC: { type: String, require: true },
        name: { type: String, require: true },
        brand: { type: String, require: true },
        sitingcapacity: { type: Number, require: false },
        location: { type: String, require: true },
        rate: { type: Number, require: true },
       // status: { type: Boolean, require: true },

    }, {
    collection: 'abangItems'
}

);
module.exports = mongoose.model('Items', ItemSchema);




