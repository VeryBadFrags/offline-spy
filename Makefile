SRC = src

BUILD = build
DIST = dist

${DIST}/standalone.html: bundle.js ${BUILD}/* ${DIST}
	node bundle.js

${BUILD}/*: snowpack.config.js ${SRC}/* package.json node_modules/
	npm run build

# Final output folder
${DIST}:
	mkdir -p ${DIST}

node_modules/:
	npm ci --only=prod --no-optional

.PHONY: clean
clean:
	rm -rf ${BUILD}/ ${DIST}/ node_modules/
