import getNumberWithCommas from "../utils/getNumberWithCommas.js";
import getDateOfNumberOfDaysAgo from "../utils/getDateOfNumberOfDaysAgo.js";
import {
    getPointsByStartAndEndDates,
    getPointsByStartDateAndDuration,
} from "../utils/getDataPoints.js";

const url = "https://covid-19-dashboard-shavit.herokuapp.com/first-by-time-data";

let firstByTimeData;

const drawFirstByTimeGraph = (durationStr, isAccessibilityOn) => {
    fetch(url)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(res.status);
            }
        })
        .then((firstByTimeInfo) => {
            firstByTimeData = firstByTimeInfo;
            redrawFirstByTimeGraph(durationStr, isAccessibilityOn);
        })
        .catch((err) => {
            console.log(err);
        });
};

const redrawFirstByTimeGraph = (durationStr, isAccessibilityOn) => {
    let date = new Date();
    let areaPoints;
    let greyColumnPoints;
    let greenColumnPoints;
    let startingDate;
    let endDate;
    let month;
    let greyColumnSeriesType = "column";
    let greyColumnYAxis = 1;
    switch (durationStr) {
        case "עד עכשיו": // All time
            startingDate = firstByTimeData[0].allTimeStartingDate;
            month = date.getMonth();
            endDate = "" + date.getDate() + "." + ++month;
            areaPoints = getPointsByStartAndEndDates(
                firstByTimeData[0].allTimeFirstSeriesPoints,
                startingDate,
                endDate
            );
            greyColumnPoints = getPointsByStartAndEndDates(
                firstByTimeData[0].allTimeSecondSeriesPoints,
                startingDate,
                endDate
            );
            greenColumnPoints = getPointsByStartAndEndDates(
                firstByTimeData[0].allTimeThirdSeriesPoints,
                startingDate,
                endDate
            );
            greyColumnSeriesType = "line";
            greyColumnYAxis = 0;
            break;
        case "חודש אחרון": // Last month
            month = date.getMonth() === 0 ? 12 : date.getMonth();
            startingDate = date.getDate() + "." + month;
            month = date.getMonth();
            endDate = "" + date.getDate() + "." + ++month;
            areaPoints = getPointsByStartAndEndDates(
                firstByTimeData[0].lastMonthFirstSeriesPoints,
                startingDate,
                endDate
            );
            greyColumnPoints = getPointsByStartAndEndDates(
                firstByTimeData[0].lastMonthSecondSeriesPoints,
                startingDate,
                endDate
            );
            greenColumnPoints = getPointsByStartAndEndDates(
                firstByTimeData[0].lastMonthThirdSeriesPoints,
                startingDate,
                endDate
            );
            break;
        case "שבועיים אחרונים": // Last two weeks
            startingDate = getDateOfNumberOfDaysAgo(14);
            areaPoints = getPointsByStartDateAndDuration(
                firstByTimeData[0].lastTwoWeeksFirstSeriesPoints,
                startingDate,
                14
            );
            greyColumnPoints = getPointsByStartDateAndDuration(
                firstByTimeData[0].lastTwoWeeksSecondSeriesPoints,
                startingDate,
                14
            );
            greenColumnPoints = getPointsByStartDateAndDuration(
                firstByTimeData[0].lastTwoWeeksThirdSeriesPoints,
                startingDate,
                14
            );
            break;
        case "שבוע אחרון": // Last week
            startingDate = getDateOfNumberOfDaysAgo(7);
            areaPoints = getPointsByStartDateAndDuration(
                firstByTimeData[0].lastWeekFirstSeriesPoints,
                startingDate,
                7
            );
            greyColumnPoints = getPointsByStartDateAndDuration(
                firstByTimeData[0].lastWeekSecondSeriesPoints,
                startingDate,
                7
            );
            greenColumnPoints = getPointsByStartDateAndDuration(
                firstByTimeData[0].lastWeekThirdSeriesPoints,
                startingDate,
                7
            );
            break;
    }

    let blueSeriesType;
    let backgroundColor;
    let horizontalGridLinesWidth;
    let lineColor;
    let firstColumnColor;
    let secondColumnColor;
    let crosshairLinesColor;
    let crosshairLabelsBackgroundColor;
    let textColor;
    if (!isAccessibilityOn) {
        blueSeriesType = "area";
        backgroundColor = "#ffffff";
        horizontalGridLinesWidth = 1;
        lineColor = "#48caff";
        firstColumnColor = "#898989";
        secondColumnColor = "#1c7d7e";
        crosshairLinesColor = "rgba(0, 0, 0, 0.6)";
        crosshairLabelsBackgroundColor = "white";
        textColor = "#666666";
    } else {
        blueSeriesType = "line";
        backgroundColor = "#384f5f";
        horizontalGridLinesWidth = 0;
        lineColor = "#2cd2db";
        firstColumnColor = "#9ffa82";
        secondColumnColor = "#fd8264";
        crosshairLinesColor = "grey";
        crosshairLabelsBackgroundColor = "#2a3b47";
        textColor = "white";
    }

    Highcharts.chart("first-graph-by-time", {
        chart: {
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
                    [0, "rgba(52, 164, 189, 0.5)"],
                    [1, "#ffffff"],
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
                text: "תאריך הבדיקה",
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

                    for (let i = 0; i < areaPoints.length; i++) {
                        const areaPointDate = new Date(areaPoints[i][0]);
                        const currentPoint = new Date(value.value);
                        if (
                            areaPointDate.getMonth() === currentPoint.getMonth() &&
                            areaPointDate.getDate() === currentPoint.getDate()
                        ) {
                            areaPoints[i] = {
                                x: areaPoints[i][0],
                                y: areaPoints[i][1],
                                marker: {
                                    enabled: true,
                                    fillColor: lineColor,
                                    lineColor: lineColor,
                                    radius: 4,
                                    states: { hover: { radius: 8 } },
                                },
                            };
                        }
                    }
                    for (let i = 0; i < greyColumnPoints.length; i++) {
                        const greyColumnPointDate = new Date(greyColumnPoints[i][0]);
                        const currentPoint = new Date(value.value);
                        if (
                            greyColumnPointDate.getMonth() === currentPoint.getMonth() &&
                            greyColumnPointDate.getDate() === currentPoint.getDate()
                        ) {
                            greyColumnPoints[i] = {
                                x: greyColumnPoints[i][0],
                                y: greyColumnPoints[i][1],
                                marker: {
                                    enabled: true,
                                    fillColor: firstColumnColor,
                                    lineColor: firstColumnColor,
                                    radius: 4,
                                    states: {
                                        marker: { fillColor: firstColumnColor, lineColor: "#" },
                                        hover: { radius: 8 },
                                    },
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
                    useHTML: true,
                    style: {
                        color: textColor,
                    },
                    shape: "square",
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
        yAxis: [
            {
                title: {
                    text: "מספר מקרים מצטבר",
                    style: {
                        color: textColor,
                    },
                },
                gridLineColor: "rgba(137, 137, 137, 0.5)",
                gridLineWidth: horizontalGridLinesWidth,
                labels: {
                    useHTML: true,
                    style: {
                        color: lineColor,
                    },
                    formatter: function () {
                        return "<div>" + getNumberWithCommas(this.value) + "</div>";
                    },
                },
                alignTicks: false,
                // tickInterval: 81800,
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
                        useHTML: true,
                        style: {
                            color: textColor,
                        },
                        shape: "square",
                        formatter: function (value) {
                            return (
                                '<div style="direction: ltr; padding: 10px">' +
                                getNumberWithCommas(value.toFixed(2)) +
                                "</div>"
                            );
                        },
                    },
                },
                // plotLines: [{
                //         value: 0,
                //         color: 'white',
                //         width: 2,
                //         dashStyle: 'Solid',
                //         zIndex: 5,
                //     }, {
                //         value: 5000,
                //         color: 'lightGrey',
                //         width: 1,
                //         dashStyle: 'Solid',
                //         zIndex: 10,
                //     }]
            },
            {
                title: {
                    text: "מספר מקרים חדשים",
                    style: {
                        color: textColor,
                    },
                },
                labels: {
                    enabled: true,
                    useHTML: true,
                    style: {
                        color: secondColumnColor,
                    },
                    formatter: function () {
                        return "<div>" + getNumberWithCommas(this.value) + "</div>";
                    },
                },
                gridLineWidth: horizontalGridLinesWidth,
                alignTicks: false,
                // tickInterval: 460,
                opposite: true,
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
                        useHTML: true,
                        style: {
                            color: textColor,
                        },
                        shape: "square",
                        formatter: function (value) {
                            return (
                                '<div style="direction: ltr; padding: 10px">' +
                                getNumberWithCommas(value.toFixed(2)) +
                                "</div>"
                            );
                        },
                    },
                },
            },
        ],
        series: [
            {
                type: blueSeriesType,
                yAxis: 0,
                data: areaPoints,
                lineColor: lineColor,
                lineWidth: 2,
                states: {
                    inactive: {
                        opacity: 1,
                    },
                },
            },
            {
                type: greyColumnSeriesType,
                yAxis: greyColumnYAxis,
                color: firstColumnColor,
                data: greyColumnPoints,
                states: {
                    inactive: {
                        opacity: 1,
                    },
                },
                borderWidth: 0,
                cursor: "pointer",
                borderRadiusTopLeft: "50px",
                borderRadiusTopRight: "50px",
                zIndex: 2,
            },
            {
                type: "column",
                yAxis: 1,
                color: secondColumnColor,
                data: greenColumnPoints,
                states: {
                    inactive: {
                        opacity: 1,
                    },
                },
                borderWidth: 0,
                cursor: "pointer",
                borderRadiusTopLeft: "50px",
                borderRadiusTopRight: "50px",
            },
        ],
        tooltip: {
            borderColor: "none",
            backgroundColor: "none",
            valueSuffix: "°C",
            shadow: false,
            useHTML: true,
            formatter: function () {
                let areaPoint;
                let greyColumnPoint;
                let greenColumnPoint;
                for (let i = 0; i < areaPoints.length; i++) {
                    if (Array.isArray(areaPoints[i])) {
                        if (areaPoints[i][0] === this.x) {
                            areaPoint = areaPoints[i][1];
                            greyColumnPoint = greyColumnPoints[i][1];
                            greenColumnPoint = greenColumnPoints[i][1];
                        }
                    } else {
                        if (areaPoints[i].x === this.x) {
                            areaPoint = areaPoints[i].y;
                            greyColumnPoint = greyColumnPoints[i].y;
                            greenColumnPoint = greenColumnPoints[i][1];
                        }
                    }
                }

                if (!isAccessibilityOn) {
                    return (
                        '<div style="display: flex; flex-direction: column; align-items: flex-start; padding: 7px;" class="card-graph-tooltip card-graph-tooltip__no-accessibility">' +
                        '<span style="color: #48caff;">' +
                        areaPoint +
                        " מאומתים מצטבר" +
                        "</span>" +
                        '<span style="color: #898989;">' +
                        greyColumnPoint +
                        " מחלימים חדשים" +
                        "</span>" +
                        '<span style="color: #1c7d7e;">' +
                        greenColumnPoint +
                        " מאומתים חדשים" +
                        "</span>" +
                        "</div>"
                    );
                } else {
                    return (
                        '<div style="display: flex; flex-direction: column; align-items: flex-start; padding: 7px;" class="card-graph-tooltip card-graph-tooltip__accessibility-mode">' +
                        '<span style="color: #2cd2db;">' +
                        areaPoint +
                        " מאומתים מצטבר" +
                        "</span>" +
                        '<span style="color: #9ffa82;">' +
                        greyColumnPoint +
                        " מחלימים חדשים" +
                        "</span>" +
                        '<span style="color: #fd8264;">' +
                        greenColumnPoint +
                        " מאומתים חדשים" +
                        "</span>" +
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
            line: {
                states: {
                    marker: {
                        enabled: false,
                    },
                    hover: {
                        enabled: true,
                        lineWidth: 2,
                    },
                },
                marker: {
                    enabled: false,
                    symbol: "circle",
                    fillColor: "#898989",
                    lineColor: "#898989",
                },
            },
            series: {
                states: {
                    hover: {
                        enabled: true,
                        lineWidth: 2,
                    },
                },
                // marker: {
                //     enabled: false,
                //     fillColor: '#48caff',
                //     lineColor: '#48caff',
                // },
                pointWidth: 7,
                groupPadding: 0.25,
            },
        },
    });
};

const generateRandomNumbersArray = (arraySize, factor, range) => {
    const getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    };
    let arr = [];
    for (let i = 0; i < arraySize; i++) {
        arr.push(getRandomInt(range) + factor);
    }
    console.log(arr);
    console.log(arr.slice(0, 50));
    console.log(arr.slice(50, 100));
    console.log(arr.slice(100, 150));
    console.log(arr.slice(150, 200));
    console.log(arr.slice(200, 250));
    console.log(arr.slice(250, 300));
    console.log(arr.slice(300, 350));
};

//drawFirstByTimeGraph();

export { redrawFirstByTimeGraph, drawFirstByTimeGraph };
