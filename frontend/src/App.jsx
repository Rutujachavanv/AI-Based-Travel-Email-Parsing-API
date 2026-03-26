import { useState } from "react";
import axios from "axios";

import {
MapContainer,
TileLayer,
Marker,
Popup,
Polyline
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import L from "leaflet";

import "./App.css";

const planeIcon = new L.Icon({
iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
iconSize: [40, 40]
});

const cityCoordinates = {
"San Francisco": [37.7749, -122.4194],
"Boston": [42.3601, -71.0589],
"London": [51.5074, -0.1278],
"Tokyo": [35.6762, 139.6503],
"New York": [40.7128, -74.0060],
"Paris": [48.8566, 2.3522]
};

function App() {

const [email, setEmail] = useState("");
const [result, setResult] = useState(null);
const [loading, setLoading] = useState(false);

const [coords, setCoords] = useState({
source: null,
destination: null
});

const parseEmail = async () => {

try {

setLoading(true);

const res = await axios.post(
"http://localhost:5001/api/parse-email",
{ email }
);

setResult(res.data);

const source = cityCoordinates[res.data.source_city];
const destination = cityCoordinates[res.data.destination_city];

setCoords({
source,
destination
});

} catch (err) {

console.error(err);
alert("AI parsing failed");

} finally {

setLoading(false);

}

};

const loadExample = () => {

setEmail(`Subject: Travel Request

Hi team,

Please book travel from Boston to London leaving July 3
and returning July 8.

2 adults travelling business class.
Hotel preference: Marriott.

Thanks`);

};

return (

<div className="app">

<div className="sidebar">

<h2>📧 Travel Inbox</h2>

<textarea
value={email}
onChange={(e) => setEmail(e.target.value)}
placeholder="Paste full travel email here..."
/>

<div className="buttons">

<button onClick={parseEmail}>
Parse Email
</button>

<button onClick={loadExample}>
Example Email
</button>

</div>

{loading && (

<p className="loading">
✈ AI analyzing travel email...
</p>

)}

{result && (

<div className="result">

<h3>✈ Flight Summary</h3>

<p>
<b>{result.source_city}</b> → <b>{result.destination_city}</b>
</p>

<p>📅 Departure: {result.start_date}</p>

<p>📅 Return: {result.end_date}</p>

<p>👨 Adults: {result.adults}</p>

<p>🧒 Children: {result.children || "0"}</p>

<p>💺 Class: {result.travel_class}</p>

<p>🏨 Hotel: {result.hotel_preference}</p>

</div>

)}

</div>

<div className="map-area">

<MapContainer
center={[20, 0]}
zoom={2}
scrollWheelZoom={true}
className="map"
>

<TileLayer
url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>

{coords.source && (

<Marker position={coords.source}>
<Popup>
✈ {result.source_city}
</Popup>
</Marker>

)}

{coords.destination && (

<Marker position={coords.destination}>
<Popup>
🏁 {result.destination_city}
</Popup>
</Marker>

)}

{coords.source && coords.destination && (

<>

<Polyline
positions={[
coords.source,
coords.destination
]}
color="blue"
/>

<Marker
position={[
(coords.source[0] + coords.destination[0]) / 2,
(coords.source[1] + coords.destination[1]) / 2
]}
icon={planeIcon}
/>

</>

)}

</MapContainer>

</div>

</div>

);

}

export default App;