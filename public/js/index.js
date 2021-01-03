import { drawFirstFinalGraph, redrawFirstFinalGraph } from './charts/final-graphs/firstFinalGraph.js';
import { redrawFirstByTimeGraph, drawFirstByTimeGraph } from './charts/graphs-by-time/firstGraphByTime.js'
import { drawSecondByTimeGraph, redrawSecondByTimeGraph } from './charts/graphs-by-time/secondGraphByTime.js';
import { redrawFirstCardGraph } from './charts/cards-graphs/firstCardGraph.js';
import { redrawSecondCardGraph } from './charts/cards-graphs/secondCardGraph.js';
import { redrawThirdCardGraph } from './charts/cards-graphs/thirdCardGraph.js';
import { redrawFirstWeeklyGraph } from './charts/weekly-spread-graphs/firstWeeklySpreadGraph.js';
import { redrawMiddleWeeklyGraph } from './charts/weekly-spread-graphs/middleWeeklySpreadGraph.js';
import { redrawLastWeeklyGraph } from './charts/weekly-spread-graphs/lastWeeklySpreadGraph.js';


const $navbar = document.getElementById('navbar');

let $cardDescriptionSymbols = document.getElementsByClassName('description-symbol');
let $cardDescriptionBoxes = document.getElementsByClassName('description-box');;

let $cards = document.getElementsByClassName('card');
let $cardGraphButtons = document.getElementsByClassName('card-graph__open');
let $cardGraphBubbles = document.getElementsByClassName('graph-bubble');
let $cardGraphBubbleTriangles = document.getElementsByClassName('graph-bubble-triangle');

let $selectButtons = document.getElementsByClassName('selection-button');
let $selectButtonsText = document.querySelectorAll('.selection-button > span');
let $selectLists = document.getElementsByClassName('selection-list');
let $selectListsText = document.querySelectorAll('.selection-list > span');
let $selectionButtonTriangles = document.getElementsByClassName('open-options__triangle');

const $pieChartGraphContainer = document.getElementById('third__final-graph');
const $finalBubbleButton = Array.from(document.getElementsByClassName('third__final-graph__open'))[0];

const $accessibilityButton = document.getElementsByClassName('accessibility-button')[0];

const body = document.querySelector('body');
const $graphContainers = document.querySelectorAll('.graph__container');
const $textElements = body.querySelectorAll('span');
const $textHeadlines = body.querySelectorAll('h6');
const $textDiv = body.querySelectorAll('div');
const $cardButtonCircle = body.querySelectorAll('.graph-button__circle');
const $remarks = body.querySelectorAll('.remark');
const $tableInputs = body.querySelectorAll('.table-search-input');
const $tableHeaders = body.querySelectorAll('.table-header');
const $tableHeaderCells = body.querySelectorAll('.table-header > span');

const $firstTableSearchInput = document.getElementsByClassName('table-search-input')[0];

const $darkTealLegendCircle = Array.from(document.getElementsByClassName('dark-teal-circle'));
const $greyLegendCircle = Array.from(document.getElementsByClassName('grey-circle'));
const $lightBlueLegendCircle = Array.from(document.getElementsByClassName('light-blue-circle'));
const $greenLegendCircle = Array.from(document.getElementsByClassName('green-circle'));


// Cards description boxes
$cardDescriptionSymbols = Array.from($cardDescriptionSymbols);
$cardDescriptionBoxes = Array.from($cardDescriptionBoxes);

for (let i = 0; i < $cardDescriptionSymbols.length; i++) {
    let cardDescSymbol = $cardDescriptionSymbols[i];
    let cardDescBox = $cardDescriptionBoxes[i];
    cardDescSymbol.addEventListener('mouseenter', () => {
        cardDescBox.classList.add('description-box__on-hover');
        if (i % 2 === 1) cardDescBox.classList.add('left-sided__cards__description-box');

        changeElementColors(cardDescBox, 'background__accessability-mode');
    });
    cardDescSymbol.addEventListener('mouseleave', () => {
        cardDescBox.classList.remove('description-box__on-hover');
        if (i % 2 === 1 && cardDescBox.classList.contains('left-sided__cards__description-box')) cardDescBox.classList.add('left-sided__cards__description-box');

        changeElementColors(cardDescBox, 'background__accessability-mode');
    });
};

