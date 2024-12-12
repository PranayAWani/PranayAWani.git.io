// Initialize the map (centered at a default location)
const map = L.map('map').setView([28.6139, 77.2090], 12);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Array of bus stops with AQI data
const busStops = [
    {
        "name": "Kashmere Gate ISBT",
        "lat": 28.6673,
        "lng": 77.2260,
        "aqi": 120,
        "historicalData": [118, 122, 125, 119, 121, 120, 123],
        "co": { "current": 0.5, "historical": [0.4, 0.6, 0.5, 0.5, 0.4, 0.5, 0.6] },
        "so2": { "current": 12, "historical": [11, 13, 12, 12, 11, 12, 13] },
        "pm25": { "current": 60, "historical": [58, 62, 65, 59, 61, 60, 63] },
        "ozone": { "current": 32, "historical": [30, 34, 33, 31, 32, 32, 33] }
    },
    {
        "name": "Anand Vihar ISBT",
        "lat": 28.6464,
        "lng": 77.3150,
        "aqi": 130,
        "historicalData": [128, 132, 135, 129, 131, 130, 134],
        "co": { "current": 0.7, "historical": [0.6, 0.8, 0.7, 0.7, 0.6, 0.7, 0.8] },
        "so2": { "current": 15, "historical": [14, 16, 15, 15, 14, 15, 16] },
        "pm25": { "current": 75, "historical": [72, 78, 80, 74, 76, 75, 79] },
        "ozone": { "current": 28, "historical": [27, 30, 29, 28, 28, 28, 29] }
    },
    {
        "name": "Sarai Kale Khan ISBT",
        "lat": 28.5887,
        "lng": 77.2456,
        "aqi": 115,
        "historicalData": [112, 118, 120, 116, 114, 115, 117],
        "co": { "current": 0.6, "historical": [0.5, 0.7, 0.6, 0.6, 0.5, 0.6, 0.7] },
        "so2": { "current": 10, "historical": [9, 11, 10, 10, 9, 10, 11] },
        "pm25": { "current": 55, "historical": [53, 58, 60, 54, 56, 55, 57] },
        "ozone": { "current": 34, "historical": [32, 36, 35, 33, 34, 34, 35] }
    },
    {
        "name": "Karol Bagh Bus Stop",
        "lat": 28.6517,
        "lng": 77.1889,
        "aqi": 140,
        "historicalData": [138, 142, 145, 139, 141, 140, 144],
        "co": { "current": 0.8, "historical": [0.7, 0.9, 0.8, 0.8, 0.7, 0.8, 0.9] },
        "so2": { "current": 18, "historical": [17, 19, 18, 18, 17, 18, 19] },
        "pm25": { "current": 80, "historical": [78, 82, 85, 79, 81, 80, 84] },
        "ozone": { "current": 26, "historical": [25, 28, 27, 26, 26, 26, 27] }
    },
    {
        "name": "Rajouri Garden Bus Stop",
        "lat": 28.6416,
        "lng": 77.1240,
        "aqi": 110,
        "historicalData": [108, 112, 115, 109, 111, 110, 113],
        "co": { "current": 0.4, "historical": [0.3, 0.5, 0.4, 0.4, 0.3, 0.4, 0.5] },
        "so2": { "current": 8, "historical": [7, 9, 8, 8, 7, 8, 9] },
        "pm25": { "current": 45, "historical": [43, 48, 50, 44, 46, 45, 47] },
        "ozone": { "current": 30, "historical": [28, 32, 31, 29, 30, 30, 31] }
    },
    // Add similar entries for the rest of the bus stops
    {
        "name": "Delhi University Bus Stop",
        "lat": 28.6863,
        "lng": 77.2089,
        "aqi": 110,
        "historicalData": [108, 112, 115, 109, 111, 110, 113],
        "co": { "current": 0.4, "historical": [0.3, 0.5, 0.4, 0.4, 0.3, 0.4, 0.5] },
        "so2": { "current": 10, "historical": [9, 11, 10, 10, 9, 10, 11] },
        "pm25": { "current": 75, "historical": [70, 78, 80, 74, 72, 75, 77] },
        "ozone": { "current": 32, "historical": [30, 35, 33, 31, 30, 32, 34] }
    },
    {
        "name": "Jahangirpuri Metro Station Bus Stop",
        "lat": 28.7296,
        "lng": 77.1919,
        "aqi": 115,
        "historicalData": [112, 118, 120, 116, 114, 115, 117],
        "co": { "current": 0.6, "historical": [0.5, 0.7, 0.6, 0.6, 0.5, 0.6, 0.7] },
        "so2": { "current": 14, "historical": [13, 15, 14, 14, 13, 14, 15] },
        "pm25": { "current": 85, "historical": [80, 88, 90, 84, 82, 85, 87] },
        "ozone": { "current": 40, "historical": [38, 43, 41, 39, 38, 40, 42] }
    },
    {
        "name": "Seelampur Bus Stop",
        "lat": 28.6703,
        "lng": 77.2919,
        "aqi": 130,
        "historicalData": [128, 132, 135, 129, 131, 130, 134],
        "co": { "current": 0.7, "historical": [0.6, 0.8, 0.7, 0.7, 0.6, 0.7, 0.8] },
        "so2": { "current": 15, "historical": [14, 16, 15, 15, 14, 15, 16] },
        "pm25": { "current": 95, "historical": [90, 98, 100, 94, 92, 95, 97] },
        "ozone": { "current": 45, "historical": [43, 48, 46, 44, 43, 45, 47] }
    },
    {
        "name": "Vikaspuri Bus Stop",
        "lat": 28.6458,
        "lng": 77.0906,
        "aqi": 112,
        "historicalData": [110, 115, 118, 113, 111, 112, 114],
        "co": { "current": 0.5, "historical": [0.4, 0.6, 0.5, 0.5, 0.4, 0.5, 0.6] },
        "so2": { "current": 12, "historical": [11, 13, 12, 12, 11, 12, 13] },
        "pm25": { "current": 78, "historical": [75, 80, 83, 77, 76, 78, 79] },
        "ozone": { "current": 35, "historical": [33, 37, 36, 34, 33, 35, 36] }
    },
    {
        "name": "Uttam Nagar Bus Stop",
        "lat": 28.6219,
        "lng": 77.0511,
        "aqi": 108,
        "historicalData": [105, 110, 112, 109, 107, 108, 111],
        "co": { "current": 0.4, "historical": [0.3, 0.5, 0.4, 0.4, 0.3, 0.4, 0.5] },
        "so2": { "current": 11, "historical": [10, 12, 11, 11, 10, 11, 12] },
        "pm25": { "current": 72, "historical": [70, 75, 78, 74, 73, 72, 74] },
        "ozone": { "current": 30, "historical": [28, 33, 31, 29, 28, 30, 32] }
    }
];

