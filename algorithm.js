document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const stopName = urlParams.get('name');
    const historicalData = JSON.parse(urlParams.get('historicalData') || '[]');

    // Update the heading or other elements with stopName
    if (stopName) {
        document.querySelector('.heading h1').textContent = `7-Day Prediction for ${stopName}`;
    }

    // Populate historical data in the table
    const container = document.querySelector('.container');
    container.innerHTML = ''; // Clear existing content

    const box = document.createElement('div');
    box.className = 'boxes box1';

    const topDiv = document.createElement('div');
    topDiv.className = 'top';

    const valueDiv = document.createElement('div');
    valueDiv.className = 'value';
    valueDiv.innerHTML = `<h2>${stopName}</h2><p>Latest AQI: ${historicalData[historicalData.length - 1]}</p>`;

    const graphDiv = document.createElement('div');
    graphDiv.className = 'graph';
    graphDiv.innerHTML = '<h2>Graph</h2><canvas id="aqi-chart"></canvas>';

    topDiv.appendChild(valueDiv);
    topDiv.appendChild(graphDiv);
    box.appendChild(topDiv);

    const tableDiv = document.createElement('div');
    tableDiv.className = 'table';

    historicalData.forEach((value, index) => {
        const dayBox = document.createElement('div');
        dayBox.className = 'box';
        dayBox.innerHTML = `<div class="day">Day ${index + 1}</div><div class="dayval">Value: ${value}</div>`;
        tableDiv.appendChild(dayBox);
    });

    box.appendChild(tableDiv);
    container.appendChild(box);

    // Render a graph using Chart.js
    const ctx = document.getElementById('aqi-chart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: historicalData.map((_, index) => `Day ${index + 1}`),
            datasets: [{
                label: `AQI Levels for ${stopName}`,
                data: historicalData,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true },
                tooltip: { enabled: true },
            },
            scales: {
                x: { title: { display: true, text: 'Days' } },
                y: { title: { display: true, text: 'AQI Value' } }
            }
        }
    });
});
