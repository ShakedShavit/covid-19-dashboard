const mongoose = require('mongoose');
require('../db/mongoose');

const cardExtrasSchema = new mongoose.Schema({
    cardOneFirst: {
        type: String,
        required: true
    },
    cardOneSecond: {
        type: String,
        required: true
    },
    cardOneThird: {
        type: String,
        required: true
    },

    cardTwoFirst: {
        type: String,
        required: true
    },
    cardTwoSecond: {
        type: String,
        required: true
    },
    cardTwoThird: {
        type: String,
        required: true
    },
    cardTwoFourth: {
        type: String,
        required: true
    },
    cardTwoFifth: {
        type: String,
        required: true
    },

    cardThreeFirst: {
        type: String,
        required: true
    },
    cardThreeSecond: {
        type: String,
        required: true
    },
    cardThreeThird: {
        type: String,
        required: true
    },
    cardThreeFourth: {
        type: String,
        required: true
    },

    cardFourFirst: {
        type: String,
        required: true
    },
    cardFourSecond: {
        type: String,
        required: true
    },

    cardFiveFirst: {
        type: String,
        required: true
    },

    cardSixFirst: {
        type: String,
        required: true
    },
    cardSixSecond: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const CardExtrasModel = mongoose.model('CardExtrasModel', cardExtrasSchema);

module.exports = CardExtrasModel;