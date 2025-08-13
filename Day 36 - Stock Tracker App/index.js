const symbolInput = document.querySelector('#symbol');
const stockList = document.querySelector('#stock-list');

// Function to fetch and display the top 10 stocks
function fetchTopStocks() {
    // Fetch data from api
    fetch('https://www.alphavantage.co/query?function=SECTOR&apikey=YOUR_API_KEY').then(response => response.json()).then(data => {
        const stocks = data['Rank A: Real-Time Performance'];
        let html = '';
        // Loop through the stocks and generate html for each stock
        for (let i = 0; i < 10; i++) {
            const symbol = Object.keys(stocks)[i];
            const change = stocks[symbol];
            const changeColor = parseFloat(change) >= 0 ? 'green' : 'red';
            html += `
            <li>
                <span class="symbol">${symbol}</span>
                <span class="change" style="color: ${changeColor}">${change}</span>
            </li>    
            `;
        }

        // Update stock list container
        stockList.innerHTML = html;
    }).catch(error => console.error(error));
}

// Function to fetch and display stock data for the searched symbol
function fetchStockData(symbol) {
    // If input was empty display top 10 stocks
    if (!symbol) {
        fetchTopStocks();
        return;
    }

    // Fetch the stock data for the provided symbol from api
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=YOUR_API_KEY`).then(response => response.json()).then(data => {
        const quote = data['Global Quote'];
        if (quote && quote['10. change percent']) {
            const changePercent = quote['10. change percent'].replace('%', '');
            const changeColor = parseFloat(changePercent) >= 0 ? 'green' : 'red';
            const html = `<li>
            <span class="symbol">${symbol}</span>
            <span class="change" style="color: ${changeColor}">${changePercent}</span>
        </li>    
        `;
            stockList.innerHTML = html;
        } else {
            stockList.innerHTML = '<li class="error">Invalid Symbol</li>';
        }
    }).catch(error => console.error(error));

}

// Display top 10 on page load
fetchTopStocks();

// Handle from submission
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    // Get symbol entered by user and convert it to uppercase
    const symbol = symbolInput.value.toUpperCase();
    fetchStockData(symbol);
});