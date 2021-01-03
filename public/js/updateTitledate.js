const $subTitle = document.querySelector('.sub-title');

const getCurrentDateAndTime = () => {
    const date = new Date();

    const day = date.getDate();

    let month;
    switch(date.getMonth()) {
        case 0:
            month = 'ינואר';
            break;
        case 1:
            month = 'פברואר';
            break;
        case 2:
            month = 'מרץ';
            break;
        case 3:
            month = 'אפריל';
            break;
        case 4:
            month = 'מאי';
            break;
        case 5:
            month = 'יוני';
            break;
        case 6:
            month = 'יולי';
            break;
        case 7:
            month = 'אוגוסט';
            break;
        case 8:
            month = 'ספטמבר';
            break;
        case 9:
            month = 'אוקטובר';
            break;
        case 10:
            month = 'נובמבר';
            break;
        case 11:
            month = 'דצמבר';
            break;
    }

    const year = date.getFullYear();

    const hours = date.getHours();

    let minutes = date.getMinutes();

    return {
        day,
        month,
        year,
        hours,
        minutes
    };
};

const date = getCurrentDateAndTime();

const dateString = `עדכון אחרון: ${date.day} ב${date.month} ${date.year} | ${date.hours}:${date.minutes.toString().length === 1 ? '0' + date.minutes : date.minutes}`;

$subTitle.innerHTML = dateString;