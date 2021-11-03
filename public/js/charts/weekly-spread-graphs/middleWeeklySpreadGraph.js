import { getDatesByStartDateAndDuration } from "../utils/getAxisCategory.js";
import { getPointsWithUnparsedDatesByDuration } from "../utils/getDataPoints.js";
import { isAccessibilityOn } from "../../index.js";

const url = "https://covid-19-dashboard-shavit.herokuapp.com/middle-weekly-data";

let middleWeeklyData;

const drawMiddleWeeklyGraph = () => {
    fetch(url)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(res.status);
            }
        })
        .then((middleWeeklyInfo) => {
            middleWeeklyData = middleWeeklyInfo;
            redrawMiddleWeeklyGraph(isAccessibilityOn);
        })
        .catch((err) => {
            console.log(err);
        });
};

const redrawMiddleWeeklyGraph = (isAccessibilityOn) => {
    let backgroundColor;
    let graphColor;
    let lineColor;
    let textColor;
    let markerFillColor;
    if (!isAccessibilityOn) {
        backgroundColor = "#ffffff";
        graphColor = "rgba(28, 125, 126, 0.7)";
        lineColor = "#1c7d7e";
        textColor = "#666666";
        markerFillColor = "white";
    } else {
        backgroundColor = "#384f5f";
        graphColor = "rgba(97, 186, 35, 0.8)";
        lineColor = "#9ffa82";
        textColor = "white";
        markerFillColor = "#666666";
    }

    const points = getPointsWithUnparsedDatesByDuration(
        middleWeeklyData[0].points,
        middleWeeklyData[0].startingDate,
        7
    );
    const xAxisCategories = getDatesByStartDateAndDuration(middleWeeklyData[0].startingDate, 7);

    Highcharts.chart("middle-weekly-spread-graph", {
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
                    [0, graphColor],
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
                style: {
                    color: textColor,
                },
            },
            tickInterval: 92,
        },
        series: [
            {
                type: "area",
                //data: [[xAxisCategories[0], 275], [xAxisCategories[1], 278], [xAxisCategories[2], 292], [xAxisCategories[3], 308], [xAxisCategories[4], 326], [xAxisCategories[5], 328], [xAxisCategories[6], 329]],
                data: points,
                lineColor: lineColor,
                lineWidth: 1,
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
                        },
                    },
                },
                cursor: "pointer",
            },
            series: {
                type: "area",
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
                    fillColor: markerFillColor,
                    lineColor: lineColor,
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
                        color: textColor,
                        formatter: function () {
                            return '<span style="font-weight: 400;">' + this.y + "</span>";
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

drawMiddleWeeklyGraph();

export { redrawMiddleWeeklyGraph };
