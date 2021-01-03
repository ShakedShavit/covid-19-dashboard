import { getPointsByStartAndEndDates } from '../utils/getDataPoints.js';
import { isAccessibilityOn } from '../../index.js';

const url = 'http://localhost:3000/second-card-data';

let secondCardData;

const drawSecondCardGraph = () => {
    fetch(url)
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error(res.status);
        }
    })
    .then((secondCardInfo) => {
        secondCardData = secondCardInfo;
        redrawSecondCardGraph(isAccessibilityOn);
    })
    .catch((err) => {
        console.log(err);
    });
};

const redrawSecondCardGraph = (isAccessibilityOn) => {
    let backgroundColor;
    let horizontalGridLinesWidth;
    let lineColor;
    let crosshairLinesColor;
    let crosshairLabelsBackgroundColor;
    let titleColor;
    if (!isAccessibilityOn) {
        backgroundColor = '#ffffff';
        horizontalGridLinesWidth = 1;
        lineColor = '#48caff';
        crosshairLinesColor = 'rgba(0, 0, 0, 0.6)';
        crosshairLabelsBackgroundColor = 'white';
        titleColor = '#666666'
    } else {
        backgroundColor = '#384f5f'
        horizontalGridLinesWidth = 0;
        lineColor = '#2cd2db';
        crosshairLinesColor = 'grey';
        crosshairLabelsBackgroundColor = '#2a3b47';
        titleColor = 'white';
    }

    const points = getPointsByStartAndEndDates(secondCardData[0].points, secondCardData[0].startingDate, secondCardData[0].endDate);

    $secondCardGraphButton.addEventListener("click", () => {
        Highcharts.chart('second-card-graph', {
            chart: {
                type: 'area',
                backgroundColor: backgroundColor
            },
            colors: [{
                linearGradient: {
                    x1: 0,
                    x2: 0,
                    y1: 0,
                    y2: 1
                },
                stops: [
                    [0, '#2cd2db'],
                    [1, backgroundColor]
                ]
            }],
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
                    text: 'תאריך',
                    style: {
                        color: titleColor
                    }
                },
                type: 'datetime',
                labels: {
                    formatter: function(value) {
                        let date = new Date(value.value);
                        let month = date.getMonth();
                        date = date.getDate() + '.' + ++month;

                        for (let i = 0; i < points.length; i++) {
                            const pointDate = new Date(points[i][0]);
                            const currentPoint = new Date(value.value);
                            if (pointDate.getMonth() === currentPoint.getMonth() && pointDate.getDate() === currentPoint.getDate()) {
                                points[i] = {x: points[i][0], y: points[i][1], marker: {enabled: true,radius:4,states:{hover:{radius:8}}}}
                            }
                        }
                        
                        if (!isAccessibilityOn) {
                            return '<span style="color: black;">' + date + '</span>';
                        } else {
                            return '<span style="color: white;">' + date + '</span>';
                        }
                    },
                },
                tickInterval: 24 * 3600 * 1000 * (Math.round(points.length / 7)),
                lineWidth: 0,
                tickLength: 0,
                crosshair: {
                    width: 0.7,
                    color: crosshairLinesColor,
                    zIndex: 3,
                    snap: true,
                    label: {
                        enabled: true,
                        backgroundColor: crosshairLabelsBackgroundColor,
                        borderWidth: '0.1px',
                        borderColor: 'black',
                        padding: 3,
                        shape: 'square',
                        borderColor: titleColor,
                        borderWidth: 0.2,
                        formatter: function(value) {
                            let date = new Date(value);
                            let month = date.getMonth();

                            if (!isAccessibilityOn) {
                                return '<div style="color: black; direction: ltr;">'
                            + date.getDate() + '.' + ++month
                            + '</div>';
                            } else {
                                return '<div style="color: white; direction: ltr;">'
                            + date.getDate() + '.' + ++month
                            + '</div>';
                            }
                        },
                    },
                },
            },
            yAxis: {
                title: {
                    text: 'כמות מונשמים',
                    style: {
                        color: titleColor
                    }
                },
                labels: {
                    formatter: function(value) {
                        if (!isAccessibilityOn) {
                            return '<span style="color: black;">' + value.value + '</span>';
                        } else {
                            return '<span style="color: white;">' + value.value + '</span>';
                        }
                    },
                },
                gridLineWidth: horizontalGridLinesWidth,
                crosshair: {
                    width: 0.7,
                    color: crosshairLinesColor,
                    dashStyle: 'LongDash',
                    zIndex: 3,
                    snap: false,
                    label: {
                        enabled: true,
                        backgroundColor: crosshairLabelsBackgroundColor,
                        borderWidth: '0.1px',
                        borderColor: 'black',
                        padding: 3,
                        shape: 'square',
                        borderColor: titleColor,
                        borderWidth: 0.2,

                        formatter: function(value) {
                            if (!isAccessibilityOn) {
                                return '<div style="color: black; direction: ltr; padding: 10px">'
                                + value.toFixed(2)
                                + '</div>';
                            } else {
                                return '<div style="color: white; direction: ltr; padding: 10px">'
                                + value.toFixed(2)
                                + '</div>';
                            }
                        },
                    }
                },
            },
            series: [
                {
                    name: 'מונשמים',
                    //data: [130, 99, 77, 250, 320, 480,130, 220, 156, 150, 320, 199, 220, 56, 450, 420,130, 220, 56, 450, 420,130, 220, 56, 450, 420, 220, 56, 450, 420, 480,130, 220, 56, 450, 420,130, 220, 156, 250, 220,130, 220, 256, 450, 320,130, 220, 356, 250, 220, 220, 256, 350, 420, 480,130, 220, 56, 450, 420,130, 220, 56, 450, 420,130, 220, 56, 450, 433,130, 220, 56, 450, 420, 220, 56, 111, 420, 480,130, 220, 566, 450, 420,130, 220, 56, 450, 420,130, 220, 56, 450, 420,130, 20, 56, 450, 20, 220, 56, 50, 420, 480,130, 220, 656, 450, 420,130, 220, 56, 150, 420,130, 220, 56, 450, 420,130, 220, 56, 450, 420],
                    data: points,
                    lineColor: lineColor,
                    lineWidth: 1,
                },
            ],
            tooltip: {
                borderColor: 'none',
                backgroundColor: 'none',
                valueSuffix: '°C',
                shadow: false,
                useHTML: true,
                formatter: function() {
                    if (!isAccessibilityOn) {
                        return '<div style="width: 100px; padding: 7px;" class="card-graph-tooltip card-graph-tooltip__no-accessibility">' + this.y + ' ' + 'מונשמים' + '</div>'
                    } else {
                        return '<div style="width: 100px; padding: 7px;" class="card-graph-tooltip card-graph-tooltip__accessibility-mode">' + this.y + ' ' + 'מונשמים' + '</div>'
                    }
                }
            },
            plotOptions: {
                area: {
                    marker: {
                        enabled: false,
                        width: 0,
                        states: {
                            hover: {
                              enabled: true,
                            }
                        },
                    },
                    cursor: 'pointer',
                },
                series: {
                    states: {
                        hover: {
                            enabled: true,
                            lineWidth: 1,
                        }
                    },
                    marker: {
                        enabled: true,
                        fillColor: lineColor,
                        lineColor: lineColor,
                    },
                }
            }
        });
    });
}

drawSecondCardGraph();

const $secondCardGraphButton = Array.from(document.getElementsByClassName('card-graph__open'))[1];


export { redrawSecondCardGraph };