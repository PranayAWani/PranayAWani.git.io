// Example Script: Fetch AQI and Update Flashcards

// API Key (Replace with your own if needed)
const API_KEY = '2e5d276d90204433a87172746242211';

// Function to fetch AQI data
async function fetchAQI(lat, long) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${long}&aqi=yes`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }
        const data = await response.json();
        return data.current.air_quality;
    } catch (error) {
        console.error("Error fetching AQI data:", error);
        return null;
    }
}

// Function to update flashcards with AQI
async function updateFlashcards() {
    const locations = [
        { name: 'Mumbai', lat: 19.076, long: 72.8777 },
        { name: 'Pune', lat: 18.5204, long: 73.8567 },
        { name: 'Delhi', lat: 28.6139, long: 77.209 },
        { name: 'Bhilai', lat: 21.2136, long: 81.3792 },
        { name: 'Agra', lat: 27.1767, long: 78.0081 },
        { name: 'Chennai', lat: 13.0827, long: 80.2707 }
    ];

    const carousel = document.getElementById('carousel');
    carousel.innerHTML = ''; // Clear existing flashcards

    for (const location of locations) {
        const airQuality = await fetchAQI(location.lat, location.long);
        const aqi = airQuality ? Math.round(airQuality.pm2_5) : 'N/A'; // Example: Use PM2.5 for AQI

        const flashcard = document.createElement('div');
        flashcard.className = `flashcard flashcard-${location.name.toLowerCase()}`;
        flashcard.innerHTML = `
            <h1>${location.name.toUpperCase()}</h1>
            <h1>AQI ${aqi}</h1>
        `;
        carousel.appendChild(flashcard);
    }
}

// Initialize Flashcards on Load
document.addEventListener('DOMContentLoaded', () => {
    updateFlashcards();
});