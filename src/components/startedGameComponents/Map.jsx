/* eslint-disable react/prop-types */

import { GoogleMap, useLoadScript, Polygon } from "@react-google-maps/api";
import Loader from "../UI/Loader";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Replace with your actual Google Maps API key

const mapContainerStyle = {
  height: "500px",
  width: "90%",
  margin: "10px",
  display: "block",
};

const Map = ({ mapData }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const options = {
    ...mapData.mapInfo,
  };

  const polygons = Object.entries(mapData.polygonsCords).map((el) => {
    return el[1];
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <Loader loaderText="Loading map..." />;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={options.zoom}
      center={options.centerCords}
      options={{
        streetViewControl: false,
      }}
    >
      <Polygon
        paths={polygons}
        options={{
          fillColor: "#F87171",
          fillOpacity: 0.4,
          strokeWeight: 2,
          clickable: false,
          editable: false,
          zIndex: 1,
        }}
      />
    </GoogleMap>
  );
};

export default Map;
