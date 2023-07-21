const fromCur = document.querySelector(".from select");
const toCur = document.querySelector(".to select");
const getBtn = document.querySelector("form button");
const exIcon = document.querySelector("form .reverse");
const amount = document.querySelector("form input");
const exRateTxt = document.querySelector("form .result");

// Event listener for currency dropdowns (select)

[fromCur, toCur].forEach((select, i) => {
    for (let curCode in Country_List) {
        const selected = (i === 0 && curCode === "USD") || (i === 1 && curCode === "GBP") ? "selected" : "";
        select.insertAdjacentHTML("beforeend", `<option value="${curCode}" ${selected}>${curCode}</option>`);
    }
    select.addEventListener("change", () => {
        const code = select.value;
        const imgTag = select.parentElement.querySelector("img");
        imgTag.src = `https://flagcdn.com/48x36/${Country_List[code].toLowerCase()}.png`;
    });
});

// Function to get exchange rate from api

async function getExchangeRate() {
    const amountVal = amount.value || 1;
    exRateTxt.innerText = "Getting exchange rate...";
    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/[YOUR_KEY]]/latest/${fromCur.value}`);
        const result = await response.json();
        const exchangeRate = result.conversion_rates[toCur.value];
        const totalExRate = (amountVal * exchangeRate).toFixed(2);
        exRateTxt.innerText = `${amountVal} ${fromCur.value} = ${totalExRate} ${toCur.value}`;
    } catch (error) {
        exRateTxt.innerText = "Something went wrong...";
    }
}

// Event listeners for button and exchange icon click

window.addEventListener("load", getExchangeRate);
getBtn.addEventListener("click", (e) => {
    e.preventDefault();
    getExchangeRate();
});

exIcon.addEventListener("click", () => {
    [fromCur.value, toCur.value] = [toCur.value, fromCur.value];
    [fromCur, toCur].forEach((select) => {
        const code = select.value;
        const imgTag = select.parentElement.querySelector("img");
        imgTag.src = `https://flagcdn.com/48x36/${Country_List[code].toLowerCase()}.png`;
    });
    getExchangeRate();
});