// Cards graphs button
$cards = Array.from($cards);
$cardGraphButtons = Array.from($cardGraphButtons);
$cardGraphBubbles = Array.from($cardGraphBubbles);
$cardGraphBubbleTriangles = Array.from($cardGraphBubbleTriangles);

for (let i = 0; i < $cardGraphButtons.length; i++) {
    let cardGraphButton = $cardGraphButtons[i];
    let card = $cards[i + 3];
    let graphBubble = $cardGraphBubbles[i];
    cardGraphButton.addEventListener('click', (e) => {
        e.stopPropagation();
        closingCardGraphBubble();
        cardGraphButton.classList.add('card-graph__opened');
        card.classList.add('card__graph__opened');
        graphBubble.classList.add('graph-bubble__opened');

        const cardGraphCircle = cardGraphButton.querySelector('div');
        changeElementColors(cardGraphCircle, 'card-graph-button__opened__accessability-mode');
        changeElementColors(cardGraphCircle.querySelector('svg'), 'card-graph-svg__opened__accessability-mode');
        changeElementColors(graphBubble, 'background__accessability-mode');

        switchCardGraphBubbleSideOnScroll();
    });
};

function closingCardGraphBubble() {
    for (let i = 0; i < $cardGraphButtons.length; i++) {
        let cardGraphButton = $cardGraphButtons[i];
        let card = $cards[i + 3];
        let graphBubble = $cardGraphBubbles[i];
        let bubbleTriangle = $cardGraphBubbleTriangles[i];
        if (cardGraphButton.classList.contains('card-graph__opened')) cardGraphButton.classList.remove('card-graph__opened');
        if (card.classList.contains('card__graph__opened')) card.classList.remove('card__graph__opened');
        if (graphBubble.classList.contains('graph-bubble__opened')) graphBubble.classList.remove('graph-bubble__opened');
        removingUpsideDownBubblesClass(graphBubble, bubbleTriangle);

        const cardGraphCircle = cardGraphButton.querySelector('div');
        removeClass(cardGraphCircle, 'card-graph-button__opened__accessability-mode');
        removeClass(cardGraphCircle.querySelector('svg'), 'card-graph-svg__opened__accessability-mode');
        changeElementColors(graphBubble, 'background__accessability-mode');
        changeElementColors(bubbleTriangle, 'bubble-triangle__accessability-mode');
    };

    // The pie chart bubble
    if ($finalBubbleButton.classList.contains('card-graph__opened')) $finalBubbleButton.classList.remove('card-graph__opened');
    if ($pieChartGraphContainer.classList.contains('card__graph__opened')) $pieChartGraphContainer.classList.remove('card__graph__opened');
    if ($finalBubble.classList.contains('graph-bubble__opened')) $finalBubble.classList.remove('graph-bubble__opened');
};

function removingUpsideDownBubblesClass(graphBubble, bubbleTriangle) {
    if (graphBubble.classList.contains('graph-bubble__upside-down')) graphBubble.classList.remove('graph-bubble__upside-down');
    if (bubbleTriangle.classList.contains('graph-bubble-triangle__upside-down')) bubbleTriangle.classList.remove('graph-bubble-triangle__upside-down');
};

function switchCardGraphBubbleSideOnScroll() {
    for (let i = 0; i < $cardGraphBubbles.length; i++) {
        let graphBubble = $cardGraphBubbles[i];
        let bubbleTriangle = $cardGraphBubbleTriangles[i];
        if (graphBubble.classList.contains('graph-bubble__opened')) {
            let bubbleRect = graphBubble.getBoundingClientRect();
            let navbarRect = $navbar.getBoundingClientRect();
            let upsideFactor = 0;
            if (graphBubble.classList.contains('graph-bubble__upside-down')) upsideFactor += 370;

            if (bubbleRect.top - upsideFactor < navbarRect.bottom) {
                if (!graphBubble.classList.contains('graph-bubble__upside-down')) graphBubble.classList.add('graph-bubble__upside-down');
                if (!bubbleTriangle.classList.contains('graph-bubble-triangle__upside-down')) bubbleTriangle.classList.add('graph-bubble-triangle__upside-down');
            } else {
                removingUpsideDownBubblesClass(graphBubble, bubbleTriangle);
            }

            return;
        };
    };
};


// Select components
$selectButtons = Array.from($selectButtons);
$selectButtonsText = Array.from($selectButtonsText);
$selectLists = Array.from($selectLists);
$selectListsText = Array.from($selectListsText);
$selectionButtonTriangles = Array.from($selectionButtonTriangles);

