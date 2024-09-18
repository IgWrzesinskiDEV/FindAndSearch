/* eslint-disable react-hooks/exhaustive-deps */

import {
  useCallback,
  useState,
  useEffect,
  useRef,
  forwardRef,
  memo,
  useImperativeHandle,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GoogleMap,
  useJsApiLoader,
  DrawingManager,
  Polygon,
} from "@react-google-maps/api";
import Button from "../UI/Button";
import { GiBroom } from "react-icons/gi";
import { newMapDataActions } from "../../store/newMapStore/newMapData";
import { toast } from "react-toastify";

import Loader from "../UI/Loader";
import AutoCompleteComponent from "./map/AutoCompleteComponent";

const libraries = ["drawing", "places"];
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

let center = {
  lat: 52.0693,
  lng: 19.4803,
};

let options = {
  zoom: 8,
  center,
};

const DrawingMap = memo(
  forwardRef(function DrawingMap({ mapDataFromEdit, visable }, ref) {
    const isModalOpen = useSelector((state) => state.newMapData.isModalOpen);

    const [polygonsMvc, setPolygonsMvc] = useState([]);
    const dispatch = useDispatch();
    const [map, setMap] = useState(null);

    const inputRef = useRef(null);

    const [path, setPath] = useState(mapDataFromEdit?.polygonsCords || []);
    useEffect(() => {
      if (mapDataFromEdit) {
        setPath(mapDataFromEdit.polygonsCords);
      }
    }, [mapDataFromEdit, dispatch]);
    const clearPolygons = useCallback(() => {
      polygonsMvc.forEach((polygon) => polygon.setMap(null));
      setPolygonsMvc([]);
      dispatch(newMapDataActions.resetPolygons());
    }, [dispatch, polygonsMvc]);

    useEffect(() => {
      if (!isModalOpen || mapDataFromEdit) {
        clearPolygons();
      }
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }, [isModalOpen]);

    const { isLoaded, loadError } = useJsApiLoader({
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
    function getMapInfo() {
      const mapInfo = {
        centerCords: map.getCenter().toJSON(),
        zoom: map.getZoom(),
      };

      return mapInfo;
    }

    useImperativeHandle(ref, () => ({
      getMapInfo,
    }));

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <Loader loaderText="Loading map..." />;
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

    return (
      <div
        className={`w-full flex flex-col justify-center items-center gap-4 mt-4 ${
          visable ? "block" : "hidden"
        }`}
      >
        <AutoCompleteComponent map={map} ref={inputRef} />
        <GoogleMap
          mapContainerClassName="w-10/12 h-[300px] lg:h-[500px] lg:mt-4  lg:mb-2 rounded-md"
          zoom={mapDataFromEdit ? mapDataFromEdit.mapInfo.zoom : options.zoom}
          center={
            mapDataFromEdit
              ? mapDataFromEdit.mapInfo.centerCords
              : options.center
          }
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
        <Button
          onClick={clearDrawingsClickHandler}
          type="button"
          className="text-sm lg:text-xl"
        >
          <GiBroom className="text-xl text-yellow-200 " /> Clear drawings
        </Button>
      </div>
    );
  })
);

export default DrawingMap;
