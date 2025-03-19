import React from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Draw, Modify, Snap } from "ol/interaction";
import { Style, Stroke, Fill } from "ol/style";
import "../components/MapComponent.css";
import "ol/ol.css";
import { useEffect, useRef } from "react";

function OLPage() {
  return (
    <div className="w-full">
      <header className="w-full flex items-center justify-center">
        <h1 className="t">Name:</h1>
      </header>
      <MapComponent />
    </div>
  );
}

function MapComponent() {
  const mapRef = useRef();
  const [mapInstance, setMapInstance] = React.useState(null);
  const [currrentCordinates, setCurrentCordinates] = React.useState(null);
  const [selectedShape, setSelectedShape] = React.useState(null);
  const vectorShape = useRef(new VectorSource());

  //Initializing the map
  useEffect(() => {
    const vectorLayer = new VectorLayer({
      source: vectorShape.current,
      style: (feature) => {
        const isSelected = feature === selectedShape;
        return new Style({
          stroke: new Stroke({
            color: isSelected ? "#ff0000" : "blue",
            width: isSelected ? 3 : 2,
          }),
          fill: new Fill({
            color: isSelected ? "rgba(255, 0, 0, 0.2)" : "rgba(0, 0, 255, 0.1)",
          }),
        });
      },
    });

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    // Storing the map instance in the state
    setMapInstance(map);

    // Click handler for polygon/shape selection

    map.on("click", (e) => {
      const feature = map.forEachFeatureAtPixel(e.pixel, (f) => f);
      setSelectedShape(feature || null);
    });

    return () => map.setTarget(undefined);
  }, []);

  // Adding editing tools

  useEffect(() => {
    if (!mapInstance) return;

    // Creating editing tools
    const modify = new Modify({ source: vectorShape.current });
    const snap = new Snap({ source: vectorShape.current });

    // Adding editing tools those to the map
    mapInstance.addInteraction(modify);
    mapInstance.addInteraction(snap);

    return () => {
      mapInstance.removeInteraction(modify);
      mapInstance.removeInteraction(snap);
    };
  }, [mapInstance]);

  // Function to start drawing
  const startDrawing = () => {
    if (currrentCordinates) {
      mapInstance.removeInteraction(currrentCordinates);
    }

    // Creating a new drawing
    const newDrawing = new Draw({
      source: vectorShape.current,
      type: "Polygon",
      style: new Style({
        stroke: new Stroke({
          color: "red",
          width: 2,
        }),
        fill: new Fill({
          color: "rgba(255, 0, 0, 0.2)",
        }),
      }),
    });

    mapInstance.addInteraction(newDrawing);
    setCurrentCordinates(newDrawing);
  };

  // Function to delete the selected shape
  const deleteShape = () => {
    if (selectedShape) {
      vectorShape.current.removeFeature(selectedShape);
      setSelectedShape(null);
    }
  };

  return (
    <div>
      <div className="controls">
        <button
          style={{
            backgroundColor: "green",
            borderRadius: "5px",
            margin: "1px 5px",
          }}
          onClick={startDrawing}
        >
          Draw Polygon
        </button>
        <button
          style={{
            backgroundColor: "Red",
            borderRadius: "5px",
            margin: "1px 5px",
          }}
          onClick={deleteShape}
          disabled={!selectedShape}
        >
          Delete Selected
        </button>
      </div>
      <div ref={mapRef} style={{ width: "100%" }} className="map-container" />
    </div>
  );
}

export default OLPage;
