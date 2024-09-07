/* eslint-disable react/prop-types */
import {
  useCallback,
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GoogleMap,
  useLoadScript,
  Autocomplete,
  DrawingManager,
  Polygon,
} from "@react-google-maps/api";
import Button from "../UI/Button";
import { GiBroom } from "react-icons/gi";
import { newMapDataActions } from "../../store/newMapStore/newMapData";
import { toast } from "react-toastify";
import { TbMapPinSearch } from "react-icons/tb";

const libraries = ["drawing", "places"];
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const mapContainerStyle = {
  width: "80%",
  height: "50vh",
};

let center = {
  lat: 52.0693,
  lng: 19.4803,
};
// let center = {
//   lat: 37.772,
//   lng: -122.214,
// };
let options = {
  zoom: 8,
  center,
};

const DrawingMap = forwardRef(function DrawingMap({ mapDataFromEdit }, ref) {
  const isModalOpen = useSelector((state) => state.newMapData.isModalOpen);
  const polygonsCords = useSelector((state) => state.newMapData.polygonsCords);
  const [polygonsMvc, setPolygonsMvc] = useState([]);
  const dispatch = useDispatch();
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const inputRef = useRef(null);

  const [path, setPath] = useState(mapDataFromEdit?.polygonsCords || []);
  useEffect(() => {
    console.log(mapDataFromEdit);

    if (mapDataFromEdit && isModalOpen) {
      center = {
        lat: mapDataFromEdit.mapInfo.centerCords.lat,
        lng: mapDataFromEdit.mapInfo.centerCords.lng,
      };
      options = {
        zoom: mapDataFromEdit.mapInfo.zoom,
        center,
      };
      setPath(mapDataFromEdit.polygonsCords);
    }
  }, [mapDataFromEdit, dispatch, isModalOpen, polygonsCords]);
  const clearPolygons = useCallback(() => {
    if (mapDataFromEdit) {
      console.log(
        "mapDataFromEdit.polygonsCords",
        mapDataFromEdit.polygonsCords
      );
    }
    console.log("clearing polygons");
    //console.log(polygonsMvc, "polygonsMvc before clearing");

    polygonsMvc.forEach((polygon) => polygon.setMap(null));
    setPolygonsMvc([]);
    dispatch(newMapDataActions.resetPolygons());
    console.log(polygonsCords, "polygonsCords after clearing");
    console.log(polygonsMvc, "polygonsMvc after clearing");
    if (mapDataFromEdit) {
      console.log(
        mapDataFromEdit.polygonsCords,
        "mapDataFromEdit.cords after clearing"
      );
    }
  }, [dispatch, polygonsCords, polygonsMvc, mapDataFromEdit]);

  useEffect(() => {
    if (!isModalOpen || mapDataFromEdit) {
      clearPolygons();
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);
  useImperativeHandle(ref, () => ({
    getMapInfo,
  }));

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  function clearDrawingsClickHandler() {
    clearPolygons();
    setPath([]);
    toast.info("Drawings cleared", {
      icon: () => <GiBroom className="text-5xl text-yellow-200 " />,
    });
  }

  const onMapLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;
  const handlePolygonComplete = (polygon) => {
    setPolygonsMvc((prev) => [...prev, polygon]);
    dispatch(
      newMapDataActions.pushPolygon(
        polygon
          .getPath()
          .getArray()
          .map((point) => point.toJSON())
      )
    );
  };
  // console.log(polygonsCords);

  const drawingOptions = {
    drawingControl: true,
    drawingControlOptions: {
      position: window.google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [window.google.maps.drawing.OverlayType.POLYGON],
    },

    polygonOptions: {
      fillColor: "#F87171",
      fillOpacity: 0.4,
      strokeWeight: 2,
      clickable: false,
      editable: false,
      zIndex: 1,
    },
  };
  console.log(polygonsCords);

  function getMapInfo() {
    const mapInfo = {
      centerCords: map.getCenter().toJSON(),
      zoom: map.getZoom(),
    };

    return mapInfo;
  }

  const handlePlaceChanged = () => {
    const { geometry } = autocomplete.getPlace();
    const bounds = new window.google.maps.LatLngBounds();
    if (geometry.viewport) {
      bounds.union(geometry.viewport);
    } else {
      bounds.extend(geometry.location);
    }
    map.fitBounds(bounds);
  };

  return (
    <>
      <Button onClick={getMapInfo} type="button" className="">
        Get map info
      </Button>

      <label
        htmlFor="place"
        className="flex items-center justify-center gap-2 leading-tight text-center "
      >
        <TbMapPinSearch className="text-3xl text-primaryLighter" />
        Search for place!
      </label>
      <Autocomplete
        onLoad={setAutocomplete}
        onPlaceChanged={handlePlaceChanged}
        className="z-50 flex items-center justify-center w-3/4 gap-2"
      >
        <input
          ref={inputRef}
          type="text"
          name="place"
          placeholder="Enter a location"
          className="w-3/4 p-2 outline outline-primaryDarker outline-2 focus:outline-primary"
        />
      </Autocomplete>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={options.zoom}
        center={options.center}
        options={{
          streetViewControl: false,
        }}
        onLoad={onMapLoad}
      >
        {map && (
          <>
            <DrawingManager
              options={drawingOptions}
              onLoad={(drawingManager) => drawingManager.setMap(map)}
              onPolygonComplete={handlePolygonComplete}
            />
            {mapDataFromEdit && (
              <Polygon
                paths={path}
                options={{
                  fillColor: "#F87171",
                  fillOpacity: 0.4,
                  strokeWeight: 2,
                  clickable: false,
                  editable: false,
                  zIndex: 1,
                }}
              />
            )}
          </>
        )}
      </GoogleMap>
      <Button onClick={clearDrawingsClickHandler} type="button" className="">
        <GiBroom className="text-xl text-yellow-200 " /> Clear drawings
      </Button>
    </>
  );
});

export default DrawingMap;
