/* eslint-disable react/prop-types */
import { GoogleMap, Circle, LoadScript } from "@react-google-maps/api";

// Replace with your actual Google Maps API key
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const mapContainerStyle = {
  height: "50vh",
  width: "90%",
  margin: "40px",
  display: "block",
};

const defaultZoom = 18;

const Map = ({ coordinates, radius }) => {
  const cords = {
    lat: coordinates.latitude,
    lng: coordinates.longitude,
  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={cords}
        zoom={defaultZoom}
        options={{
          streetViewControl: false,
        }}
      >
        <Circle
          center={cords}
          radius={radius} // Radius in meters
          options={{
            fillColor: "#FF0000", // Red fill color
            fillOpacity: 0.3, // 30% opacity
            strokeColor: "#FF0000", // Red stroke color
            strokeOpacity: 0.8, // 80% opacity
            strokeWeight: 2, // Stroke width
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
