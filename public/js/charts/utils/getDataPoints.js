import { getDatesBetweenStartAndEndDates, getDatesByStartDateAndDuration } from './getAxisCategory.js';

const getPointsByStartAndEndDates = (points, startingDate, endDate) => {
    points = cleanInitialPoints(points);

    let xAxisCategory = getDatesBetweenStartAndEndDates(startingDate, endDate);
    xAxisCategory = parseDates(xAxisCategory);

    if (points.length <= xAxisCategory.length) {
        points = points.map((point, index) => [xAxisCategory[index], point]);
    } else {
        points = xAxisCategory.map((date, index) => [date, points[index]]);
    }

    return points;
}

const getPointsByStartDateAndDuration = (points, startingDate, duration) => {
    points = cleanInitialPoints(points);

    let xAxisCategory = getDatesByStartDateAndDuration(startingDate, duration);
    xAxisCategory = parseDates(xAxisCategory);

    points = xAxisCategory.map((date, index) => [date, points[index]]);

    return points;
}

const getPointsWithUnparsedDatesByDuration = (points, startingDate, duration) => {
    points = cleanInitialPoints(points);
    const xAxisCategory = getDatesByStartDateAndDuration(startingDate, duration);
    points = xAxisCategory.map((date, index) => [date, points[index]]);

    return points;
}

const cleanInitialPoints = (points) => {
    points = points.split(',');
    return points.map((point) => parseFloat(point.replace(' ', '')));
}
const parseDates = (xAxisCategory) => {
    let year = 2020;
    return xAxisCategory.map((date, index) => {            
        date = date.split('.')
        if (date[1] === '1' && date[0] === '1' && index !== 0) year++;
        date = '' + date[1] + '.' + date[0] + '.' + year;
        return Date.parse(date);
    });
}

export {
    getPointsByStartAndEndDates,
    getPointsByStartDateAndDuration,
    getPointsWithUnparsedDatesByDuration,
    cleanInitialPoints
}