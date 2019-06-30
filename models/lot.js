const mongoose = require('mongoose');

const Lot = mongoose.Schema({
    lot_name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Свободно', 'Занято'],
        required: true,
        default: 'Свободно'
    },
});

module.exports = mongoose.model('Lot', Lot);