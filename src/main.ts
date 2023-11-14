import maplibregl from "maplibre-gl"; // or "const maplibregl = require('maplibre-gl');"
import layers from "protomaps-themes-base";
import "./style.css";
import "../node_modules/maplibre-gl/dist/maplibre-gl.css";

const mapStyle = {
  version: 8,
  glyphs:
    "https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf",
  sources: {
    protomaps: {
      type: "vector",
      url: "http://localhost:3000/nyc",
      attribution:
        '<a href="https://protomaps.com">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>',
    },
  },
  layers: layers("protomaps", "black"),
};

const map = new maplibregl.Map({
  container: "map",
  style: mapStyle, // stylesheet location
	vounds: [[-74.389801,40.464711],[-73.218384,41.116607]],
	maxBounds: [[-74.389801,40.464711],[-73.218384,41.116607]],
});

map.addControl(new maplibregl.NavigationControl());
