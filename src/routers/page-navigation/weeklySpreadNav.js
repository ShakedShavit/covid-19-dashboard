const express = require('express');
const router = new express.Router();
const path = require('path');
const WeeklyGraphModel = require('../../models/weeklyModel');
const LastWeeklyGraphModel = require('../../models/lastWeeklyModel');

router.get('/first-weekly-data', async (req, res) => {
    try {
        const firstWeeklyData = await WeeklyGraphModel.find({ weeklyIndex: 1 }).sort({'_id':-1}).limit(1)
        res.send(firstWeeklyData);
    } catch(e) {
        res.status(500).send();
    }
});
router.get('/first-weekly', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '..', '/public', 'graphs-data-forms', 'weekly-spread', '/first-weekly.html'));
});
router.post('/first-weekly', (req, res) => {
    const firstWeeklyGraphModel = new WeeklyGraphModel({
        weeklyIndex: 1,
        startingDate: req.body.startingDate,
        points: req.body.points
    });
    
    res.redirect('./middle-weekly');

    firstWeeklyGraphModel.save()
     .then((res) => {
         //console.log(firstWeeklyGraphModel)
     })
     .catch((err) => {
         console.log(err);
     });
});

router.get('/middle-weekly-data', async (req, res) => {
    try {
        const middleWeeklyData = await WeeklyGraphModel.find({ weeklyIndex: 2 }).sort({'_id':-1}).limit(1)
        res.send(middleWeeklyData);
    } catch(e) {
        res.status(500).send();
    }
});
router.get('/middle-weekly', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '..', '/public', 'graphs-data-forms', 'weekly-spread', '/middle-weekly.html'));
});
router.post('/middle-weekly', (req, res) => {
    const middleWeeklyGraphModel = new WeeklyGraphModel({
        weeklyIndex: 2,
        startingDate: req.body.startingDate,
        points: req.body.points
    });
    
    res.redirect('./last-weekly');

    middleWeeklyGraphModel.save()
     .then((res) => {
         //console.log(middleWeeklyGraphModel)
     })
     .catch((err) => {
         console.log(err);
     });
});

router.get('/last-weekly-data', async (req, res) => {
    try {
        const lastWeeklyData = await LastWeeklyGraphModel.find().sort({'_id':-1}).limit(1);
        res.send(lastWeeklyData);
    } catch(e) {
        res.status(500).send();
    }
});
router.get('/last-weekly', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '..', '/public', 'graphs-data-forms', 'weekly-spread', '/last-weekly.html'));
});
router.post('/last-weekly', (req, res) => {
    const lastWeeklyGraphModel = new LastWeeklyGraphModel({
        startingDate: req.body.startingDate,
        points: req.body.points,
        additionalPointsData: req.body.additionalPointsData
    });
    
    res.redirect('./first-by-time');

    lastWeeklyGraphModel.save()
     .then((res) => {
         //console.log(lastWeeklyGraphModel)
     })
     .catch((err) => {
         console.log(err);
     });
});

module.exports = router;