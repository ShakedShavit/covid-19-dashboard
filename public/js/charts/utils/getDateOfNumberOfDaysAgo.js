export default (daysAgo) => {
    let date = new Date();
    let month = date.getMonth();
    let day = date.getDate() - daysAgo;
    if (day <= 0) {
        const lastDayOfMonth = new Date(date.getYear(), month, 0).getDate();
        day += lastDayOfMonth;
    }

    return '' + day + '.' + ++month;
}