ASSETS = assets
SRC = src

BUILD = build
DIST = dist

NODE_DEPS = package.json node_modules/

# Generate all the output files
.PHONY: generate
generate: ${DIST}/index.html ${DIST}/qr.svg
	@echo 'Generated site into: ${DIST}/'

# Minify final HTML
${DIST}/index.html: ${DIST} ${BUILD}/bundled.html ${NODE_DEPS}
	npm run html-minifier

# Bundle JS and CSS
${BUILD}/bundled.html: bundle.js ${BUILD}/ ${BUILD}/index.html ${BUILD}/rules.html ${BUILD}/footer.html ${BUILD}/constants.js ${BUILD}/footer.js ${BUILD}/style.css
	node bundle.js

# Inject favicons into ${BUILD}/index.html
${BUILD}/index.html: ${SRC}/index.html ${BUILD}/faviconData.json ${NODE_DEPS}
	npm run favicon-inject

# Generate favicons
${BUILD}/faviconData.json: faviconDescription.json ${ASSETS}/privacy-private.svg ${BUILD} ${NODE_DEPS}
	npm run favicon-generate

# Transpile Rules
${BUILD}/rules.html: ${BUILD} ${SRC}/rules.md ${NODE_DEPS}
	npm run marked

# Transpile Footer
${BUILD}/footer.html: ${BUILD} ${SRC}/footer.md ${NODE_DEPS}
	npm run marked

# Run constants.js through Babel
${BUILD}/constants.js: ${SRC}/constants.js ${NODE_DEPS}
	npm run babel

# Run footer.js through Babel
${BUILD}/footer.js: ${SRC}/footer.js ${NODE_DEPS}
	npm run babel

# Generate CSS from Sass
${BUILD}/style.css: ${SRC}/*.scss ${NODE_DEPS}
	npm run sass

# Generate QR Code
${DIST}/qr.svg: ${DIST} ${NODE_DEPS}
	npm run qrcode

# Temporary work folder
${BUILD}:
	mkdir -p ${BUILD}

# Final output folder
${DIST}:
	mkdir -p ${DIST}

node_modules/:
	npm install

.PHONY: clean
clean:
	rm -rf ${BUILD}/ ${DIST}/ node_modules/
