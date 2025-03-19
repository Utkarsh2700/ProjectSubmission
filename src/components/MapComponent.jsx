import { useEffect, useRef, useState } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Draw, Modify, Snap } from "ol/interaction";
import { Style, Stroke, Fill } from "ol/style";
import "./MapComponent.css";
import "ol/ol.css"; // Import OpenLayers CSS

export default function MapComponent() {
  const mapRef = useRef();
  const [mapInstance, setMapInstance] = useState(null);
  const [drawInteraction, setDrawInteraction] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const vectorSource = useRef(new VectorSource());

  console.log({ mapInstance, drawInteraction, selectedFeature, vectorSource });

  // Initialize map
  useEffect(() => {
    const vectorLayer = new VectorLayer({
      source: vectorSource.current,
      //   style: new Style({
      //     stroke: new Stroke({
      //       color: "blue",
      //       width: 2,
      //     }),
      //     fill: new Fill({
      //       color: "rgba(0, 0, 255, 0.1)",
      //     }),
      //   }),
      style: (feature) => {
        const isSelected = feature === selectedFeature;
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

    // Store map instance in state
    setMapInstance(map);

    // Click handler for feature selection
    map.on("click", (e) => {
      const feature = map.forEachFeatureAtPixel(e.pixel, (f) => f);
      setSelectedFeature(feature || null);
    });

    return () => map.setTarget(undefined);
  }, []);

  // Add modify and snap interactions
  useEffect(() => {
    if (!mapInstance) return;

    const modify = new Modify({ source: vectorSource.current });
    const snap = new Snap({ source: vectorSource.current });

    mapInstance.addInteraction(modify);
    mapInstance.addInteraction(snap);

    return () => {
      mapInstance.removeInteraction(modify);
      mapInstance.removeInteraction(snap);
    };
  }, [mapInstance]);

  const startDrawing = () => {
    if (drawInteraction) {
      mapInstance.removeInteraction(drawInteraction);
    }

    const newDraw = new Draw({
      source: vectorSource.current,
      type: "Polygon",
      style: new Style({
        stroke: new Stroke({
          color: "red",
          width: 2,
        }),
        fill: new Fill({
          color: "rgba(255, 0, 0, 0.1)",
        }),
      }),
    });

    mapInstance.addInteraction(newDraw);
    setDrawInteraction(newDraw);
  };

  const deleteFeature = () => {
    if (selectedFeature) {
      vectorSource.current.removeFeature(selectedFeature);
      setSelectedFeature(null);
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
          onClick={deleteFeature}
          disabled={!selectedFeature}
        >
          Delete Selected
        </button>
      </div>
      <div
        ref={mapRef}
        style={{ width: "100%", height: "100vh" }}
        className="map-container"
      />
    </div>
  );
}