const openedSelectLists = [];
for (let i = 0; i < $selectLists.length; i++) {
    openedSelectLists.push(false);
}

for (let i = 0; i < $selectButtons.length; i++) {
    let selectButton = $selectButtons[i];
    selectButton.addEventListener('click', (e) => {
        e.stopPropagation();
        closingSelectComponents()

        if (!openedSelectLists[i]) {
            $selectLists[i].classList.add('selection-list__opened');
            $selectionButtonTriangles[i].classList.add('open-options__triangle__opened');
        }

        for (let select of $selectLists[i].querySelectorAll('span')) {
            if (select.innerHTML === selectButton.querySelector('.small-headline').innerHTML) {
                select.classList.add('selected-option');
            }
        }
    });

    for (let i = 0; i < $selectListsText.length; i++) {
        let selectListsText = $selectListsText[i];
        selectListsText.addEventListener('click', (e) => {
            const selectButtonIndex = Math.floor(i / 4);
            $selectButtonsText[selectButtonIndex].innerHTML = selectListsText.innerHTML;
            if (i < 4) redrawFirstByTimeGraph(selectListsText.innerHTML, isAccessibilityOn);
            else if (i < 8 && i >= 4) redrawSecondByTimeGraph(selectListsText.innerHTML, isAccessibilityOn);
            else redrawFirstFinalGraph(selectListsText.innerHTML, isAccessibilityOn);
        });
    }
}

function closingSelectComponents() {
    for (let i = 0; i < $selectLists.length; i++) {
        if ($selectLists[i].classList.contains('selection-list__opened')) $selectLists[i].classList.remove('selection-list__opened');
        if ($selectionButtonTriangles[i].classList.contains('open-options__triangle__opened')) $selectionButtonTriangles[i].classList.remove('open-options__triangle__opened');

        for (let select of $selectLists[i].querySelectorAll('span')) {
            if (select.classList.contains('selected-option')) select.classList.remove('selected-option');
        }
    }
};

// Final bubble graph
const $finalBubble = $cardGraphBubbles[$cardGraphBubbles.length - 1];
$finalBubbleButton.addEventListener('click', (e) => {
    e.stopPropagation();
    closingCardGraphBubble();
    $finalBubbleButton.classList.add('card-graph__opened');
    $pieChartGraphContainer.classList.add('card__graph__opened');
    $finalBubble.classList.add('graph-bubble__opened');

    switchCardGraphBubbleSideOnScroll();
});

// Window events
window.addEventListener('click', () => {
    closingCardGraphBubble();
    closingSelectComponents();
});
body.addEventListener('scroll', () => {
    switchCardGraphBubbleSideOnScroll();
});


if (Cookies.get('isAccessibilityOn') == undefined) {
    Cookies.set('isAccessibilityOn', false)
}

// Accessibility button
let isAccessibilityOn = Cookies.get('isAccessibilityOn') === 'false' ? false : true;
$accessibilityButton.addEventListener('click', () => {
    isAccessibilityOn = !isAccessibilityOn;
    turnOnOrOffAccessibility();

    redrawFirstCardGraph(isAccessibilityOn);
    redrawSecondCardGraph(isAccessibilityOn);
    redrawThirdCardGraph(isAccessibilityOn);
    redrawFirstWeeklyGraph(isAccessibilityOn);
    redrawMiddleWeeklyGraph(isAccessibilityOn);
    redrawLastWeeklyGraph(isAccessibilityOn);
    redrawFirstByTimeGraph($selectButtonsText[0].innerHTML, isAccessibilityOn);
    redrawSecondByTimeGraph($selectButtonsText[1].innerHTML, isAccessibilityOn);
    redrawFirstFinalGraph($selectButtonsText[2].innerHTML, isAccessibilityOn);

    $firstTableSearchInput.value = '';

    changeGraphsLegendsColors();
});