document.addEventListener('DOMContentLoaded', () => {
    createChart('coGraph', 'Carbon Monoxide (CO)', sampleData.CO, 'rgba(255, 99, 132, 1)');
    createChart('so2Graph', 'Sulfur Dioxide (SO2)', sampleData.SO2, 'rgba(54, 162, 235, 1)');
    createChart('ozoneGraph', 'Ozone', sampleData.Ozone, 'rgba(75, 192, 192, 1)');
    createChart('pm25Graph', 'PM2.5', sampleData.PM25, 'rgba(153, 102, 255, 1)');
});

// Marker reference for clearing previous markers
let currentMarker = null;

// Search functionality
function searchItems() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const results = busStops.filter(stop => stop.name.toLowerCase().includes(query));

    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = ''; // Clear previous results

    if (query.trim() === '') {
        searchResults.style.display = 'none'; // Hide search results if no query
        return;
    }

    searchResults.style.display = 'block'; // Show search results
    if (results.length === 0) {
        const noResult = document.createElement('li');
        noResult.textContent = 'No bus stops found.';
        searchResults.appendChild(noResult);
        return;
    }

    results.forEach(stop => {
        const li = document.createElement('li');
        li.textContent = stop.name;
        searchResults.appendChild(li);

        // Add click listener to the search result
        li.addEventListener('click', () => {
            // Remove previous marker
            if (currentMarker) {
                map.removeLayer(currentMarker);
            }

            // Center the map on the selected bus stop and add a marker
            map.setView([stop.lat, stop.lng], 15);
            currentMarker = L.marker([stop.lat, stop.lng]).addTo(map);

            // Add popup to the marker
            currentMarker.bindPopup(`
                <div>
                    <strong>${stop.name}</strong><br>
                    AQI: <a href="#" id="popup-aqi" data-name="${stop.name}">
                        ${stop.aqi}
                    </a>
                </div>
            `).openPopup();

            searchResults.style.display = 'none'; // Hide search results after selecting

            // Attach event listener to popup link
            document.getElementById('popup-aqi').addEventListener('click', (event) => {
                event.preventDefault();
                showAQIGraph(stop.name);
            });
        });
    });
}

// Attach event listener to the search input
document.getElementById('search-input').addEventListener('keyup', searchItems);

// Function to display AQI graph
function showAQIGraph(stopName) {
    const stop = busStops.find(s => s.name === stopName);
    if (!stop || !stop.historicalData) {
        alert("No historical data available.");
        return;
    }

    const chartContainer = document.getElementById('chart-container');
    const ctx = document.getElementById('aqi-chart').getContext('2d');

    // Display the chart container
    chartContainer.style.display = 'block';

    // Destroy any existing chart instance
    if (window.aqiChart) {
        window.aqiChart.destroy();
    }

    // Create a new chart
    window.aqiChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
            datasets: [{
                label: `AQI for ${stop.name}`,
                data: stop.historicalData,
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
    
    // Generic function to show a graph for a specific parameter
function showGraph(stopName, parameterKey, chartId, label, borderColor, backgroundColor, yAxisLabel) {
    const stop = busStops.find(s => s.name === stopName);
    if (!stop || !stop[parameterKey]?.historical) {
        alert(`No historical data available for ${label}.`);
        return;
    }

    const chartContainer = document.getElementById('chart-container');
    const ctx = document.getElementById(chartId).getContext('2d');

    // Display the chart container
    chartContainer.style.display = 'block';

    // Destroy any existing chart instance
    if (window[chartId]) {
        window[chartId].destroy();
    }

    // Create a new chart
    window[chartId] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
            datasets: [{
                label: `${label} for ${stop.name}`,
                data: stop[parameterKey].historical,
                borderColor: borderColor,
                backgroundColor: backgroundColor,
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
                y: { title: { display: true, text: yAxisLabel } }
            }
        }
    });
}

// Specific functions for each parameter
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("showAQIGraph").addEventListener("click", () => showGraph("AQI", "aqi"));
})


}

// Reset the search box when clicking outside
document.addEventListener('click', event => {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    if (!searchInput.contains(event.target) && !searchResults.contains(event.target)) {
        searchInput.value = ''; // Clear search box
        searchResults.innerHTML = ''; // Clear results
        searchResults.style.display = 'none'; // Hide search results
    }
});

// Hide the chart container initially
document.getElementById('chart-container').style.display = 'none';
