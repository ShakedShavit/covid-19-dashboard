import { getPointsByStartAndEndDates } from "../utils/getDataPoints.js";
import { isAccessibilityOn } from "../../index.js";

const url = "https://covid-19-dashboard-shavit.herokuapp.com/first-card-data";

let firstCardData;

const drawFirstCardGraph = () => {
    fetch(url)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(res.status);
            }
        })
        .then((firstCardInfo) => {
            firstCardData = firstCardInfo;
            redrawFirstCardGraph(isAccessibilityOn);
        })
        .catch((err) => {
            console.log(err);
        });
};

const redrawFirstCardGraph = (isAccessibilityOn) => {
    let backgroundColor;
    let horizontalGridLinesWidth;
    let lineColor;
    let crosshairLinesColor;
    let crosshairLabelsBackgroundColor;
    let titleColor;
    if (!isAccessibilityOn) {
        backgroundColor = "#ffffff";
        horizontalGridLinesWidth = 1;
        lineColor = "#48caff";
        crosshairLinesColor = "rgba(0, 0, 0, 0.6)";
        crosshairLabelsBackgroundColor = "white";
        titleColor = "#666666";
    } else {
        backgroundColor = "#384f5f";
        horizontalGridLinesWidth = 0;
        lineColor = "#2cd2db";
        crosshairLinesColor = "grey";
        crosshairLabelsBackgroundColor = "#2a3b47";
        titleColor = "white";
    }

    const points = getPointsByStartAndEndDates(
        firstCardData[0].points,
        firstCardData[0].startingDate,
        firstCardData[0].endDate
    );
    $firstCardGraphButton.addEventListener("click", () => {
        Highcharts.chart("first-card-graph", {
            chart: {
                type: "area",
                backgroundColor: backgroundColor,
            },
            colors: [
                {
                    linearGradient: {
                        x1: 0,
                        x2: 0,
                        y1: 0,
                        y2: 1,
                    },
                    stops: [
                        [0, "#2cd2db"],
                        [1, backgroundColor],
                    ],
                },
            ],
            credits: {
                enabled: false,
            },
            title: {
                text: "",
            },
            legend: {
                enabled: false,
            },
            xAxis: {
                title: {
                    text: "תאריך",
                    style: {
                        color: titleColor,
                    },
                },
                type: "datetime",
                labels: {
                    formatter: function (value) {
                        let date = new Date(value.value);
                        let month = date.getMonth();
                        date = date.getDate() + "." + ++month;

                        for (let i = 0; i < points.length; i++) {
                            const pointDate = new Date(points[i][0]);
                            const currentPoint = new Date(value.value);
                            if (
                                pointDate.getMonth() === currentPoint.getMonth() &&
                                pointDate.getDate() === currentPoint.getDate()
                            ) {
                                points[i] = {
                                    x: points[i][0],
                                    y: points[i][1],
                                    marker: {
                                        enabled: true,
                                        radius: 4,
                                        states: { hover: { radius: 8 } },
                                    },
                                };
                            }
                        }

                        if (!isAccessibilityOn) {
                            return '<span style="color: black;">' + date + "</span>";
                        } else {
                            return '<span style="color: white;">' + date + "</span>";
                        }
                    },
                },
                tickInterval: 24 * 3600 * 1000 * Math.round(points.length / 7),
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
                        borderWidth: "0.1px",
                        borderColor: "black",
                        padding: 3,
                        shape: "square",
                        borderColor: titleColor,
                        borderWidth: 0.2,
                        formatter: function (value) {
                            let date = new Date(value);
                            let month = date.getMonth();

                            if (!isAccessibilityOn) {
                                return (
                                    '<div style="color: black; direction: ltr;">' +
                                    date.getDate() +
                                    "." +
                                    ++month +
                                    "</div>"
                                );
                            } else {
                                return (
                                    '<div style="color: white; direction: ltr;">' +
                                    date.getDate() +
                                    "." +
                                    ++month +
                                    "</div>"
                                );
                            }
                        },
                    },
                },
            },
            yAxis: {
                title: {
                    text: "כמות מונשמים",
                    style: {
                        color: titleColor,
                    },
                },
                labels: {
                    formatter: function (value) {
                        if (!isAccessibilityOn) {
                            return '<span style="color: black;">' + value.value + "</span>";
                        } else {
                            return '<span style="color: white;">' + value.value + "</span>";
                        }
                    },
                },
                gridLineWidth: horizontalGridLinesWidth,
                crosshair: {
                    width: 0.7,
                    color: crosshairLinesColor,
                    dashStyle: "LongDash",
                    zIndex: 3,
                    snap: false,
                    label: {
                        enabled: true,
                        // format: '{value:.2f}',
                        backgroundColor: crosshairLabelsBackgroundColor,
                        borderWidth: "0.1px",
                        borderColor: "black",
                        padding: 3,
                        shape: "square",
                        borderColor: titleColor,
                        borderWidth: 0.2,
                        formatter: function (value) {
                            if (!isAccessibilityOn) {
                                return (
                                    '<div style="color: black; direction: ltr; padding: 10px">' +
                                    value.toFixed(2) +
                                    "</div>"
                                );
                            } else {
                                return (
                                    '<div style="color: white; direction: ltr; padding: 10px">' +
                                    value.toFixed(2) +
                                    "</div>"
                                );
                            }
                        },
                    },
                },
            },
            series: [
                {
                    name: "מונשמים",
                    // data: [130, 99, 77, 250, 320, 480,130, 220, 156, 150, 320, 199, 220, 56, 450, 420,130, 220, 56, 450, 420,130, 220, 56, 450, 420, 220, 56, 450, 420, 480,130, 220, 56, 450, 420,130, 220, 156, 250, 220,130, 220, 256, 450, 320,130, 220, 356, 250, 220, 220, 256, 350, 420, 480,130, 220, 56, 450, 420,130, 220, 56, 450, 420,130, 220, 56, 450, 433,130, 220, 56, 450, 420, 220, 56, 111, 420, 480,130, 220, 566, 450, 420,130, 220, 56, 450, 420,130, 220, 56, 450, 420,130, 20, 56, 450, 20, 220, 56, 50, 420, 480,130, 220, 656, 450, 420,130, 220, 56, 150, 420,130, 220, 56, 450, 420,130, 220, 56, 450, 420],
                    data: points,
                    lineColor: lineColor,
                    lineWidth: 1,
                },
            ],
            tooltip: {
                borderColor: "none",
                backgroundColor: "none",
                valueSuffix: "°C",
                shadow: false,
                useHTML: true,
                formatter: function () {
                    if (!isAccessibilityOn) {
                        return (
                            '<div style="width: 100px; padding: 7px;" class="card-graph-tooltip card-graph-tooltip__no-accessibility">' +
                            this.y +
                            " " +
                            "מונשמים" +
                            "</div>"
                        );
                    } else {
                        return (
                            '<div style="width: 100px; padding: 7px;" class="card-graph-tooltip card-graph-tooltip__accessibility-mode">' +
                            this.y +
                            " " +
                            "מונשמים" +
                            "</div>"
                        );
                    }
                },
            },
            plotOptions: {
                area: {
                    marker: {
                        enabled: false,
                        width: 0,
                        states: {
                            hover: {
                                enabled: true,
                            },
                        },
                    },
                    cursor: "pointer",
                },
                series: {
                    states: {
                        hover: {
                            enabled: true,
                            lineWidth: 1,
                        },
                    },
                    marker: {
                        enabled: true,
                        fillColor: lineColor,
                        lineColor: lineColor,
                    },
                },
            },
        });
    });
};

