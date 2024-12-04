const map = L.map('map').setView([19.0760, 72.8777], 13); 

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const busStops = [
    { name: "Chembur Bus Stop", lat: 19.073, lng: 72.897 },
    { name: "Kurla Bus Stop", lat: 19.067, lng: 72.887 },
    { name: "Andheri Bus Stop", lat: 19.098, lng: 72.836 },
    { name: "Bandra Bus Stop", lat: 19.059, lng: 72.832 },
    { name: "Vidyavihar Bus Stop", lat: 19.072, lng: 72.871 },
    { name: "Sion Bus Stop", lat: 19.033, lng: 72.861 },
    { name: "Dadar Bus Stop", lat: 19.017, lng: 72.839 },
    { name: "Ghatkopar Bus Stop", lat: 19.098, lng: 72.905 },
    { name: "Borivali Bus Stop", lat: 19.298, lng: 72.859 },
    { name: "Vile Parle Bus Stop", lat: 19.089, lng: 72.826 },
    { name: "Lokmanya Tilak Bus Stop (Kurla)", lat: 19.063, lng: 72.876 },
    { name: "Mumbai Central Bus Stop", lat: 18.974, lng: 72.823 },
    { name: "Lower Parel Bus Stop", lat: 18.999, lng: 72.814 },
    { name: "Worli Bus Stop", lat: 18.999, lng: 72.823 },
    { name: "Vashi Bus Stop", lat: 19.076, lng: 72.985 },
    { name: "Navi Mumbai Bus Stop", lat: 19.036, lng: 73.022 },
    { name: "Bhayandar Bus Stop", lat: 19.300, lng: 72.852 },
    { name: "Malad Bus Stop", lat: 19.188, lng: 72.849 },
    { name: "Kandivali Bus Stop", lat: 19.216, lng: 72.848 },
    { name: "Mira Road Bus Stop", lat: 19.304, lng: 72.853 },
    { name: "Thane Bus Stop", lat: 19.194, lng: 72.963 },
    { name: "Mulund Bus Stop", lat: 19.188, lng: 72.935 },
    { name: "Goregaon Bus Stop", lat: 19.149, lng: 72.849 },
    { name: "Santa Cruz Bus Stop", lat: 19.084, lng: 72.828 },
    { name: "Khar Bus Stop", lat: 19.058, lng: 72.839 },
    { name: "Mahim Bus Stop", lat: 19.038, lng: 72.834 },
    { name: "Parel Bus Stop", lat: 18.993, lng: 72.825 },
    { name: "Prabhadevi Bus Stop", lat: 18.997, lng: 72.819 },
    { name: "Gorakhpur Bus Stop", lat: 19.249, lng: 72.848 },
    { name: "Grant Road Bus Stop", lat: 18.961, lng: 72.828 },
    { name: "Dahisar Bus Stop", lat: 19.248, lng: 72.856 },
    { name: "Byculla Bus Stop", lat: 18.971, lng: 72.837 },
    { name: "Mazgaon Bus Stop", lat: 18.966, lng: 72.838 },
    { name: "Chhatrapati Shivaji Maharaj Terminus Bus Stop", lat: 18.939, lng: 72.835 },
    { name: "Mumbai Airport Bus Stop (CSMIA)", lat: 19.088, lng: 72.866 },
    { name: "Andheri West Bus Stop", lat: 19.101, lng: 72.825 },
    { name: "Jogeshwari Bus Stop", lat: 19.133, lng: 72.845 },
    { name: "Bhandup Bus Stop", lat: 19.182, lng: 72.926 },
    { name: "Bharat Nagar Bus Stop", lat: 19.118, lng: 72.892 },
    { name: "Wadala Bus Stop", lat: 19.018, lng: 72.850 },
    { name: "Pune Nagar Bus Stop", lat: 18.584, lng: 72.947 },
    { name: "Seawoods Bus Stop", lat: 19.048, lng: 73.018 },
    { name: "Vidyavihar Bus Stop", lat: 19.070, lng: 72.872 },
    { name: "Colaba Bus Stop", lat: 18.922, lng: 72.834 },
    { name: "Cuffe Parade Bus Stop", lat: 18.933, lng: 72.818 },
    { name: "Churchgate Bus Stop", lat: 18.938, lng: 72.826 },
    { name: "Marine Lines Bus Stop", lat: 18.939, lng: 72.826 },
    { name: "Versova Bus Stop", lat: 19.094, lng: 72.832 },
    { name: "Bhayandar East Bus Stop", lat: 19.297, lng: 72.863 },
    { name: "Borivali East Bus Stop", lat: 19.292, lng: 72.858 },
    { name: "Goregaon East Bus Stop", lat: 19.151, lng: 72.846 },
    { name: "LBSN College Bus Stop", lat: 19.114, lng: 72.911 },
    { name: "Kalyan Bus Stop", lat: 19.251, lng: 73.129 },
    { name: "Dombivli Bus Stop", lat: 19.211, lng: 73.084 },
    { name: "Andheri East Bus Stop", lat: 19.111, lng: 72.868 },
    { name: "Ghatkopar East Bus Stop", lat: 19.100, lng: 72.896 },
    { name: "Kandivali West Bus Stop", lat: 19.215, lng: 72.848 },
    { name: "Vile Parle East Bus Stop", lat: 19.085, lng: 72.826 },
    { name: "Mahim West Bus Stop", lat: 19.030, lng: 72.832 },
    { name: "Bandra East Bus Stop", lat: 19.061, lng: 72.832 },
    { name: "Kurla West Bus Stop", lat: 19.068, lng: 72.876 },
    { name: "Juhu Bus Stop", lat: 19.099, lng: 72.825 },
    { name: "Saki Naka Bus Stop", lat: 19.106, lng: 72.859 },
    { name: "Andheri Station West Bus Stop", lat: 19.100, lng: 72.830 },
    { name: "Bhayandar West Bus Stop", lat: 19.296, lng: 72.859 },
    { name: "Mulund East Bus Stop", lat: 19.188, lng: 72.924 },
    { name: "Thane West Bus Stop", lat: 19.195, lng: 72.976 },
    { name: "Vidyavihar East Bus Stop", lat: 19.073, lng: 72.875 },
    { name: "Worli Sea Face Bus Stop", lat: 18.996, lng: 72.823 },
    { name: "Mumbai Central East Bus Stop", lat: 18.973, lng: 72.823 },
    { name: "Madh Bus Stop", lat: 19.118, lng: 72.821 },
    { name: "Tata Garden Bus Stop", lat: 19.087, lng: 72.819 },
    { name: "Ashok Nagar Bus Stop", lat: 19.182, lng: 72.911 },
    { name: "Vile Parle West Bus Stop", lat: 19.096, lng: 72.826 },
    { name: "Boregaon West Bus Stop", lat: 19.152, lng: 72.843 },
    { name: "Jogeshwari East Bus Stop", lat: 19.118, lng: 72.841 },
    { name: "Malad East Bus Stop", lat: 19.186, lng: 72.852 },
    { name: "Naigaon Bus Stop", lat: 19.108, lng: 72.857 },
    { name: "Worli Bus Stop", lat: 18.998, lng: 72.829 }
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
            .bindPopup(`<strong>${stop.name}</strong><br>Latitude: ${stop.lat}<br>Longitude: ${stop.lng}`);

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
