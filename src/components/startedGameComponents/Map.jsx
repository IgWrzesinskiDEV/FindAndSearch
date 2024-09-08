/* eslint-disable react/prop-types */
import { useCallback, useState } from "react";

import { GoogleMap, useLoadScript, Polygon } from "@react-google-maps/api";

const libraries = ["drawing", "places"];
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Replace with your actual Google Maps API key

const mapContainerStyle = {
  height: "50vh",
  width: "90%",
  margin: "40px",
  display: "block",
};

const Map = ({ mapData }) => {
  const [map, setMap] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });
  console.log(mapData, "mapData");

  const onMapLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const options = {
    ...mapData.mapInfo,
  };

  const polygons = Object.entries(mapData.polygonsCords).map((el) => {
    console.log(el[1], "el");
    return el[1];
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={options.zoom}
      center={options.centerCords}
      options={{
        streetViewControl: false,
      }}
      onLoad={onMapLoad}
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
