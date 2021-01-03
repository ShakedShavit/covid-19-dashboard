const express = require('express');
const router = new express.Router();
const path = require('path');
const FirstTableRowModel = require('../../models/tableRowModel');

router.get('/first-table-data', async (req, res) => {
    try {
        const firstTableData = await FirstTableRowModel.find();
        res.send(firstTableData);
    } catch(e) {
        res.status(500).send();
    }
});
router.get('/first-table', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '..', '/public', 'graphs-data-forms', '/first-table.html'));
});
router.post('/first-table', (req, res) => {
    const firstTableModel = new FirstTableRowModel({
        city: req.body.city,
        confirmed: req.body.confirmed,
        active: req.body.active,
        new: req.body.new,
        testing: req.body.testing,
        activeToTenThousand: req.body.activeToTenThousand
    });
             
    res.redirect('./cards-extra');

    firstTableModel.save()
     .then((res) => {
         //console.log(firstTableModel)
     })
     .catch((err) => {
         console.log(err);
     });
});

module.exports = router;