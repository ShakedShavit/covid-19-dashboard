import {
    getPointsByStartAndEndDates,
    getPointsByStartDateAndDuration,
} from "../utils/getDataPoints.js";
import getDateOfNumberOfDaysAgo from "../utils/getDateOfNumberOfDaysAgo.js";
import getNumberWithCommas from "../utils/getNumberWithCommas.js";

const url = "https://covid-19-dashboard-shavit.herokuapp.com/second-by-time-data";

let secondByTimeData;

const drawSecondByTimeGraph = (durationStr, isAccessibilityOn) => {
    fetch(url)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(res.status);
            }
        })
        .then((secondByTimeInfo) => {
            secondByTimeData = secondByTimeInfo;
            redrawSecondByTimeGraph(durationStr, isAccessibilityOn);
        })
        .catch((err) => {
            console.log(err);
        });
};

const redrawSecondByTimeGraph = (durationStr, isAccessibilityOn) => {
    let greenLinePoints;
    let blueLinePoints;
    let date = new Date();
    let startingDate;
    let endDate;
    let month;
    switch (durationStr) {
        case "עד עכשיו": // All time
            startingDate = secondByTimeData[0].allTimeStartingDate;
            month = date.getMonth();
            endDate = "" + date.getDate() + "." + ++month;
            greenLinePoints = getPointsByStartAndEndDates(
                secondByTimeData[0].allTimeFirstSeriesPoints,
                startingDate,
                endDate
            );
            blueLinePoints = getPointsByStartAndEndDates(
                secondByTimeData[0].allTimeSecondSeriesPoints,
                startingDate,
                endDate
            );
            break;
        case "חודש אחרון": // Last month
            month = date.getMonth() === 0 ? 12 : date.getMonth();
            startingDate = date.getDate() + "." + month;
            month = date.getMonth();
            endDate = "" + date.getDate() + "." + ++month;
            greenLinePoints = getPointsByStartAndEndDates(
                secondByTimeData[0].lastMonthFirstSeriesPoints,
                startingDate,
                endDate
            );
            blueLinePoints = getPointsByStartAndEndDates(
                secondByTimeData[0].lastMonthSecondSeriesPoints,
                startingDate,
                endDate
            );
            break;
        case "שבועיים אחרונים": // Last two weeks
            startingDate = getDateOfNumberOfDaysAgo(14);
            greenLinePoints = getPointsByStartDateAndDuration(
                secondByTimeData[0].lastTwoWeeksFirstSeriesPoints,
                startingDate,
                14
            );
            blueLinePoints = getPointsByStartDateAndDuration(
                secondByTimeData[0].lastTwoWeeksSecondSeriesPoints,
                startingDate,
                14
            );
            break;
        case "שבוע אחרון": // Last week
            startingDate = getDateOfNumberOfDaysAgo(7);
            greenLinePoints = getPointsByStartDateAndDuration(
                secondByTimeData[0].lastWeekFirstSeriesPoints,
                startingDate,
                7
            );
            blueLinePoints = getPointsByStartDateAndDuration(
                secondByTimeData[0].lastWeekSecondSeriesPoints,
                startingDate,
                7
            );
            break;
    }

    let backgroundColor;
    let firstLineColor;
    let secondLineColor;
    let crosshairLinesColor;
    let crosshairLabelsBackgroundColor;
    let textColor;
    if (!isAccessibilityOn) {
        backgroundColor = "#ffffff";
        firstLineColor = "#b6ca51";
        secondLineColor = "#48caff";
        crosshairLinesColor = "rgba(0, 0, 0, 0.6)";
        crosshairLabelsBackgroundColor = "white";
        textColor = "#666666";
    } else {
        backgroundColor = "#384f5f";
        firstLineColor = "#fd8264";
        secondLineColor = "#48caff";
        crosshairLinesColor = "grey";
        crosshairLabelsBackgroundColor = "#2a3b47";
        textColor = "white";
    }

    Highcharts.chart("second-graph-by-time", {
        chart: {
            type: "line",
            backgroundColor: backgroundColor,
        },
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
                    color: textColor,
                },
            },
            type: "datetime",
            lineWidth: 0,
            tickLength: 0,
            labels: {
                enabled: true,
                style: {
                    color: textColor,
                },
                formatter: function (value) {
                    let date = new Date(value.value);
                    let month = date.getMonth();
                    date = "" + date.getDate() + "." + ++month;

                    for (let i = 0; i < greenLinePoints.length; i++) {
                        const greenPointDate = new Date(greenLinePoints[i][0]);
                        const currentPoint = new Date(value.value);
                        if (
                            greenPointDate.getMonth() === currentPoint.getMonth() &&
                            greenPointDate.getDate() === currentPoint.getDate()
                        ) {
                            greenLinePoints[i] = {
                                x: greenLinePoints[i][0],
                                y: greenLinePoints[i][1],
                                marker: {
                                    enabled: true,
                                    fillColor: firstLineColor,
                                    lineColor: firstLineColor,
                                    radius: 4,
                                    states: { hover: { radius: 8 } },
                                },
                            };
                            blueLinePoints[i] = {
                                x: blueLinePoints[i][0],
                                y: blueLinePoints[i][1],
                                marker: {
                                    enabled: true,
                                    fillColor: secondLineColor,
                                    lineColor: secondLineColor,
                                    radius: 4,
                                    states: { hover: { radius: 8 } },
                                },
                            };
                        }
                    }

                    return '<div style="direction: ltr;">' + date + "</div>";
                },
            },
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
                    style: {
                        color: textColor,
                    },
                    formatter: function (value) {
                        let date = new Date(value);
                        let month = date.getMonth();
                        date = "" + date.getDate() + "." + ++month;

                        return '<div style="direction: ltr;">' + date + "</div>";
                    },
                },
            },
            //tickInterval: 2,
        },
        yAxis: {
            title: {
                text: "מספר מקרים",
                style: {
                    color: textColor,
                },
            },
            labels: {
                useHTML: true,
                style: {
                    color: textColor,
                },
                formatter: function () {
                    return getNumberWithCommas(this.value);
                },
            },
            tickInterval: 70,
            crosshair: {
                width: 0.7,
                color: crosshairLinesColor,
                dashStyle: "LongDash",
                snap: false,
                label: {
                    enabled: true,
                    backgroundColor: crosshairLabelsBackgroundColor,
                    borderWidth: "0.1px",
                    borderColor: "black",
                    padding: 3,
                    zIndex: 20,
                    shape: "square",
                    style: {
                        color: textColor,
                    },
                    formatter: function (value) {
                        return (
                            '<div style="direction: ltr; padding: 10px">' +
                            value.toFixed(2) +
                            "</div>"
                        );
                    },
                },
            },
        },
        series: [
            {
                type: "line",
                color: firstLineColor,
                lineWidth: 1,
                data: greenLinePoints,
                states: {
                    inactive: {
                        opacity: 1,
                    },
                    hover: {
                        lineWidth: 1,
                    },
                },
                cursor: "pointer",
                marker: {
                    enabled: false,
                    symbol: "circle",
                    fillColor: firstLineColor,
                    lineColor: firstLineColor,
                    width: 4,
                    states: {
                        hover: {
                            enabled: true,
                        },
                    },
                },
            },
            {
                type: "line",
                color: secondLineColor,
                lineWidth: 1,
                data: blueLinePoints,
                states: {
                    inactive: {
                        opacity: 1,
                    },
                    hover: {
                        lineWidth: 1,
                    },
                },
                cursor: "pointer",
                marker: {
                    enabled: false,
                    symbol: "circle",
                    fillColor: secondLineColor,
                    lineColor: secondLineColor,
                    width: 4,
                    states: {
                        hover: {
                            enabled: true,
                        },
                    },
                },
            },
        ],
        tooltip: {
            borderColor: "none",
            backgroundColor: "none",
            valueSuffix: "°C",
            shadow: false,
            useHTML: true,
            formatter: function () {
                let greenLinePoint;
                let blueLinePoint;
                for (let i = 0; i < greenLinePoints.length; i++) {
                    if (Array.isArray(greenLinePoints[i])) {
                        if (greenLinePoints[i][0] === this.x) {
                            greenLinePoint = greenLinePoints[i][1];
                            blueLinePoint = blueLinePoints[i][1];
                        }
                    } else {
                        if (greenLinePoints[i].x === this.x) {
                            greenLinePoint = greenLinePoints[i].y;
                            blueLinePoint = blueLinePoints[i].y;
                        }
                    }
                }

                if (!isAccessibilityOn) {
                    return (
                        '<div style="display: flex; flex-direction: column; align-items: flex-start; padding: 7px;" class="card-graph-tooltip card-graph-tooltip__no-accessibility">' +
                        '<span style="color: #b6ca51;">' +
                        greenLinePoint +
                        " חולים קשים" +
                        "</span>" +
                        '<span style="color: #48caff;">' +
                        blueLinePoint +
                        " מונשמים" +
                        "</span>" +
                        "</div>"
                    );
                } else {
                    return (
                        '<div style="display: flex; flex-direction: column; align-items: flex-start; padding: 7px;" class="card-graph-tooltip card-graph-tooltip__accessibility-mode">' +
                        '<span style="color: #fd8264;">' +
                        greenLinePoint +
                        " חולים קשים" +
                        "</span>" +
                        '<span style="color: #48caff;">' +
                        blueLinePoint +
                        " מונשמים" +
                        "</span>" +
                        "</div>"
                    );
                }
            },
        },
    });
};

//drawSecondByTimeGraph('שבוע אחרון');

export { redrawSecondByTimeGraph, drawSecondByTimeGraph };
