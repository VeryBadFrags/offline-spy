# Generate all the output files
.PHONY: generate
generate: dist/index.html dist/qr.svg
	@echo 'Built site to: dist/'

# Minify final HTML
dist/index.html: node_modules/ dist/ build/bundled.html package.json
	npm run html-minifier

# Bundle JS and CSS
build/bundled.html: bundle.js build/ build/index.html build/rules.html build/footer.html build/constants.js build/footer.js build/style.css
	node bundle.js

# Inject favicons into build/index.html
build/index.html: node_modules/ src/index.html package.json build/faviconData.json
	npm run favicon-inject

# Setup real-favicon
build/faviconData.json: node_modules/ faviconDescription.json assets/privacy-private.svg package.json
	npm run favicon-generate

# Transpile Rules
build/rules.html: node_modules/ build/ src/rules.md package.json
	npm run marked

# Transpile Footer
build/footer.html: node_modules/ build/ src/footer.md package.json
	npm run marked

# Run constants.js through Babel
build/constants.js: node_modules/ src/constants.js package.json
	npm run babel

# Run footer.js through Babel
build/footer.js: node_modules/ src/footer.js package.json
	npm run babel

# Generate CSS from Sass
build/style.css: node_modules/ src/*.scss package.json
	npm run sass

# Generate QR Code
dist/qr.svg: node_modules/ dist/ package.json
	npm run qrcode

build/:
	mkdir -p build

dist/:
	mkdir -p dist

node_modules/:
	npm install

.PHONY: clean
clean:
	rm -rf build/ dist/ node_modules/ src/*.css src/*.css.map
