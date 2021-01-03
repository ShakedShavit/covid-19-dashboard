const express = require('express');
const router = new express.Router();
const path = require('path');
const FirstFinalGraphModel = require('../../models/firstFinalModel');

router.get('/first-final-data', async (req, res) => {
    try {
        const firstFinalData = await FirstFinalGraphModel.find().sort({'_id':-1}).limit(1)
        res.send(firstFinalData);
    } catch(e) {
        res.status(500).send();
    }
});
router.get('/first-final', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '..', '/public', 'graphs-data-forms', 'final', '/first-final.html'));
});
router.post('/first-final', (req, res) => {
    const firstFinalGraphModel = new FirstFinalGraphModel({
        confirmedFirstSeriesPoints: req.body.confirmedFirstSeriesPoints,
        confirmedSecondSeriesPoints: req.body.confirmedSecondSeriesPoints,
        confirmedXAxisCategories: req.body.confirmedXAxisCategories,

        deadFirstSeriesPoints: req.body.deadFirstSeriesPoints,
        deadSecondSeriesPoints: req.body.deadSecondSeriesPoints,
        deadXAxisCategories: req.body.deadXAxisCategories,

        respiratorsFirstSeriesPoints: req.body.respiratorsFirstSeriesPoints,
        respiratorsSecondSeriesPoints: req.body.respiratorsSecondSeriesPoints,
        respiratorsXAxisCategories: req.body.respiratorsXAxisCategories,

        predicamentFirstSeriesPoints: req.body.predicamentFirstSeriesPoints,
        predicamentSecondSeriesPoints: req.body.predicamentSecondSeriesPoints,
        predicamentXAxisCategories: req.body.predicamentXAxisCategories,
    });
             
    res.redirect('./first-table');

    firstFinalGraphModel.save()
     .then((res) => {
         //console.log(firstFinalGraphModel)
     })
     .catch((err) => {
         console.log(err);
     });
});

module.exports = router;