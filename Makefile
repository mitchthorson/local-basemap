.PHONY: docker-run 

help:
	@echo Run an available command
	@echo docker-run
	@echo data/nyc.pmtiles


public/data/us.pmtiles:
	mkdir -p $(dir $@)
	pmtiles extract \
		https://build.protomaps.com/20231113.pmtiles \
		$@ \
		--maxzoom=8 \
		--bbox=-130.429688,14.434680,-62.929688,50.847573

docker-run: data/nyc.pmtiles
	docker run \
		-p 3000:3000 \
		-v ./data:/files \
		ghcr.io/maplibre/martin /files

public/data/nyc.pmtiles:
	mkdir -p $(dir $@)
	pmtiles extract \
		https://build.protomaps.com/20231113.pmtiles \
		$@ \
		--bbox=-74.389801,40.464711,-73.218384,41.116607
