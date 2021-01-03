// const governmentTargetPercentage = 7;
// let plotLines = [];
// let isOnHoverPlotLine = false;

import { getDatesByStartDateAndDuration } from '../utils/getAxisCategory.js';
import { getPointsWithUnparsedDatesByDuration } from '../utils/getDataPoints.js';
import { isAccessibilityOn } from '../../index.js';

const url = 'http://localhost:3000/last-weekly-data';

let lastWeeklyData;

const drawLastWeeklyGraph = () => {
    fetch(url)
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error(res.status);
        }
    })
    .then((lastWeeklyInfo) => {
        lastWeeklyData = lastWeeklyInfo;
        redrawLastWeeklyGraph(isAccessibilityOn);
    })
    .catch((err) => {
        console.log(err);
    });
};

const redrawLastWeeklyGraph = (isAccessibilityOn) => {
    let backgroundColor;
    let graphColor;
    let textColor;
    let markerFillColor;
    if (!isAccessibilityOn) {
        backgroundColor = '#ffffff';
        graphColor = '#48caff';
        textColor = '#666666'
        markerFillColor = 'white';
    } else {
        backgroundColor = '#384f5f'
        graphColor = 'rgba(97, 186, 35, 0.8)';
        graphColor = '#2cd2db';
        textColor = 'white';
        markerFillColor = '#666666';
    }

    const points = getPointsWithUnparsedDatesByDuration(lastWeeklyData[0].points, lastWeeklyData[0].startingDate, 7);
    const xAxisCategories = getDatesByStartDateAndDuration(lastWeeklyData[0].startingDate, 7);
    let additionalPointsData = lastWeeklyData[0].additionalPointsData.split(',');
    additionalPointsData = additionalPointsData.map((point) => parseInt(point.replace(' ', '')));
    let labelDataIndexCounter = 0;

    Highcharts.chart('last-weekly-spread-graph', {
        chart: {
            type: 'area',
            spacingLeft: -6,
            backgroundColor: backgroundColor
            // spacingRight: -20,
        },
        colors: [{
            linearGradient: {
                x1: 0,
                x2: 0,
                y1: 0,
                y2: 1
            },
            stops: [
                [0, graphColor],
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
                text: '',
            },
            lineWidth: 0,
            categories: xAxisCategories,
            labels: {
                style: {
                    color: textColor
                },
            }
        },
        yAxis: {
            title: {
                text: 'אחוז שינוי יומי',
                style: {
                    color: textColor
                },
                // margin: -5,
            },
            max: 9,
            offset: -15,
            gridLineWidth: 0,
            labels: {
                useHTML: true,
                style: {
                    color: textColor
                },
                formatter: function() {
                    // if (this.value === governmentTargetPercentage) {
                    //     return '<span style="background-color: #f0465e; color: white; margin-left: 10px; padding: 0 5px; font-size: 0.75rem;">' +
                    //     governmentTargetPercentage + '%' +
                    //     '</span>'
                    // }
                    if (this.value === 0 || this.value === 2 || this.value === 4 || this.value === 6 || this.value === 7 || this.value === 8 || this.value === 9) {
                        return '<span>' +
                        this.value + '%' +
                        '</span>'
                    }
                },
            },
            tickInterval: 1,
            // plotLines: [{
            //     value: governmentTargetPercentage,
            //     color: 'red',
            //     width: 1,
            //     dashStyle: 'dash',
            //     className: 'second-weekly-graph-PlotLine-class',
            // }]
        },
        series: [
            {
                type: 'area',
                //data: [[xAxisCategories[0], 4], [xAxisCategories[1], 3], [xAxisCategories[2], 4], [xAxisCategories[3], 5], [xAxisCategories[4], 5], [xAxisCategories[5], 7], [xAxisCategories[6], 5]],
                data: points,
                lineColor: graphColor,
                lineWidth: 1.5,
            },
        ],
        tooltip: {
            enabled: false,
        },
        plotOptions: {
            area: {
                marker: {
                    enabled: true,
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
                type: 'area',
                states: {
                    hover: {
                        enabled: true,
                        lineWidth: 1.5,
                        halo: {
                            size: 0,
                        },
                    },
                    inactive: {
                        opacity: 1
                    }
                },
                marker: {
                    enabled: true,
                    fillColor: markerFillColor,
                    lineColor: graphColor,
                    lineWidth: 2,
                    radius: 3,
                    states: {
                        hover: {
                            animation: false,
                            lineWidth: 2,
                            radius: 3,
                            fillColor: '#eeeeee',
                        }
                    }
                },
                dataLabels: [{
                    enabled: true,
                    useHTML: true,
                    color: textColor,
                    formatter: function() {
                        labelDataIndexCounter++;
                        return '<span style="font-size: 0.7rem;">' +  this.y + '%' + '</span>' + '<br>' + '<span style="font-weight: 400; font-size: 0.7rem;">' + '(' + additionalPointsData[labelDataIndexCounter - 1] + ')' + '</span>';
                    },
                    align: 'center',
                    verticalAlign: 'bottom'
                }],
                line: {
                    states: {
                        hover: {
                            enabled: true,
                            lineWidth: 5,
                        }
                    }
                }
            },
        }
    });
}

drawLastWeeklyGraph();

export { redrawLastWeeklyGraph };

// onmousemove = (e) => {
//     let plotLine22 = document.getElementsByClassName('second-weekly-graph-PlotLine-class')[0];
//     console.log(plotLine22)
//     let rect = plotLine.getClientRects();
//     const plotLineHeightAdditionCounter = 5;
//     if (rect[0].right >= e.clientX && rect[0].left <= e.clientX && rect[0].top - plotLineHeightAdditionCounter < e.clientY && rect[0].bottom + plotLineHeightAdditionCounter > e.clientY) {
//         if (!isOnHoverPlotLine) {
//             plotLines.push(lastWeeklyChart.yAxis[0].addPlotLine({
//             id: 'second-weekly-graph-PlotLine-id',
//             value: governmentTargetPercentage,
//             color: 'red',
//             width: 3,
//             dashStyle: 'Solid',
//             }));

//             isOnHoverPlotLine = !isOnHoverPlotLine;
//         }
//     } else if (isOnHoverPlotLine) {
//         lastWeeklyChart.yAxis[0].removePlotLine('second-weekly-graph-PlotLine-id');
//         isOnHoverPlotLine = !isOnHoverPlotLine;
//     }
// };




// {
            //     type: 'line',
            //     data: [[xAxisCategories[0], governmentTargetPercentage], [xAxisCategories[1], governmentTargetPercentage], [xAxisCategories[2], governmentTargetPercentage], [xAxisCategories[3], governmentTargetPercentage], [xAxisCategories[4], governmentTargetPercentage], [xAxisCategories[5], governmentTargetPercentage], [xAxisCategories[6], governmentTargetPercentage]],
            //     lineColor: '#f0465e',
            //     dashStyle: 'dash',
            //     lineWidth: 1,
            //     marker: {
            //         enabled: false
            //     },
            //     // states: {
            //     //     hover: {
            //     //         marker: {
            //     //             enabled: false
            //     //         },
            //     //     }
            //     // },
            //     dataLabels: {
            //         enabled: false,
            //     },
            //     // enableMouseTracking: false,
            //     states: {
            //         hover: {
            //             enabled: true,
            //             lineWidth: 10,
            //             marker: {
            //                 enabled: false
            //             }
            //         }
            //     }
            //     // plotOptions: {
            //     //     marker: {
            //     //         states: {
            //     //             hover: {
            //     //                 enabled: false,
            //     //             }
            //     //         }
            //     //     }
            //     //     // series: {
            //     //     //     marker: {
            //     //     //         hover: {
            //     //     //             lineWidth: 0,
            //     //     //             radius: 0,
            //     //     //             fillColor: 'red',
            //     //     //         },
            //     //     //     },
            //     //     //     states: {
            //     //     //         inactive: {
            //     //     //             opacity: 1
            //     //     //         }
            //     //     //     },
            //     //     // },
            //     // },
            // }