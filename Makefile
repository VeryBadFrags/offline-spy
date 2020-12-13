src = src
build = build
dist = dist
node = package.json node_modules/

# Generate all the output files
.PHONY: generate
generate: ${dist}/index.html ${dist}/qr.svg
	@echo 'Generated site into: ${dist}/'

# Minify final HTML
${dist}/index.html: ${dist} ${build}/bundled.html ${node}
	npm run html-minifier

# Bundle JS and CSS
${build}/bundled.html: bundle.js ${build}/ ${build}/index.html ${build}/rules.html ${build}/footer.html ${build}/constants.js ${build}/footer.js ${build}/style.css
	node bundle.js

# Inject favicons into ${build}/index.html
${build}/index.html: ${src}/index.html ${build}/faviconData.json ${node}
	npm run favicon-inject

# Generate favicons
${build}/faviconData.json: faviconDescription.json assets/privacy-private.svg ${build} ${node}
	npm run favicon-generate

# Transpile Rules
${build}/rules.html: ${build} ${src}/rules.md ${node}
	npm run marked

# Transpile Footer
${build}/footer.html: ${build} ${src}/footer.md ${node}
	npm run marked

# Run constants.js through Babel
${build}/constants.js: ${src}/constants.js ${node}
	npm run babel

# Run footer.js through Babel
${build}/footer.js: ${src}/footer.js ${node}
	npm run babel

# Generate CSS from Sass
${build}/style.css: ${src}/*.scss ${node}
	npm run sass

# Generate QR Code
${dist}/qr.svg: ${dist} ${node}
	npm run qrcode

${build}:
	mkdir -p ${build}

${dist}:
	mkdir -p ${dist}

node_modules/:
	npm install

.PHONY: clean
clean:
	rm -rf ${build}/ ${dist}/ node_modules/ ${src}/*.css ${src}/*.css.map
