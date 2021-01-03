import { cleanInitialPoints } from '../utils/getDataPoints.js';

const url = 'http://localhost:3000/first-final-data';

let firsFinalData;
let firstFinalGraphChart

const drawFirstFinalGraph = (stateStr, isAccessibilityOn) => {
    fetch(url)
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error(res.status);
        }
    })
    .then((firstFinalInfo) => {
        firsFinalData = firstFinalInfo;
        redrawFirstFinalGraph(stateStr, isAccessibilityOn);
    })
    .catch((err) => {
        console.log(err);
    });
};

const redrawFirstFinalGraph = (stateStr, isAccessibilityOn) => {
    let greenColumnPoints;
    let blueColumnPoints;
    let xAxisCategories;
    switch (stateStr) {
        case 'מאומתים': // Confirmed
            greenColumnPoints = cleanInitialPoints(firsFinalData[0].confirmedFirstSeriesPoints);
            blueColumnPoints = cleanInitialPoints(firsFinalData[0].confirmedSecondSeriesPoints);
            xAxisCategories = firsFinalData[0].confirmedXAxisCategories;
            break;
        case 'נפתרים': // Dead
            greenColumnPoints = cleanInitialPoints(firsFinalData[0].deadFirstSeriesPoints);
            blueColumnPoints = cleanInitialPoints(firsFinalData[0].deadSecondSeriesPoints);
            xAxisCategories = firsFinalData[0].deadXAxisCategories;
            break;
        case 'מונשמים': // Respirators
            greenColumnPoints = cleanInitialPoints(firsFinalData[0].respiratorsFirstSeriesPoints);
            blueColumnPoints = cleanInitialPoints(firsFinalData[0].respiratorsSecondSeriesPoints);
            xAxisCategories = firsFinalData[0].respiratorsXAxisCategories;
            break;
        case 'מצב קשה': // Predicament
            greenColumnPoints = cleanInitialPoints(firsFinalData[0].predicamentFirstSeriesPoints);
            blueColumnPoints = cleanInitialPoints(firsFinalData[0].predicamentSecondSeriesPoints);
            xAxisCategories = firsFinalData[0].predicamentXAxisCategories;
            break;
    }
    xAxisCategories = xAxisCategories.split(',');

    let maxPointValue = -1000;
    greenColumnPoints.forEach(point => {
        if (point > maxPointValue) maxPointValue = point;
    });
    blueColumnPoints.forEach(point => {
        if (point > maxPointValue) maxPointValue = point;
    });
    maxPointValue = (parseInt(maxPointValue / 10, 10) + 1) * 10;

    let backgroundColor;
    let greenGraphColor;
    let blueGraphColor;
    let crosshairLinesColor;
    let textColor;
    let gridLineColor;
    if (!isAccessibilityOn) {
        backgroundColor = '#ffffff';
        greenGraphColor = '#b6ca51';
        blueGraphColor = '#48caff';
        crosshairLinesColor = 'rgba(0, 0, 0, 0.6)';
        textColor = '#666666'
        gridLineColor = 'rgba(170, 170, 170, 0.5)';
    } else {
        backgroundColor = '#384f5f'
        greenGraphColor = '#fd8264';
        blueGraphColor = '#2cd2db';
        crosshairLinesColor = 'grey';
        textColor = 'white';
        gridLineColor = 'rgba(150, 150, 150, 0.9)';
    }

    firstFinalGraphChart = Highcharts.chart('first-final-graph', {
        chart: {
            type: 'bar',
            className: 'first-final-chart',
            backgroundColor: backgroundColor
        },
        credits: {
            enabled: false,
        },
        title: {
            text: ''
        },
        legend: {
            enabled: false,
        },
        xAxis: {
            title: {
                text: 'קבוצת גיל',
                //margin: 0,
                useHTML: true,
                style: {
                    color: textColor
                },
            },
            //categories: ['0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80-89', '+90'],
            categories: xAxisCategories,
            labels: {
                enabled: true,
                x: -40,
                useHTML: true,
                style: {
                    color: textColor
                },
                formatter: function() {
                    const value = this.value.replace(' ', '');
                    if (value === '0-9') return '<span class="0-9">' + value + '</span>';
                    if (value === '10-19') return '<span class="10-19">' + value + '</span>';
                    if (value === '20-29') return '<span class="20-29">' + value + '</span>';
                    if (value === '30-39') return '<span class="30-39">' + value + '</span>';
                    if (value === '40-49') return '<span class="40-49">' + value + '</span>';
                    if (value === '50-59') return '<span class="50-59">' + value + '</span>';
                    if (value === '60-69') return '<span class="60-69">' + value + '</span>';
                    if (value === '70-79') return '<span class="70-79">' + value + '</span>';
                    if (value === '80-89') return '<span class="80-89">' + value + '</span>';
                    if (value === '+90') return '<span class="+90">' + value + '</span>';
                    else return '<span>' + value + '</span>';
                }
            },
            reversed: false,
            crosshair: {
                width: 0.7,
                color: crosshairLinesColor,
                dashStyle: 'LongDash',
                snap: true,
                className: 'crosshair-line',
            },
            gridLineWidth: 1,
            gridLineColor: gridLineColor,
            lineWidth: 0,
            tickLength: 0,
        },
        yAxis: [{
            title: {
                text: '% סה"כ',
                x: 100,
                useHTML: true,
                style: {
                    color: textColor
                },
            },
            reversed: true,
            width: '50%',
            type: 'category',
            labels: {
                enabled: true,
                useHTML: true,
                style: {
                    color: textColor
                },
            },
            max: maxPointValue,
            min: 0,
            tickInterval: 10,
            plotLines: [{
                className: 'first-final-chart-plotline',
                value: 0,
                color: textColor,
                width: 2,
                zIndex: 0,
            }],
            crosshair: {
                width: 0.7,
                color: crosshairLinesColor,
                dashStyle: 'LongDash',
                snap: false,
                label: {
                    enabled: true,
                    backgroundColor: 'white',
                    borderWidth: '0.1px',
                    borderColor: 'black',
                    padding: 3,
                    zIndex: 20,
                    backgroundColor: 'blue',
                    formatter: function(value) {
                        return '<div style="color: white; direction: ltr; padding: 10px;">'
                        + value.toFixed(0)
                        + '</div>';
                    },
                }
            },
            gridLineWidth: 1,
            gridLineColor: gridLineColor,
        },{
            title: {
                text: '',
            },
            width: '50%',
            left: '48.0%',
            offset: 0,
            type: 'category',
            labels: {
                enabled: true,
                useHTML: true,
                style: {
                    color: textColor
                },
                formatter: function() {
                    if (this.value !== 0) return this.value;
                }
            },
            max: maxPointValue,
            min: 0,
            tickInterval: 10,
            crosshair: {
                width: 0.7,
                color: 'rgba(0, 0, 0, 0.6)',
                dashStyle: 'LongDash',
                snap: false,
                label: {
                    enabled: true,
                    backgroundColor: 'white',
                    borderWidth: '0.1px',
                    borderColor: 'black',
                    padding: 3,
                    zIndex: 20,
                    backgroundColor: 'blue',
                    formatter: function(value) {
                        return '<div style="color: white; direction: ltr; padding: 10px">'
                        + value.toFixed(0)
                        + '</div>';
                    },
                }
            },
            gridLineWidth: 1,
            gridLineColor: gridLineColor,
        }],
        series: [
            {
                //data: [5.2, 8.8, 9.6, 7.1, 6.6, 5, 3.1, 1.6, 0.9,  0.4],
                data: greenColumnPoints,
                yAxis: 0,
                states: {
                    inactive: {
                        opacity: 1
                    },
                    hover: {
                        borderWidth: 5,
                        borderColor: 'rgba(100, 100, 100, 0.1)'
                    }
                },
                cursor: 'pointer',
                color: greenGraphColor,
                borderWidth: 0,
                borderRadiusBottomLeft: '50px',
                borderRadiusBottomRight: '50px',
                dataLabels: [{
                    enabled: true,
                    //useHTML: true,
                    style: {
                        color: textColor
                    },
                    formatter: function() {
                        return '<span style="font-weight: 400;">' +  this.y + '%' + '</span>';
                    },
                    align: 'center',
                }],
            },
            {
                //data: [5.4, 11.9, 10.3, 7, 6.1, 4.8, 3.5, 1.7, 0.7, 0.2],
                data: blueColumnPoints,
                yAxis: 1,
                states: {
                    inactive: {
                        opacity: 1
                    },
                    hover: {
                        borderWidth: 5,
                        borderColor: 'rgba(100, 100, 100, 0.1)'
                    }
                },
                cursor: 'pointer',
                color: blueGraphColor,
                borderWidth: 0,
                borderRadiusTopLeft: '50px',
                borderRadiusTopRight: '50px',
                dataLabels: [{
                    enabled: true,
                    x: 30,
                    //useHTML: true,
                    style: {
                        color: textColor
                    },
                    formatter: function() {
                        return '<span style="font-weight: 400;">' +  this.y + '%' + '</span>';
                    },
                    align: 'left',
                }],
            },
        ],
        tooltip: {
            shared: true,
            crosshairs: true,
            borderColor: 'none',
            backgroundColor: 'none',
            shadow: false,
            useHTML: true,
            formatter: function() {
                if (isTooltipVisible) {
                    if (!isAccessibilityOn) {
                        if (isMouseInLeftSide) {
                            return '<div style="display: flex; flex-direction: column; align-items: flex-start; padding: 7px;" class="card-graph-tooltip card-graph-tooltip__no-accessibility">' +
                            '<span style="color: #48caff;">' + 'גברים ' + this.points[1].x  + '</span>' +
                            '<span style="color: #48caff;">' + this.points[1].y + '%' + '</span>' +
                            '</div>'
                        } else {
                            return '<div style="display: flex; flex-direction: column; align-items: flex-start; padding: 7px;" class="card-graph-tooltip card-graph-tooltip__no-accessibility">' +
                            '<span style="color: #b6ca51;">' + 'נשים ' + this.points[0].x  + '</span>' +
                            '<span style="color: #b6ca51;">' + this.points[0].y + '%' + '</span>' +
                            '</div>'
                        }
                    } else {
                        if (isMouseInLeftSide) {
                            return '<div style="display: flex; flex-direction: column; align-items: flex-start; padding: 7px;" class="card-graph-tooltip card-graph-tooltip__accessibility-mode">' +
                            '<span style="color: #2cd2db;">' + 'גברים ' + this.points[1].x  + '</span>' +
                            '<span style="color: #2cd2db;">' + this.points[1].y + '%' + '</span>' +
                            '</div>'
                        } else {
                            return '<div style="display: flex; flex-direction: column; align-items: flex-start; padding: 7px;" class="card-graph-tooltip card-graph-tooltip__accessibility-mode">' +
                            '<span style="color: #fd8264;">' + 'נשים ' + this.points[0].x  + '</span>' +
                            '<span style="color: #fd8264;">' + this.points[0].y + '%' + '</span>' +
                            '</div>'
                        }
                    }
                } else {
                    return '<div style="visibility: hidden;">' + '</div>'
                }
            }
        },
    });

    firstFinalChart = document.getElementsByClassName('first-final-chart')[0];

    firstFinalChartPlotLine = firstFinalChart.querySelectorAll('.first-final-chart-plotline')[0];
}

