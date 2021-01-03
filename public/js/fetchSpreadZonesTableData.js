const $spreadZonesTableContent = document.getElementsByClassName('table-content')[0];
const $firstTableSearchInput = document.getElementsByClassName('table-search-input')[0];
let $firstTableRows;

const url = 'http://localhost:3000/first-table-data';

const fetchFirstTableData = () => {
    fetch(url)
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error(res.status);
        }
    })
    .then((firstTableData) => {
        let cities = [];
        firstTableData.forEach(row => {
            if (!cities.includes(row.city)) {
                addTableRow(row);
                cities.push(row.city);
            }
        });

        $firstTableRows = document.querySelectorAll('.table-content div');
    })
    .catch((err) => {
        console.log(err);
    });
};

fetchFirstTableData();

const addTableRow = (rowData) => {
    const row = document.createElement('div');
    $spreadZonesTableContent.appendChild(row);
    row.className = 'table-row';
    let rowDataArr = [
        rowData.city,
        rowData.confirmed,
        rowData.active,
        rowData.new,
        rowData.testing,
        rowData.activeToTenThousand
    ];
    rowDataArr.forEach((cellData, index) => {
        const cell = document.createElement('span');
        row.appendChild(cell);
        cell.innerHTML = cellData;
        if (index === 0) cell.classList.add('city-cell')
    });
};

$firstTableSearchInput.addEventListener('input', (e) => {
    $firstTableRows.forEach((row) => {
        const cells = row.querySelectorAll('span');
        let doesCellContainSearchInput = false;
        cells.forEach((cell) => {
            if (cell.innerHTML.includes(e.target.value)) doesCellContainSearchInput = true;
        });
        if (doesCellContainSearchInput) {
            if (row.classList.value.includes('invisible-row')) {
                  row.classList.remove('invisible-row');
            }
        } else {
            if (!row.classList.value.includes('invisible-row')) {
                row.classList.add('invisible-row');
            }
        }
    })
});