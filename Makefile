ASSETS = assets
SRC = src

BUILD = build
DIST = dist

NODE_DEPS = package.json node_modules/

# Generate all the output files
.PHONY: generate
generate: ${DIST}/qr.svg ${DIST}/index.html ${DIST}/favicon.svg
	@echo 'Generated site into: ${DIST}/'

# Bundle JS and CSS
${DIST}/index.html: bundle.js ${BUILD}/index.html
	node bundle.js

${BUILD}/index.html: snowpack.config.js ${SRC}/* ${NODE_DEPS}
	npm run build

# Generate QR Code - run in background because of missing exit value
${DIST}/qr.svg: ${DIST} ${NODE_DEPS}
	npm run qrcode&

${DIST}/favicon.svg: ${DIST} assets/privacy-private.svg
	cp assets/privacy-private.svg ${DIST}/favicon.svg

# Final output folder
${DIST}:
	mkdir -p ${DIST}

node_modules/:
	npm ci

.PHONY: clean
clean:
	rm -rf ${BUILD}/ ${DIST}/ node_modules/
