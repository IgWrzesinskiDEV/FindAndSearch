import { useCallback, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  DrawingManager,
} from "@react-google-maps/api";

const libraries = ["drawing"];
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const mapContainerStyle = {
  width: "80%",
  height: "50vh",
};

const center = {
  lat: 52.0693,
  lng: 19.4803,
};

const options = {
  zoom: 8,
  center,
};

const DrawingMap = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY, // Replace with your API key
    libraries,
  });
  const [map, setMap] = useState(null);
  const [polygons, setPolygons] = useState([]);
  const onMapLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  const handlePolygonComplete = (polygon) => {
    setPolygons((prevPolygons) => [...prevPolygons, polygon]);
    console.log(polygon.getPath().getArray());
  };

  const clearPolygons = () => {
    polygons.forEach((polygon) => polygon.setMap(null));
    setPolygons([]);
  };

  const drawingOptions = {
    drawingControl: true,
    drawingControlOptions: {
      position: window.google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [window.google.maps.drawing.OverlayType.POLYGON],
    },
    markerOptions: {
      icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    },
    circleOptions: {
      fillColor: "#ffff00",
      fillOpacity: 1,
      strokeWeight: 5,
      clickable: false,
      editable: true,
      zIndex: 1,
    },
    polygonOptions: {
      fillColor: "#F87171",
      fillOpacity: 0.5,
      strokeWeight: 2,
      clickable: false,
      editable: true,
      zIndex: 1,
    },
  };
  return (
    <>
      <button onClick={clearPolygons}> clear drawings</button>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={options.zoom}
        center={options.center}
        options={{
          streetViewControl: false,
        }}
        onUnmount={() => {
          console.log("unmount");
        }}
        onLoad={onMapLoad}
      >
        {map && (
          <DrawingManager
            options={drawingOptions}
            onLoad={(drawingManager) => drawingManager.setMap(map)}
            onPolygonComplete={handlePolygonComplete}
          />
        )}
      </GoogleMap>
      {/* <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={libraries}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={options.zoom}
          center={options.center}
          options={{
            streetViewControl: false,
          }}
        ></GoogleMap>
      </LoadScript> */}
    </>
  );
};

export default DrawingMap;
