IMAGE_NAME := local-basemap-pmtiles

.PHONY: docker-run docker-build

help:
	@echo Run an available command
	@echo docker-run
	@echo docker-build
	@echo data/planet_tiles.pmtiles

docker-run:
	docker run --name local-basemap --rm -d -p 8080:80 $(IMAGE_NAME):dev

docker-build: data/planet_tiles.pmtiles
	docker build -t $(IMAGE_NAME):dev .

data/planet_tiles.pmtiles:
	mkdir -p $(dir $@)
	curl -o $@ https://pub-9288c68512ed46eca46ddcade307709b.r2.dev/protomaps-sample-datasets/protomaps_vector_planet_odbl_z10.pmtiles
