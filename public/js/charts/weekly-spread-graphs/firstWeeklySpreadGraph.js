// const governmentTargetNum = 500;
// let plotLines2 = [];
// let isOnHoverPlotLine2 = false;
// let firstWeeklyChart;

import { getDatesByStartDateAndDuration } from "../utils/getAxisCategory.js";
import { getPointsWithUnparsedDatesByDuration } from "../utils/getDataPoints.js";
import { isAccessibilityOn } from "../../index.js";

const url = "https://covid-19-dashboard-shavit.herokuapp.com/first-weekly-data";

let firstWeeklyData;

const drawFirstWeeklyGraph = () => {
    fetch(url)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(res.status);
            }
        })
        .then((firstWeeklyInfo) => {
            firstWeeklyData = firstWeeklyInfo;
            redrawFirstWeeklyGraph(isAccessibilityOn);
        })
        .catch((err) => {
            console.log(err);
        });
};

const redrawFirstWeeklyGraph = (isAccessibilityOn) => {
    let backgroundColor;
    let columnColor;
    let textColor;
    if (!isAccessibilityOn) {
        backgroundColor = "#ffffff";
        columnColor = "#b6ca51";
        textColor = "#666666";
    } else {
        backgroundColor = "#384f5f";
        columnColor = "#fd8264";
        textColor = "white";
    }

    const points = getPointsWithUnparsedDatesByDuration(
        firstWeeklyData[0].points,
        firstWeeklyData[0].startingDate,
        7
    );
    const xAxisCategories = getDatesByStartDateAndDuration(firstWeeklyData[0].startingDate, 7);

    Highcharts.chart("first-weekly-spread-graph", {
        chart: {
            type: "column",
            backgroundColor: backgroundColor,
        },
        colors: [columnColor],
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
                text: "",
            },
            lineWidth: 0,
            categories: xAxisCategories,
            labels: {
                style: {
                    color: textColor,
                },
            },
        },
        yAxis: {
            title: {
                text: "",
            },
            gridLineWidth: 0,
            labels: {
                useHTML: true,
                formatter: function () {
                    // if (this.value === governmentTargetNum) {
                    //     return '<span style="background-color: #f0465e; color: white; margin-left: 10px; padding: 0 5px; font-size: 0.75rem;">' +
                    //     governmentTargetNum +
                    //     '</span>'
                    // }
                    if (!isAccessibilityOn) {
                        return '<span style="color: black;">' + this.value + "</span>";
                    } else {
                        return '<span style="color: white;">' + this.value + "</span>";
                    }
                },
            },
            tickInterval: 300,
            //plotLines: [
            //     {
            //     value: governmentTargetNum,
            //     color: 'red',
            //     width: 1,
            //     dashStyle: 'dash',
            //     zIndex: 6,
            //     className: 'first-weekly-graph-PlotLine-class'
            // }
            // {
            //     value: 0,
            //     color: 'white',
            //     width: 6,
            //     dashStyle: 'Solid',
            //     zIndex: 5,
            // }]
        },
        series: [
            {
                //data: [[xAxisCategories[0], 795], [xAxisCategories[1], 1027], [xAxisCategories[2], 934], [xAxisCategories[3], 1237], [xAxisCategories[4], 1104], [xAxisCategories[5], 1134], [xAxisCategories[6], 642]],
                data: points,
                pointWidth: 7,
                borderRadiusTopLeft: "50px",
                borderRadiusTopRight: "50px",
            },
        ],
        tooltip: {
            enabled: false,
        },
        plotOptions: {
            column: {
                borderWidth: 0,
                marker: {
                    enabled: true,
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
                type: "column",
                states: {
                    hover: {
                        enabled: true,
                        lineWidth: 1.5,
                        halo: {
                            size: 0,
                        },
                    },
                    inactive: {
                        opacity: 1,
                    },
                },
                marker: {
                    enabled: true,
                    lineWidth: 2,
                    radius: 3,
                    states: {
                        hover: {
                            animation: false,
                            lineWidth: 2,
                            radius: 3,
                            fillColor: "#eeeeee",
                        },
                    },
                },
                dataLabels: [
                    {
                        enabled: true,
                        useHTML: true,
                        formatter: function () {
                            if (!isAccessibilityOn) {
                                return (
                                    '<span style="color: black; font-size: 0.7rem; font-weight: 400;">' +
                                    this.y +
                                    "</span>"
                                );
                            } else {
                                return (
                                    '<span style="color: white; font-size: 0.7rem; font-weight: 400;">' +
                                    this.y +
                                    "</span>"
                                );
                            }
                        },
                        align: "center",
                        verticalAlign: "bottom",
                    },
                ],
                line: {
                    states: {
                        hover: {
                            enabled: true,
                            lineWidth: 5,
                        },
                    },
                },
            },
        },
    });
};

drawFirstWeeklyGraph();

export { redrawFirstWeeklyGraph };

