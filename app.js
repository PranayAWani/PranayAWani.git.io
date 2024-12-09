const map = L.map('map').setView([19.0760, 72.8777], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const busStops = [
    { name: "Chembur Bus Stop", lat: 19.073, lng: 72.897, aqi: 45, historicalData: [50, 52, 47, 46, 45] },
    { name: "Kurla Bus Stop", lat: 19.067, lng: 72.887, aqi: 60, historicalData: [55, 58, 60, 62, 59] },
    { name: "Andheri Bus Stop", lat: 19.098, lng: 72.836, aqi: 75, historicalData: [70, 73, 75, 74, 72] },
    // Add more bus stops as needed
];

function searchItems() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const results = busStops.filter(stop => stop.name.toLowerCase().includes(query));

    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = ''; // Clear previous results

    // Remove existing markers
    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    if (results.length === 0) {
        const noResult = document.createElement('li');
        noResult.textContent = 'No bus stops found.';
        searchResults.appendChild(noResult);
        return;
    }

    results.forEach(stop => {
        const marker = L.marker([stop.lat, stop.lng]).addTo(map)
            .bindPopup(`
                <strong>${stop.name}</strong><br>
                AQI: ${stop.aqi}<br>
                <button onclick="showAQIGraph('${stop.name}')">View AQI Graph</button>
            `); // Add a button to view AQI graph

        const li = document.createElement('li');
        li.textContent = stop.name;
        li.onclick = () => {
            map.setView([stop.lat, stop.lng], 15);
            marker.openPopup();
        };
        searchResults.appendChild(li);
    });

    searchResults.style.display = 'block'; // Show search results
}

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
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'], // Example labels
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

// Trigger the search function on keyup
document.getElementById('search-input').addEventListener('keyup', searchItems);

// Initialize search results on page load (optional)
document.addEventListener('DOMContentLoaded', searchItems);

