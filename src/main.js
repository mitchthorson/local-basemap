import "./style.css";
import { interpolateInferno } from "d3-scale-chromatic";
import { extent } from "d3-array";
import { scaleSequential } from "d3-scale";
import * as pmtiles from "pmtiles";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import layers from "protomaps-themes-base";

const protocol = new pmtiles.Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);

const mapStyle = {
  version: 8,
  glyphs:
    "https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf",
  sources: {
    protomaps: {
      type: "vector",
      url: `pmtiles://${location.protocol}//${location.host}${location.pathname}data/nyc.pmtiles`,
      attribution:
        '<a href="https://protomaps.com">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>',
    },
  },
  layers: layers("protomaps", "black"),
};

const map = new maplibregl.Map({
  container: "map",
  style: mapStyle, // stylesheet location
  center: [-73.935242, 40.730610],
  zoom: 10,
  maxZoom: 15,
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