const constIterateOverElements = () => {
    changeElementColors($accessibilityButton, 'accessibility-button__accessability-mode');
    changeElementColors(body, 'body__accessability-mode');
    $graphContainers.forEach((container) => {
        changeElementColors(container, 'background__accessability-mode');
        changeElementColors(container, 'graph-container-shadow__accessability-mode');
    });
    $textElements.forEach((textEl) => {
        changeElementColors(textEl, 'text-color__accessability-mode');
    });
    $textHeadlines.forEach((headline) => {
        changeElementColors(headline, 'text-color__accessability-mode');
    });
    $textDiv.forEach((div) => {
        changeElementColors(div, 'text-color__accessability-mode');
    });
    $cardDescriptionSymbols.forEach((cardDescSymbol) => {
        changeElementColors(cardDescSymbol.querySelector('svg'), 'svg__accessability-mode');
    });
    $cardButtonCircle.forEach((circle) => {
        changeElementColors(circle, 'symbols-background__accessability-mode');
        changeElementColors(circle.querySelector('svg'), 'svg__accessability-mode');
    });
    $remarks.forEach((remark, index) => {
        changeElementColors(remark, 'remark__accessability-mode');
        if (index === 2) {
            changeElementColors(remark.querySelector('svg'), 'svg__accessability-mode');
        }
    });
    $selectButtons.forEach((button) => {
        changeElementColors(button, 'background__accessability-mode');
    });
    $selectLists.forEach((list) => {
        changeElementColors(list, 'background__accessability-mode');
    });
    $tableInputs.forEach((input) => {
        changeElementColors(input, 'background__accessability-mode');
        changeElementColors(input.parentNode.querySelector('svg'), 'svg__accessability-mode');
    });
    $tableHeaders.forEach((header) => {
        changeElementColors(header, 'remark__accessability-mode');
    });
    $tableHeaderCells.forEach((cell) => {
        changeElementColors(cell, 'remark__accessability-mode');
    });
};

const changeElementColors = (el, className) => {
    if (isAccessibilityOn) {
        addClass(el, className);
    } else {
        removeClass(el, className);
    }
}

const addClass = (el, className) => {
    if (!el.classList.contains(className)) el.classList.add(className);
}

const removeClass = (el, className) => {
    if (el.classList.contains(className)) el.classList.remove(className);
}

const turnOnOrOffAccessibility = () => {
    Cookies.set('isAccessibilityOn', isAccessibilityOn);

    constIterateOverElements();
    
    if (isAccessibilityOn) {
        document.documentElement.style
        .setProperty('--weekly-graphs-border', 'white');
        document.documentElement.style
        .setProperty('--search-input-border', '2px solid #79858e');
        document.documentElement.style
        .setProperty('--scroll-background', '#14212b');
    } else {
        document.documentElement.style
        .setProperty('--weekly-graphs-border', 'rgba(170, 170, 170, 0.5)');
        document.documentElement.style
        .setProperty('--search-input-border', '1px solid #e4e9f2');
        document.documentElement.style
        .setProperty('--scroll-background', '#edf1f7');
    }
}

if (Cookies.get('isAccessibilityOn') === 'true') turnOnOrOffAccessibility();

// Drawing first by time graph with the button inner text
drawFirstByTimeGraph($selectButtonsText[0].innerHTML, isAccessibilityOn);
// Drawing second by time graph with the button inner text
drawSecondByTimeGraph($selectButtonsText[1].innerHTML, isAccessibilityOn);
// Drawing first final graph with the button inner text
drawFirstFinalGraph($selectButtonsText[2].innerHTML, isAccessibilityOn);

$firstTableSearchInput.addEventListener('input', (e) => {
    if (isAccessibilityOn) {
        console.log(e.target)
        e.target.style.color = 'white';
    } else {
        e.target.style.color = 'black';
    }
});

const changeGraphsLegendsColors = () => {
    if (!isAccessibilityOn) {
        $darkTealLegendCircle.forEach((legend) => removeClass(legend, 'orange-legend__accessability-mode'));
        $greyLegendCircle.forEach((legend) => removeClass(legend, 'green-legend__accessability-mode'));
        $lightBlueLegendCircle.forEach((legend) => removeClass(legend, 'blue-legend__accessability-mode'));
        $greenLegendCircle.forEach((legend) => removeClass(legend, 'orange-legend__accessability-mode'));
    } else {
        $darkTealLegendCircle.forEach((legend) => addClass(legend, 'orange-legend__accessability-mode'));
        $greyLegendCircle.forEach((legend) => addClass(legend, 'green-legend__accessability-mode'));
        $lightBlueLegendCircle.forEach((legend) => addClass(legend, 'blue-legend__accessability-mode'));
        $greenLegendCircle.forEach((legend) => addClass(legend, 'orange-legend__accessability-mode'));
    }
}
changeGraphsLegendsColors();


export { isAccessibilityOn };