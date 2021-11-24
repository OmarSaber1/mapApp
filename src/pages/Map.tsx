import { useCallback, useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import NavBar from "../components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getZones } from "../Redux/actions/zone";
import { Point, ZoneResponse } from "../utils/interfaces";
import Modal from "../components/Modal";
import { createDrawingManager } from "../utils/helpers";

const defaultProps = {
  zoom: 5,
  center: { lat: 60.886, lng: 30.268 },
};

export default function Map() {
  const dispatch = useDispatch();

  const state = useSelector((state: any) => state);

  const [map, setMap] = useState();

  const [newMaps, setMaps] = useState();

  const [modalOpen, setModalOpen] = useState(false);

  const [actionType, setActionType] = useState("");

  const [points, setPoints] = useState<Point[]>([]);

  const zonesArea = state.zone?.zones;

  // const handleDeleteZone = useCallback(
  //   () => {

  //   },
  //   [],
  // )

  useEffect(() => {
    dispatch(getZones());
  }, []);

  useEffect(() => {
    zonesArea && handleApiLoaded(map, newMaps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const handleApiLoaded = (map: any, maps: any) => {
    setMap(map);
    setMaps(maps);

    if (!maps) return null;
    let infoWindow: google.maps.InfoWindow;

    const showOptions = (event: any) => {
      console.log("e", event);

      let contentString = `
      <div id="content">
      <button onclick="${console.log("remove")}">remove </button>
      <button onclick="${console.log("change")}">change </button>
      </div>
      `;
      infoWindow.setContent(contentString);
      infoWindow.setPosition(event.latLng);
    };

    zonesArea?.forEach((zone: ZoneResponse) => {
      let polygonPoints = zone.points.map((point: any) => {
        return { lat: parseFloat(point.lat), lng: parseFloat(point.lng) };
      });

      let zones = new maps.Polygon({
        label: zone.label,
        _id: zone._id,
        paths: polygonPoints,
        strokeColor: "#000000",
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: zone.color,
        fillOpacity: 0.35,
      });

      zones.setMap(map);
      zones.addListener("click", showOptions);
      infoWindow = new google.maps.InfoWindow();
      infoWindow.open(map);
    });

    const drawingManager = createDrawingManager(map, maps);

    drawingManager.setMap(map);

    maps.event.addListener(
      drawingManager,
      "polygoncomplete",
      (polygon: any) => {
        const coords = polygon
          .getPath()
          .getArray()
          .map((coord: any) => {
            return {
              lat: coord.lat(),
              lng: coord.lng(),
            };
          });
        setPoints(coords);
        setActionType("add");
        setModalOpen(true);
      }
    );
  };

  return (
    <>
      <NavBar />
      {modalOpen && (
        <Modal
          setModalOpen={setModalOpen}
          actionType={actionType}
          points={points}
        />
      )}

      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
            libraries: ["drawing"],
          }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        />
      </div>
    </>
  );
}
