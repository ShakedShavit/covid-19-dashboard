const mongoose = require('mongoose');
require('../db/mongoose');

const lastWeeklyGraphSchema = new mongoose.Schema({
    startingDate: {
        type: String,
        required: true,
    },
    points: {
        type: String,
        required: true
    },
    additionalPointsData: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const LastWeeklyGraphModel = mongoose.model('LastWeeklyGraphModel', lastWeeklyGraphSchema);

module.exports = LastWeeklyGraphModel;