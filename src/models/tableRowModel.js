const mongoose = require('mongoose');
require('../db/mongoose');

const firstTableRowSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
    },
    confirmed: {
        type: Number,
        required: true,
    },
    active: {
        type: Number,
        required: true,
    },
    new: {
        type: Number,
        required: true,
    },
    testing: {
        type: Number,
        required: true,
    },
    activeToTenThousand: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
});

const FirstTableRowModel = mongoose.model('FirstTableRowModel', firstTableRowSchema);

module.exports = FirstTableRowModel;