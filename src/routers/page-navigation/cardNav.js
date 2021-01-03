const express = require('express');
const router = new express.Router();
const path = require('path');
const CardExtrasModel = require('../../models/cardExtrasModel');
const CardGraphModel = require('../../models/cardModel');

router.get('/first-card-data', async (req, res) => {
    try {
        const firstCardData = await CardGraphModel.find({ cardIndex: 1 }).sort({'_id':-1}).limit(1)
        res.send(firstCardData);
    } catch(e) {
        res.status(500).send();
    }
});
router.get('/first-card', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '..', '/public', 'graphs-data-forms', 'cards', '/first-card.html'));
});
router.post('/first-card', async (req, res) => {
    const firstCardGraphModel = new CardGraphModel({
        cardIndex: 1,
        startingDate: req.body.startingDate,
        endDate: req.body.endDate,
        points: req.body.points
    });
    
     res.redirect('./second-card');

     firstCardGraphModel.save()
     .then((res) => {
         //console.log(firstCardGraphModel)
     })
     .catch((err) => {
         console.log(err);
     });
});

router.get('/second-card-data', async (req, res) => {
    try {
        const secondCardData = await CardGraphModel.find({ cardIndex: 2 }).sort({'_id':-1}).limit(1)
        res.send(secondCardData);
    } catch(e) {
        res.status(500).send();
    }
});
router.get('/second-card', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '..', '/public', 'graphs-data-forms', 'cards', '/second-card.html'));
});
router.post('/second-card', (req, res) => {
    const secondCardGraphModel = new CardGraphModel({
        cardIndex: 2,
        startingDate: req.body.startingDate,
        endDate: req.body.endDate,
        points: req.body.points
    });
    
    res.redirect('./third-card');

    secondCardGraphModel.save()
    .then((res) => {
        //console.log(secondCardGraphModel)
    })
    .catch((err) => {
        console.log(err);
    });
});

router.get('/third-card-data', async (req, res) => {
    try {
        const thirdCardData = await CardGraphModel.find({ cardIndex: 3 }).sort({'_id':-1}).limit(1)
        res.send(thirdCardData);
    } catch(e) {
        res.status(500).send();
    }
});
router.get('/third-card', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '..', '/public', 'graphs-data-forms', 'cards', '/third-card.html'));
});
router.post('/third-card', (req, res) => {
    const thirdCardGraphModel = new CardGraphModel({
        cardIndex: 3,
        startingDate: req.body.startingDate,
        endDate: req.body.endDate,
        points: req.body.points
    });
    
    res.redirect('./first-weekly');

    thirdCardGraphModel.save()
    .then((res) => {
        //console.log(thirdCardGraphModel)
    })
    .catch((err) => {
        console.log(err);
    });
});

router.get('/cards-extra-data', async (req, res) => {
    try {
        const cardExtras = await CardExtrasModel.find().sort({'_id':-1}).limit(1)
        res.send(cardExtras);
    } catch(e) {
        res.status(500).send();
    }
});
router.get('/cards-extra', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '..', '/public', 'graphs-data-forms', 'cards', '/cards-extra.html'));
});
router.post('/cards-extra', (req, res) => {
    const cardExtrasGraphModel = new CardExtrasModel({
        cardOneFirst: req.body.cardOneFirst,
        cardOneSecond: req.body.cardOneSecond,
        cardOneThird: req.body.cardOneThird,
        
        cardTwoFirst: req.body.cardTwoFirst,
        cardTwoSecond: req.body.cardTwoSecond,
        cardTwoThird: req.body.cardTwoThird,
        cardTwoFourth: req.body.cardTwoFourth,
        cardTwoFifth: req.body.cardTwoFifth,

        cardThreeFirst: req.body.cardThreeFirst,
        cardThreeSecond: req.body.cardThreeSecond,
        cardThreeThird: req.body.cardThreeThird,
        cardThreeFourth: req.body.cardThreeFourth,

        cardFourFirst: req.body.cardFourFirst,
        cardFourSecond: req.body.cardFourSecond,

        cardFiveFirst: req.body.cardFiveFirst,

        cardSixFirst: req.body.cardSixFirst,
        cardSixSecond: req.body.cardSixSecond
    });

    res.redirect('./');

    cardExtrasGraphModel.save()
    .then((res) => {
        //console.log(cardExtrasGraphModel)
    })
    .catch((err) => {
        console.log(err);
    });
});

module.exports = router;