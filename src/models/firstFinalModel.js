const mongoose = require('mongoose');
require('../db/mongoose');

const firstFinalGraphSchema = new mongoose.Schema({
    confirmedFirstSeriesPoints: {
        type: String,
        required: true,
    },
    confirmedSecondSeriesPoints: {
        type: String,
        required: true,
    },
    confirmedXAxisCategories: {
        type: String,
        required: true,
    },

    deadFirstSeriesPoints: {
        type: String,
        required: true,
    },
    deadSecondSeriesPoints: {
        type: String,
        required: true,
    },
    deadXAxisCategories: {
        type: String,
        required: true,
    },

    respiratorsFirstSeriesPoints: {
        type: String,
        required: true,
    },
    respiratorsSecondSeriesPoints: {
        type: String,
        required: true,
    },
    respiratorsXAxisCategories: {
        type: String,
        required: true,
    },

    predicamentFirstSeriesPoints: {
        type: String,
        required: true,
    },
    predicamentSecondSeriesPoints: {
        type: String,
        required: true,
    },
    predicamentXAxisCategories: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const FirstFinalGraphModel = mongoose.model('FirstFinalGraphModel', firstFinalGraphSchema);

module.exports = FirstFinalGraphModel;