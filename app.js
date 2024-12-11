// Initialize the map (centered at a default location)
const map = L.map('map').setView([28.6139, 77.2090], 12);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Array of bus stops with AQI data
const busStops = [
    { "name": "Kashmere Gate ISBT", "lat": 28.6673, "lng": 77.2260, "aqi": 120, "historicalData": [118, 122, 125, 119, 121, 120, 123] },
    { "name": "Anand Vihar ISBT", "lat": 28.6464, "lng": 77.3150, "aqi": 130, "historicalData": [128, 132, 135, 129, 131, 130, 134] },
    {"name": "Sarai Kale Khan ISBT", "lat": 28.5887, "lng": 77.2456, "aqi": 115, "historicalData": [112, 118, 120, 116, 114, 115, 117]},
    {"name": "Karol Bagh Bus Stop", "lat": 28.6517, "lng": 77.1889, "aqi": 140, "historicalData": [138, 142, 145, 139, 141, 140, 144]},
    {"name": "Rajouri Garden Bus Stop", "lat": 28.6416, "lng": 77.1240, "aqi": 110, "historicalData": [108, 112, 115, 109, 111, 110, 113]},
    {"name": "Dwarka Sector 21 Bus Stop", "lat": 28.5520, "lng": 77.0680, "aqi": 98, "historicalData": [95, 100, 102, 97, 96, 98, 99]},
    {"name": "Janakpuri Bus Stop", "lat": 28.6190, "lng": 77.0928, "aqi": 105, "historicalData": [102, 108, 110, 106, 104, 105, 107]},
    {"name": "Rohini Sector 16 Bus Stop", "lat": 28.7170, "lng": 77.1230, "aqi": 125, "historicalData": [122, 128, 130, 126, 124, 125, 127]},
    {"name": "Pitampura Bus Stop", "lat": 28.6967, "lng": 77.1440, "aqi": 112, "historicalData": [110, 115, 118, 113, 111, 112, 114]},
    {"name": "Shahdara Bus Stop", "lat": 28.6780, "lng": 77.2906, "aqi": 135, "historicalData": [132, 138, 140, 136, 134, 135, 137]},
    {"name": "Yamuna Vihar Bus Stop", "lat": 28.7076, "lng": 77.2652, "aqi": 118, "historicalData": [115, 120, 123, 117, 116, 118, 119]},
    {"name": "Chandni Chowk Bus Stop", "lat": 28.6562, "lng": 77.2301, "aqi": 128, "historicalData": [125, 130, 133, 127, 126, 128, 129]},
    {"name": "Connaught Place Bus Stop", "lat": 28.6315, "lng": 77.2167, "aqi": 120, "historicalData": [118, 123, 125, 119, 121, 120, 122]},
    {"name": "India Gate Bus Stop", "lat": 28.6129, "lng": 77.2295, "aqi": 115, "historicalData": [112, 118, 120, 116, 114, 115, 117]},
    {"name": "Lajpat Nagar Bus Stop", "lat": 28.5672, "lng": 77.2433, "aqi": 108, "historicalData": [105, 110, 112, 109, 107, 108, 111]},
    {"name": "South Extension Bus Stop", "lat": 28.5734, "lng": 77.2192, "aqi": 110, "historicalData": [108, 112, 115, 109, 111, 110, 113]},
    {"name": "AIIMS Bus Stop", "lat": 28.5672, "lng": 77.2100, "aqi": 125, "historicalData": [122, 128, 130, 126, 124, 125, 127]},
    {"name": "Hauz Khas Bus Stop", "lat": 28.5483, "lng": 77.2010, "aqi": 118, "historicalData": [115, 120, 123, 117, 116, 118, 119]},
    {"name": "Saket Bus Stop", "lat": 28.5266, "lng": 77.2101, "aqi": 112, "historicalData": [110, 115, 118, 113, 111, 112, 114]},
    {"name": "Malviya Nagar Bus Stop", "lat": 28.5373, "lng": 77.2150, "aqi": 105, "historicalData": [102, 108, 110, 106, 104, 105, 107]},
    {"name": "Vasant Vihar Bus Stop", "lat": 28.5683, "lng": 77.1561, "aqi": 102, "historicalData": [100, 105, 108, 103, 101, 102, 104]},
    {"name": "Dwarka Sector 10 Bus Stop", "lat": 28.6105, "lng": 77.0370, "aqi": 100, "historicalData": [98, 103, 105, 101, 99, 100, 102]},
    {"name": "Tilak Nagar Bus Stop", "lat": 28.6435, "lng": 77.0863, "aqi": 112, "historicalData": [110, 115, 118, 113, 111, 112, 114]},
    {"name": "Punjabi Bagh Bus Stop", "lat": 28.6798, "lng": 77.1299, "aqi": 125, "historicalData": [122, 128, 130, 126, 124, 125, 127]},
    {"name": "Ashok Vihar Bus Stop", "lat": 28.6902, "lng": 77.1858, "aqi": 110, "historicalData": [108, 112, 115, 109, 111, 110, 113]},
    {"name": "Shalimar Bagh Bus Stop", "lat": 28.7079, "lng": 77.1686, "aqi": 118, "historicalData": [115, 120, 123, 117, 116, 118, 119]},
    {"name": "Model Town Bus Stop", "lat": 28.7043, "lng": 77.1940, "aqi": 105, "historicalData": [102, 108, 110, 106, 104, 105, 107]},
    {"name": "GTB Nagar Bus Stop", "lat": 28.6936, "lng": 77.2101, "aqi": 115, "historicalData": [112, 118, 120, 116, 114, 115, 117]},
    {"name": "Mukherjee Nagar Bus Stop", "lat": 28.6971, "lng": 77.2140, "aqi": 112, "historicalData": [110, 115, 118, 113, 111, 112, 114]},
    {"name": "Vivek Vihar Bus Stop", "lat": 28.6737, "lng": 77.3152, "aqi": 125, "historicalData": [122, 128, 130, 126, 124, 125, 127]},
    {"name": "Preet Vihar Bus Stop", "lat": 28.6397, "lng": 77.2910, "aqi": 108, "historicalData": [105, 110, 112, 109, 107, 108, 111]},
    {"name": "Mayur Vihar Bus Stop", "lat": 28.6107, "lng": 77.3078, "aqi": 115, "historicalData": [112, 118, 120, 116, 114, 115, 117]},
    {"name": "Noida Sector 15 Bus Stop", "lat": 28.5810, "lng": 77.3172, "aqi": 120, "historicalData": [118, 123, 125, 119, 121, 120, 122]},
    {"name": "Chittaranjan Park Bus Stop", "lat": 28.5355, "lng": 77.2526, "aqi": 112, "historicalData": [110, 115, 118, 113, 111, 112, 114]},
    {"name": "Kalkaji Bus Stop", "lat": 28.5410, "lng": 77.2586, "aqi": 125, "historicalData": [122, 128, 130, 126, 124, 125, 127]},
    {"name": "Nehru Place Bus Stop", "lat": 28.5504, "lng": 77.2521, "aqi": 118, "historicalData": [115, 120, 123, 117, 116, 118, 119]},
    {"name": "Greater Kailash Bus Stop", "lat": 28.5485, "lng": 77.2349, "aqi": 112, "historicalData": [110, 115, 118, 113, 111, 112, 114]},
    {"name": "Okhla Phase 1 Bus Stop", "lat": 28.5356, "lng": 77.2880, "aqi": 108, "historicalData": [105, 110, 112, 109, 107, 108, 111]},
    {"name": "Jamia Millia Islamia Bus Stop", "lat": 28.5615, "lng": 77.2812, "aqi": 115, "historicalData": [112, 118, 120, 116, 114, 115, 117]},
    {"name": "Govindpuri Bus Stop", "lat": 28.5320, "lng": 77.2561, "aqi": 110, "historicalData": [108, 112, 115, 109, 111, 110, 113]},
    {"name": "Badarpur Border Bus Stop", "lat": 28.4941, "lng": 77.2901, "aqi": 125, "historicalData": [122, 128, 130, 126, 124, 125, 127]},
    {"name": "Mehrauli Bus Stop", "lat": 28.5273, "lng": 77.1854, "aqi": 105, "historicalData": [102, 108, 110, 106, 104, 105, 107]},   
    // Add other bus stops...
];

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
function showAQI(busStopName) {
    // Find the bus stop by name
    const busStop = busStops.find(stop => stop.name === busStopName);
    
    if (busStop) {
        // Update AQI display
        const aqiContainer = document.querySelector('#chart-container .aqi');
        aqiContainer.textContent = `AQI at ${busStop.name}: ${busStop.aqi}`;
        
        // Make the container visible
        const chartContainer = document.getElementById('chart-container');
        chartContainer.style.display = 'flex';
    } else {
        console.error('Bus stop not found');
    }
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

function updateAQI(aqiValue) {
    const aqiContainer = document.querySelector('#chart-container .aqi');
    aqiContainer.textContent = `AQI: ${aqiValue}`;
    document.getElementById('chart-container').style.display = 'flex'; // Show the container
}

// Example usage
updateAQI(125); // Replace with real AQI value
