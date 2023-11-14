import "./style.css";
import "../node_modules/maplibre-gl/dist/maplibre-gl.css";
import { interpolateInferno } from "d3-scale-chromatic";
import { extent } from "d3-array";
import { scaleSequential } from "d3-scale";

import maplibregl from "maplibre-gl"; // or "const maplibregl = require("maplibre-gl");"
import layers from "protomaps-themes-base";


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
  vounds: [
    [-74.389801, 40.464711],
    [-73.218384, 41.116607],
  ],
  maxBounds: [
    [-74.389801, 40.464711],
    [-73.218384, 41.116607],
  ],
});

map.addControl(new maplibregl.NavigationControl());

map.on("load", () => {
  fetch("nyc_income.json")
    .then((response) => response.json())
    .then((data) => {
			const color = scaleSequential(extent(data.features, d => d.properties.estimate ), interpolateInferno);
			data.features = data.features.filter((d) => d.properties.estimate != null).map(d => {
				d.properties.color = color(d.properties.estimate);
				return d;
			});
      map.addSource("income", {
        type: "geojson",
        data: data,
      });
      map.addLayer({
        id: "nyc_income",
        type: "fill",
        source: "income",
        layout: {},
        paint: { "fill-color": ["get", "color"], "fill-opacity": 0.75, },
      });
    });
});
