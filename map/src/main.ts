import maplibregl from 'maplibre-gl'; // or "const maplibregl = require('maplibre-gl');"
import * as pmtiles from "pmtiles";
import layers from 'protomaps-themes-base';
import './style.css'
import "../node_modules/maplibre-gl/dist/maplibre-gl.css";

let protocol = new pmtiles.Protocol();
maplibregl.addProtocol("pmtiles",protocol.tile);

const mapStyle = {
    "version": 8,
    "glyphs":'https://cdn.protomaps.com/fonts/pbf/{fontstack}/{range}.pbf',
	"sources": {
		"protomaps": {
		    "type": "vector",
		   	"url": "pmtiles://http://localhost:8080/planet_tiles.pmtiles",
		}
	},
    "layers": layers("protomaps","light")
};

const map = new maplibregl.Map({
  container : 'map',
  style : mapStyle, // stylesheet location
  center : [ -74.5, 40 ], // starting position [lng, lat]
  zoom : 3                // starting zoom
});

map.addControl(new maplibregl.NavigationControl());
