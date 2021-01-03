const express = require('express');
const Example = require('../models/example');

const router = new express.Router();

router.get('/info', async (req, res) => {
    try {
        // await Example.deleteMany({ });
        const exampleData = await Example.find({});
        res.send(exampleData);
    } catch(e) {
        res.status(500).send();
    }
});

module.exports = router;