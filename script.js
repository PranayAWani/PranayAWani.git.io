// Frontend code
// Select the container element
const container = document.querySelector('.container');

// Scroll left function
function scrollLeft() {
    container.scrollBy({
        right: 300, // Adjust scroll distance as needed
        behavior: 'smooth',
    });
}

// Scroll right function
function scrollRight() {
    container.scrollBy({
        left: 300, // Adjust scroll distance as needed
        behavior: 'smooth',
    });
}

const cities = [
    { name: "Mumbai", lat: 19.076, long: 72.8777 },
    { name: "Delhi", lat: 28.6139, long: 77.209 },
    { name: "Bhilai", lat: 21.1938, long: 81.3509 },
    { name: "Nagpur", lat: 21.1458, long: 79.0882 },
    { name: "Agra", lat: 27.1767, long: 78.0081 },
    { name: "Pune", lat: 18.5204, long: 73.8567 },
    { name: "Jalgaon", lat: 21.0077, long: 75.5626 },
    { name: "Belagum", lat: 15.8497, long: 74.4977 }
];
const apiKey = "2e5d276d90204433a87172746242211";
const baseUrl = "http://api.weatherapi.com/v1/current.json";

function fetchAQIData() {
    cities.forEach(city => {
        const url = `${baseUrl}?key=${apiKey}&q=${city.lat},${city.long}&aqi=yes`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error fetching data for ${city.name}`);
                }
                return response.json();
            })
            .then(data => {
                const aqi = data.current.air_quality.pm2_5.toFixed(0); // Example for PM2.5
                updateAQI(city.name, aqi);
            })
            .catch(error => {
                console.error("Failed to fetch AQI data:", error);
                updateAQI(city.name, "N/A");
            });
    });
}

// Call the function on page load and every minute
document.addEventListener("DOMContentLoaded", () => {
    fetchAQIData();
    setInterval(fetchAQIData, 60000); // 60000ms = 1 minute
});

function updateAQI(cityName, aqiValue) {
    const flashcards = document.querySelectorAll(".flashcard");
    flashcards.forEach(card => {
        const city = card.querySelector(".city-name").textContent.trim();
        console.log(`Checking city: ${city}`); // Debugging line
        if (city.toUpperCase() === cityName.toUpperCase()) {
            console.log(`Updating AQI for ${city}: ${aqiValue}`); // Debugging line
            const aqiElement = card.querySelector(".aqi-value");
            aqiElement.textContent = aqiValue;
        }
    });
}

document.getElementById('login-button').addEventListener('click', () => {
    const loginButton = document.getElementById('login-button');
    if (loginButton.textContent === 'Login') {
        loginButton.textContent = 'Logout';
        alert('Logged in!');
    } else {
        loginButton.textContent = 'Login';
        alert('Logged out!');
        window.location.href = 'home.html';
    }
});

// Backend code
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;
const apiKey = "2e5d276d90204433a87172746242211";
const weatherApiBaseUrl = "http://api.weatherapi.com/v1/current.json";

app.get('/api/aqi', async (req, res) => {
    const { lat, long } = req.query;
    const url = `${weatherApiBaseUrl}?key=${apiKey}&q=${lat},${long}&aqi=yes`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching AQI data:', error);
        res.status(500).json({ error: 'Failed to fetch AQI data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
