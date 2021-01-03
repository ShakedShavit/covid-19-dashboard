const addADay = (counterDate) => {
    let counterDateArr = counterDate.split('.');
    if ((counterDateArr[1] === '1' && counterDateArr[0] === '31') ||
        (counterDateArr[1] === '2' && counterDateArr[0] === '28') ||
        (counterDateArr[1] === '3' && counterDateArr[0] === '31') ||
        (counterDateArr[1] === '4' && counterDateArr[0] === '30') ||
        (counterDateArr[1] === '5' && counterDateArr[0] === '31') ||
        (counterDateArr[1] === '6' && counterDateArr[0] === '30') ||
        (counterDateArr[1] === '7' && counterDateArr[0] === '31') ||
        (counterDateArr[1] === '8' && counterDateArr[0] === '31') ||
        (counterDateArr[1] === '9' && counterDateArr[0] === '30') ||
        (counterDateArr[1] === '10' && counterDateArr[0] === '31') ||
        (counterDateArr[1] === '11' && counterDateArr[0] === '30') ||
        (counterDateArr[1] === '12' && counterDateArr[0] === '31')) {
            if (counterDateArr[1] === '12') {
                counterDate = '1.1'
            } else {
                let parsedNum = parseInt(counterDateArr[1])
                counterDate = '1.' + (++parsedNum);
            }
    } else {
        let parsedNum = parseInt(counterDateArr[0])
        counterDate = '' + ++parsedNum + '.' + counterDateArr[1];
    }

    return counterDate;
}

const getDatesBetweenStartAndEndDates = (startingDate, endDate) => {
    let xAxisCategory = [];
    let counterDate = startingDate;
    while (counterDate !== endDate) {
        counterDate = addADay(counterDate);
        xAxisCategory.push(counterDate);
    }

    return xAxisCategory;
}

const getDatesByStartDateAndDuration = (startingDate, duration) => {
    let xAxisCategory = [];
    let counterDate = startingDate;
    for (let counter = 0; counter < duration; counter++) {
        xAxisCategory.push(counterDate);
        counterDate = addADay(counterDate);
    }

    return xAxisCategory;
}

export {
    getDatesBetweenStartAndEndDates,
    getDatesByStartDateAndDuration
};