//drawFirstFinalGraph('מאומתים');

let firstFinalChart;
let firstFinalChartPlotLine;

let isMouseInLeftSide;
let isTooltipVisible = false;

let labelDiv = document.createElement('div');
labelDiv.style.height = '1.2rem';
labelDiv.style.background = 'blue';
labelDiv.style.position = 'absolute';
labelDiv.style.color = 'white';
labelDiv.style.fontSize = '0.7rem';
labelDiv.style.display = 'flex';
labelDiv.style.justifyContent = 'center';
labelDiv.style.alignItems = 'center';
labelDiv.style.zIndex = 2;
document.querySelector('body').appendChild(labelDiv);

onmousemove = (e) => {
    labelDiv.style.visibility = 'hidden';

    if (firstFinalChart) {
        if (isMouseInsideElement(firstFinalChart, e)) {
            if (document.getElementsByClassName('crosshair-line')[0]) {
                let crosshairLine = document.getElementsByClassName('crosshair-line')[0];
        
                let labelsArr = [];
                if (document.getElementsByClassName('0-9')[0]) labelsArr.push(document.getElementsByClassName('0-9')[0]);
                if (document.getElementsByClassName('10-19')[0]) labelsArr.push(document.getElementsByClassName('10-19')[0]);
                if (document.getElementsByClassName('20-29')[0]) labelsArr.push(document.getElementsByClassName('20-29')[0]);
                if (document.getElementsByClassName('30-39')[0]) labelsArr.push(document.getElementsByClassName('30-39')[0]);
                if (document.getElementsByClassName('40-49')[0]) labelsArr.push(document.getElementsByClassName('40-49')[0]);
                if (document.getElementsByClassName('50-59')[0]) labelsArr.push(document.getElementsByClassName('50-59')[0]);
                if (document.getElementsByClassName('60-69')[0]) labelsArr.push(document.getElementsByClassName('60-69')[0]);
                if (document.getElementsByClassName('70-79')[0]) labelsArr.push(document.getElementsByClassName('70-79')[0]);
                if (document.getElementsByClassName('80-89')[0]) labelsArr.push(document.getElementsByClassName('80-89')[0]);
                if (document.getElementsByClassName('+90')[0]) labelsArr.push(document.getElementsByClassName('+90')[0]);
        
                for (let i = 0; i < labelsArr.length; i++) {
                    let currentLabel = labelsArr[i];
                    let currentLabelRect = currentLabel.getClientRects();
                    let crosshairLineRect = crosshairLine.getClientRects();
                    if (currentLabelRect[0].top < crosshairLineRect[0].top && currentLabelRect[0].bottom > crosshairLineRect[0].bottom) {
                        createDivElement(currentLabel.innerHTML, currentLabel)
                    }
                }

                isTooltipVisible = false;
                for (let point of firstFinalChart.querySelectorAll('.highcharts-point')) {
                    if (isMouseInsideElement(point, e)) {
                        isTooltipVisible = true;
                        firstFinalGraphChart.redraw();
                    }
                }

                let plotLineOffSet = getOffset(firstFinalChartPlotLine);
                if (e.clientX + window.scrollX > plotLineOffSet.right) {
                    isMouseInLeftSide = true;
                } else {
                    isMouseInLeftSide = false;
                }
            }
        }
    }
}


const createDivElement = (innerText, currentLabel) => {
    let width = innerText.length;
    labelDiv.style.width = width / 2 + 'rem';
    labelDiv.innerHTML = innerText;
    labelDiv.style.top = getOffset(currentLabel).top + 'px';
    labelDiv.style.left = getOffset(currentLabel).left + 'px';
    labelDiv.style.visibility = 'visible';
}

const getOffset = (el) => {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY,
      right: rect.right + window.scrollX,
      bottom: rect.bottom + window.scrollY,
    };
}

const isMouseInsideElement = (el, e) => {
    let elementPosition = getOffset(el);
    return (e.clientX + window.scrollX > elementPosition.left && e.clientX + window.scrollX < elementPosition.right && e.clientY + window.scrollY > elementPosition.top && e.clientY + window.scrollY < elementPosition.bottom);
}


export {
    redrawFirstFinalGraph,
    drawFirstFinalGraph
};