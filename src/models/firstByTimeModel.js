const mongoose = require('mongoose');
require('../db/mongoose');

const firstByTimeGraphSchema = new mongoose.Schema({
    allTimeStartingDate: {
        type: String,
        required: true,
    },
    allTimeFirstSeriesPoints: {
        type: String,
        required: true,
    },
    allTimeSecondSeriesPoints: {
        type: String,
        required: true,
    },
    allTimeThirdSeriesPoints: {
        type: String,
        required: true,
    },

    lastWeekFirstSeriesPoints: {
        type: String,
        required: true,
    },
    lastWeekSecondSeriesPoints: {
        type: String,
        required: true,
    },
    lastWeekThirdSeriesPoints: {
        type: String,
        required: true,
    },

    lastTwoWeeksFirstSeriesPoints: {
        type: String,
        required: true,
    },
    lastTwoWeeksSecondSeriesPoints: {
        type: String,
        required: true,
    },
    lastTwoWeeksThirdSeriesPoints: {
        type: String,
        required: true,
    },

    lastMonthFirstSeriesPoints: {
        type: String,
        required: true,
    },
    lastMonthSecondSeriesPoints: {
        type: String,
        required: true,
    },
    lastMonthThirdSeriesPoints: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const FirstByTimeGraphModel = mongoose.model('FirstByTimeGraphModel', firstByTimeGraphSchema);

module.exports = FirstByTimeGraphModel;