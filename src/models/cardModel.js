const mongoose = require('mongoose');
require('../db/mongoose');
// const validator = require('validator');

const cardGraphSchema = new mongoose.Schema({
    cardIndex: {
        type: Number,
        required: true,
        validate: {
            validator: (value) => {
                if (value !== 1 && value !== 2 && value !== 3) return false
            }
        }
    },
    startingDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true
    },
    points: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const CardGraphModel = mongoose.model('CardGraphModel', cardGraphSchema);

// const example1 = new Example({
//     name: 'Andrew'
// });
// example1.save()
// .then((res) => {})
// .catch((err) => {
//     console.log(err);
// });


module.exports = CardGraphModel;