// const drawFirstWeeklyGraph = () => {
//     fetch(url)
//     .then((res) => {
//         if (res.ok) {
//             return res.json();
//         } else {
//             throw new Error(res.status);
//         }
//     })
//     .then((firstWeeklyData) => {
//         const points = getPointsWithUnparsedDatesByDuration(firstWeeklyData[0].points, firstWeeklyData[0].startingDate, 7);
//         const xAxisCategories = getDatesByStartDateAndDuration(firstWeeklyData[0].startingDate, 7);

//         Highcharts.chart('first-weekly-spread-graph', {
//             chart: {
//                 type: 'column',
//             },
//             colors: ['#b6ca51'],
//             credits: {
//                 enabled: false,
//             },
//             title: {
//                 text: ''
//             },
//             legend: {
//                 enabled: false,
//             },
//             xAxis: {
//                 title: {
//                     text: '',
//                 },
//                 lineWidth: 0,
//                 categories: xAxisCategories,
//             },
//             yAxis: {
//                 title: {
//                     text: '',
//                 },
//                 gridLineWidth: 0,
//                 labels: {
//                     useHTML: true,
//                     formatter: function() {
//                         // if (this.value === governmentTargetNum) {
//                         //     return '<span style="background-color: #f0465e; color: white; margin-left: 10px; padding: 0 5px; font-size: 0.75rem;">' +
//                         //     governmentTargetNum +
//                         //     '</span>'
//                         // }
//                         return '<span>' + this.value + '</span>';
//                     },
//                 },
//                 tickInterval: 300,
//                 //plotLines: [
//                 //     {
//                 //     value: governmentTargetNum,
//                 //     color: 'red',
//                 //     width: 1,
//                 //     dashStyle: 'dash',
//                 //     zIndex: 6,
//                 //     className: 'first-weekly-graph-PlotLine-class'
//                 // }
//                 // {
//                 //     value: 0,
//                 //     color: 'white',
//                 //     width: 6,
//                 //     dashStyle: 'Solid',
//                 //     zIndex: 5,
//                 // }]
//             },
//             series: [
//                 {
//                     //data: [[xAxisCategories[0], 795], [xAxisCategories[1], 1027], [xAxisCategories[2], 934], [xAxisCategories[3], 1237], [xAxisCategories[4], 1104], [xAxisCategories[5], 1134], [xAxisCategories[6], 642]],
//                     data: points,
//                     pointWidth: 10,
//                     borderRadiusTopLeft: '50px',
//                     borderRadiusTopRight: '50px',
//                 },
//             ],
//             tooltip: {
//                 enabled: false,
//             },
//             plotOptions: {
//                 column: {
//                     //borderRadius: 5,
//                     marker: {
//                         enabled: true,
//                         width: 0,
//                         states: {
//                             hover: {
//                               enabled: true,
//                             }
//                         },
//                     },
//                     cursor: 'pointer',
//                 },
//                 series: {
//                     type: 'column',
//                     states: {
//                         hover: {
//                             enabled: true,
//                             lineWidth: 1.5,
//                             halo: {
//                                 size: 0,
//                             },
//                         },
//                         inactive: {
//                             opacity: 1
//                         }
//                     },
//                     marker: {
//                         enabled: true,
//                         fillColor: '#ffffff',
//                         lineColor: '#48caff',
//                         lineWidth: 2,
//                         radius: 3,
//                         states: {
//                             hover: {
//                                 animation: false,
//                                 lineWidth: 2,
//                                 radius: 3,
//                                 fillColor: '#eeeeee',
//                             }
//                         }
//                     },
//                     dataLabels: [{
//                         enabled: true,
//                         formatter: function() {
//                             return '<span style="font-size: 0.7rem; font-weight: 400;">' +  this.y + '</span>';
//                         },
//                         align: 'center',
//                         verticalAlign: 'bottom'
//                     }],
//                     line: {
//                         states: {
//                             hover: {
//                                 enabled: true,
//                                 lineWidth: 5,
//                             }
//                         }
//                     }
//                 },
//             }
//         });
//     })
//     .catch((err) => {
//         console.log(err);
//     });
// };

// drawFirstWeeklyGraph();

// onmousemove = (e) => {
//     let plotLine2 = document.getElementsByClassName('first-weekly-graph-PlotLine-class')[0];
//     let rect2 = plotLine2.getClientRects();
//     const plotLineHeightAdditionCounter2 = 5;
//     if (rect2[0].right >= e.clientX && rect2[0].left <= e.clientX && rect2[0].top - plotLineHeightAdditionCounter2 < e.clientY && rect2[0].bottom + plotLineHeightAdditionCounter2 > e.clientY) {
//         if (!isOnHoverPlotLine2) {
//             plotLines2.push(firstWeeklyChart.yAxis[0].addPlotLine({
//             id: 'first-weekly-graph-PlotLine-id',
//             value: governmentTargetNum,
//             color: 'red',
//             width: 3,
//             dashStyle: 'Solid',
//             }));

//             isOnHoverPlotLine2 = !isOnHoverPlotLine2;
//         }
//     } else if (isOnHoverPlotLine2) {
//         firstWeeklyChart.yAxis[0].removePlotLine('first-weekly-graph-PlotLine-id');
//         isOnHoverPlotLine2 = !isOnHoverPlotLine2;
//     }
// };
