const $spreadingZonesTableForm = document.getElementById("first-table-form");
const $addZoneButton = $spreadingZonesTableForm.getElementsByClassName("add-zone-button")[0];
const inputArr = Array.from($spreadingZonesTableForm.querySelectorAll("input"));

const url = "https://covid-19-dashboard-shavit.herokuapp.com/first-table";

const data = [];

$addZoneButton.addEventListener("click", () => {
    if (inputArr.every((input) => input.value !== "" && input.value != null)) {
        data.push({
            city: inputArr[0].value,
            confirmed: inputArr[1].value,
            active: inputArr[2].value,
            new: inputArr[3].value,
            testing: inputArr[4].value,
            activeToTenThousand: inputArr[5].value,
        });

        inputArr.forEach((input, index) => {
            if (index !== 0) input.value = Math.floor(Math.random() * Math.floor(20000));
            else input.value = "";
        });
    }
});

$spreadingZonesTableForm.addEventListener("submit", (e) => {
    e.preventDefault();

    data.forEach((rowData) => {
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(rowData),
        })
            .then((response) => {
                response.json();
            })
            .then((rowData) => {
                console.log("Success:", rowData);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    });
});