drawFirstCardGraph();

const $firstCardGraphButton = Array.from(document.getElementsByClassName("card-graph__open"))[0];

export { redrawFirstCardGraph };

// Generating random arrays
// function getRandomInt(max) {
//     return Math.floor(Math.random() * Math.floor(max));
//   }
//   let arr = [];
//   let lastNum = 0;
//   let factor = 2000;
//   for (let i = 0; i < 50; i++) {
//       lastNum += getRandomInt(factor);
//       arr.push(lastNum);
//   }
//    console.log(arr);
//   for (let i = 0; i < 50; i++) {
//     lastNum += getRandomInt(factor);
//     arr.push(lastNum);
// }
//   console.log(arr.slice(50, 100));
//   console.log(arr.slice(100, 150));

//   const b = document.getElementById('first-card-graph');
//   b.addEventListener('mousemove', (e) => {
//       let x = e.pageX;
//       let y = e.pageY;

//   if (chart.crossLabel) {
//       // update label
//       chart.crossLabel.attr({
//           y: y + 6,
//           text: chart.yAxis[0].toValue(y).toFixed(2)
//       });
//   } else {
//       // draw label
//       chart.crossLabel = chart.renderer.text(chart.yAxis[0].toValue(y).toFixed(2), chart.plotLeft - 40, y + 6).add();
//   }
//   })

// console.log(document.getElementById('first-card-graph').style);
// Highcharts.chart('first-card-graph', {
//     chart: {
//         type: 'line'
//     },
//     xAxis: {
//         categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
//     },
//     yAxis: {
//     },
//     legend: {
//         layout: 'vertical',
//         backgroundColor: '#FFFFFF',
//         floating: true,
//         align: 'left',
//         x: 100,
//         verticalAlign: 'top',
//         y: 70
//     },
//     tooltip: {
//             backgroundColor: '#FCFFC5',

//         formatter: function () {
//             return '<b>' + this.series.name + '</b><br/>' +
//                 this.x + ': ' + this.y;
//         }
//     },
//     plotOptions: {
//     },
//     series: [{
//         data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
//     }]
// });

// let xPosValue;
// let yPosValue;

// const firstCardGraph = document.getElementById('first-card-graph');
// firstCardGraph.addEventListener('mousemove', (e) => {
//     let rect = firstCardGraph.getBoundingClientRect();

//     xPosValue = -1 * (rect.right - e.x);
//     yPosValue = -1 * (e.y - rect.bottom);
// })
