const express = require('express');
const router = new express.Router();
const path = require('path');
const FirstByTimeGraphModel = require('../../models/firstByTimeModel');
const SecondByTimeGraphModel = require('../../models/secondByTimeModel');

router.get('/first-by-time-data', async (req, res) => {
    try {
        const firstByTimeData = await FirstByTimeGraphModel.find().sort({'_id':-1}).limit(1)
        res.send(firstByTimeData);
    } catch(e) {
        res.status(500).send();
    }
});
router.get('/first-by-time', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '..', '/public', 'graphs-data-forms', 'by-time', '/first-by-time.html'));
});
router.post('/first-by-time', (req, res) => {
    const firstByTimeGraphModel = new FirstByTimeGraphModel({
        allTimeStartingDate: req.body.allTimeStartingDate,
        allTimeFirstSeriesPoints: req.body.allTimeFirstSeriesPoints,
        allTimeSecondSeriesPoints: req.body.allTimeSecondSeriesPoints,
        allTimeThirdSeriesPoints: req.body.allTimeThirdSeriesPoints,

        lastWeekFirstSeriesPoints: req.body.lastWeekFirstSeriesPoints,
        lastWeekSecondSeriesPoints: req.body.lastWeekSecondSeriesPoints,
        lastWeekThirdSeriesPoints: req.body.lastWeekThirdSeriesPoints,

        lastTwoWeeksFirstSeriesPoints: req.body.lastTwoWeeksFirstSeriesPoints,
        lastTwoWeeksSecondSeriesPoints: req.body.lastTwoWeeksSecondSeriesPoints,
        lastTwoWeeksThirdSeriesPoints: req.body.lastTwoWeeksThirdSeriesPoints,

        lastMonthFirstSeriesPoints: req.body.lastMonthFirstSeriesPoints,
        lastMonthSecondSeriesPoints: req.body.lastMonthSecondSeriesPoints,
        lastMonthThirdSeriesPoints: req.body.lastMonthThirdSeriesPoints
    });
             
    res.redirect('./second-by-time');

    firstByTimeGraphModel.save()
     .then((res) => {
         //console.log(firstByTimeGraphModel)
     })
     .catch((err) => {
         console.log(err);
     });
});

router.get('/second-by-time-data', async (req, res) => {
    try {
        const secondByTimeData = await SecondByTimeGraphModel.find().sort({'_id':-1}).limit(1)
        res.send(secondByTimeData);
    } catch(e) {
        res.status(500).send();
    }
});
router.get('/second-by-time', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '..', '/public', 'graphs-data-forms', 'by-time', '/second-by-time.html'));
});
router.post('/second-by-time', (req, res) => {
    const secondByTimeGraphModel = new SecondByTimeGraphModel({
        allTimeStartingDate: req.body.allTimeStartingDate,
        allTimeFirstSeriesPoints: req.body.allTimeFirstSeriesPoints,
        allTimeSecondSeriesPoints: req.body.allTimeSecondSeriesPoints,

        lastWeekFirstSeriesPoints: req.body.lastWeekFirstSeriesPoints,
        lastWeekSecondSeriesPoints: req.body.lastWeekSecondSeriesPoints,

        lastTwoWeeksFirstSeriesPoints: req.body.lastTwoWeeksFirstSeriesPoints,
        lastTwoWeeksSecondSeriesPoints: req.body.lastTwoWeeksSecondSeriesPoints,

        lastMonthFirstSeriesPoints: req.body.lastMonthFirstSeriesPoints,
        lastMonthSecondSeriesPoints: req.body.lastMonthSecondSeriesPoints,
    });
             
    res.redirect('./first-final');

    secondByTimeGraphModel.save()
     .then((res) => {
         //console.log(secondByTimeGraphModel)
     })
     .catch((err) => {
         console.log(err);
     });
});

module.exports = router;