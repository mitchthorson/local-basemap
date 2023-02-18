# local basemaps

This repo represents a proof-of-concept for serving up vecor map tiles locally with the PMTiles format. Here I am doing that with Docker and NGINX.

To download basemap data and build a Docker image, simply run:

```console
make docker-build
```

To run a server on localhost:8080, run:

```console
make docker-run
```

Vector tiles should now be available at http://localhost:8080/planet_tiles.pmtiles
