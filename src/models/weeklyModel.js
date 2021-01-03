const mongoose = require('mongoose');
require('../db/mongoose');

const weeklyGraphSchema = new mongoose.Schema({
    weeklyIndex: {
        type: Number,
        required: true,
        validate: {
            validator: (value) => {
                if (value !== 1 && value !== 2) return false
            }
        }
    },
    startingDate: {
        type: String,
        required: true,
    },
    points: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const WeeklyGraphModel = mongoose.model('WeeklyGraphModel', weeklyGraphSchema);

module.exports = WeeklyGraphModel;