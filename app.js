// Initialize the Leaflet map
const map = L.map('map').setView([19.0760, 72.8777], 13);  // Mumbai coordinates
const tileurl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, coded by Shlok';
const tiles = L.tileLayer(tileurl, { attribution });
tiles.addTo(map);

// Define bounding box for hex grid
const bbox = [72.7759, 18.8928, 72.9863, 19.2714]; // Mumbai's bounding box
const hexRadius = 3; // Hexagon radius in kilometers
const hexGrid = turf.hexGrid(bbox, hexRadius, { units: 'kilometers' });

// Add hex grid to the map
L.geoJSON(hexGrid, {
    style: {
        color: '#3388ff',
        weight: 1,
        fillColor: '#3388ff',
        fillOpacity: 0.1,
    },
}).addTo(map);

const listr=[
    {"type":"Feature","geometry":{"type":"Point","coordinates":[72.830029,18.920099,0]},"properties":{"BEST_APP_1":"\n       Android - https://bit.ly/3clkZsf,  iOS - https://tinyurl.com/4ebk4r6k\n      ","BEST_BUS_S":"\n       ELECTRIC HOUSE, COLABA DEPOT\n      ","BEST_HELP_":"\n       1800227550\n      ","OBJECTID":1,"TWITTER_HA":"\n       @myBESTBus\n      ","WEBSITE":"\n       www.bestundertaking.com\n      ","name":"\n     ELECTRIC HOUSE, COLABA DEPOT\n    "}},
    {"type":"Feature","geometry":{"type":"Point","coordinates":[72.820905,18.911184,0]},"properties":{"BEST_APP_1":"\n       Android - https://bit.ly/3clkZsf,  iOS - https://tinyurl.com/4ebk4r6k\n      ","BEST_BUS_S":"\n       COLABA BUS STATION, POST OFFICE\n      ","BEST_HELP_":"\n       1800227550\n      ","OBJECTID":2,"TWITTER_HA":"\n       @myBESTBus\n      ","WEBSITE":"\n       www.bestundertaking.com\n      ","name":"\n     COLABA BUS STATION, POST OFFICE\n    "}},
    {"type":"Feature","geometry":{"type":"Point","coordinates":[72.812432,18.906977,0]},"properties":{"BEST_APP_1":"\n       Android - https://bit.ly/3clkZsf,  iOS - https://tinyurl.com/4ebk4r6k\n      ","BEST_BUS_S":"\n       DHOBI GHAT (NAVY NAGAR)\n      ","BEST_HELP_":"\n       1800227550\n      ","OBJECTID":3,"TWITTER_HA":"\n       @myBESTBus\n      ","WEBSITE":"\n       www.bestundertaking.com\n      ","name":"\n     DHOBI GHAT (NAVY NAGAR)\n    "}},
    ]
// Function to generate list of bus stops
function generateList() {
    const ul = document.querySelector('.list'); // Select the list container
    listr.forEach((stop) => {
        const li = document.createElement('li');
        const div = document.createElement('div');
        const a = document.createElement('a');
        //const p = document.createElement('p');

        div.classList.add('stops');
        a.innerText = stop.properties.name;
        a.href = '#';
        //p.innerText = stop.properties.ADDRESS;

        div.appendChild(a);
        //div.appendChild(p);
        li.appendChild(div);
        ul.appendChild(li);
    });
}

// Call the function to generate the list when the page loads
 generateList();
function makePopupContent(stop){
   return
     <div>
         <h4>${stop.properties.name}</h4>
     </div>
 }
function onEachFeature(feature,layer){
    layer.bindPopup(makePopupContent(feature));

 }

const stopsLayer=L.geoJSON(listr,{
    onEachFeature:onEachFeature,
    pointToLayer:function(feature,latlng){
        return L.marker(latlng);
    }
});
stopsLayer.addTo(map);
