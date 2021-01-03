const mongoose = require('mongoose');
require('../db/mongoose');

const exampleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Example = mongoose.model('Example', exampleSchema);

// const example1 = new Example({
//     name: 'Andrew'
// });
// example1.save()
// .then((res) => {})
// .catch((err) => {
//     console.log(err);
// });


module.exports = Example;