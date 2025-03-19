import React from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
// import XYZ from "ol/source/XYZ";
import OSM from "ol/source/OSM";
import MapComponent from "../components/MapComponent";

function OLPage() {
  const mapRef = React.useRef();
  React.useEffect(() => {
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          //   source: new XYZ({
          //     url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
          //   }),
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
    return () => map.setTarget(undefined);
  }, []);

  return (
    <div className="w-full">
      <header className="w-full flex items-center justify-center">
        <h1 className="">Name:ABC</h1>
        {/* <MapElement id="map" className="w-full h-screen" /> */}
      </header>
      {/* <div
        ref={mapRef}
        style={{ width: "100%", height: "400px" }}
        className="map-container"
      /> */}
      <MapComponent />
    </div>
  );
}

export default OLPage;
