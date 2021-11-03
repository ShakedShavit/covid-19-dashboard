import getNumberWithCommas from "./charts/utils/getNumberWithCommas.js";

const $cardExtraData = document.querySelectorAll(".cards-extra-data");

const url = "https://covid-19-dashboard-shavit.herokuapp.com/cards-extra-data";

const fetchExtraCardsData = () => {
    fetch(url)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(res.status);
            }
        })
        .then((cardsExtraData) => {
            let dataArr = [
                cardsExtraData[0].cardOneFirst,
                cardsExtraData[0].cardOneSecond,
                cardsExtraData[0].cardOneThird,

                cardsExtraData[0].cardTwoFirst,
                cardsExtraData[0].cardTwoSecond,
                cardsExtraData[0].cardTwoThird,
                cardsExtraData[0].cardTwoFourth,
                cardsExtraData[0].cardTwoFifth,

                cardsExtraData[0].cardThreeFirst,
                cardsExtraData[0].cardThreeSecond,
                cardsExtraData[0].cardThreeThird,
                cardsExtraData[0].cardThreeFourth,

                cardsExtraData[0].cardFourFirst,
                cardsExtraData[0].cardFourSecond,

                cardsExtraData[0].cardFiveFirst,

                cardsExtraData[0].cardSixFirst,
                cardsExtraData[0].cardSixSecond,
            ];

            dataArr = dataArr.map((data) => {
                return getNumberWithCommas(data);
            });

            $cardExtraData.forEach((extraDataEl, index) => {
                extraDataEl.innerHTML = dataArr[index];

                if (index === 1 || index === 4 || index === 9 || index === 13) {
                    extraDataEl.innerHTML = extraDataEl.innerHTML + "+";
                } else if (index === 15) {
                    extraDataEl.innerHTML = extraDataEl.innerHTML + "%";
                }
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

fetchExtraCardsData();
