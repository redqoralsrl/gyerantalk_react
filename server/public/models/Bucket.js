const mongoose = require('mongoose');

const bucketSchema = mongoose.Schema({
    customerId: {
        type: String,
        required: true,
    },
    bucketData: {
        type: mongoose.Schema.Types,
        ref: 'Bucket',
        required: true,
    }
})

const Bucket = mongoose.model('bucket', bucketSchema);
module.exports = { Bucket };